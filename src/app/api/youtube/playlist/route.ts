import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import dns from 'dns';
import { extractYouTubePlaylistId, formatIsoDuration } from '@/lib/youtube';

// Prioritize IPv4 to avoid Undici IPv6 connect timeouts on Windows networks
if (typeof dns.setDefaultResultOrder === 'function') {
  try {
    dns.setDefaultResultOrder('ipv4first');
  } catch {
    // Ignore
  }
}

interface ExtractedVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanYamlString(str: string): string {
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
}

/**
 * Auto-detects language from playlist or video title in English or native script
 */
function detectLanguageFromText(text?: string | null): string | null {
  if (!text || typeof text !== 'string') return null;
  const lower = text.toLowerCase();
  if (lower.includes('nepali') || text.includes('नेपाली')) return 'Nepali';
  if (lower.includes('kannada') || text.includes('ಕನ್ನಡ')) return 'Kannada';
  if (lower.includes('tamil') || text.includes('தமிழ்')) return 'Tamil';
  if (lower.includes('telugu') || text.includes('తెలుగు')) return 'Telugu';
  if (lower.includes('hindi') || text.includes('हिंदी') || text.includes('हिन्दी')) return 'Hindi';
  if (lower.includes('malayalam') || text.includes('മലയാളം')) return 'Malayalam';
  if (lower.includes('english')) return 'English';
  return null;
}

/**
 * Commits a file to GitHub repository if GITHUB_TOKEN is available.
 */
async function commitToGitHubIfConfigured(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return false;

  const repo = process.env.GITHUB_REPOSITORY || 'ChurchGitProd/ChurchSite';
  const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || 'main';
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  try {
    let sha: string | undefined;
    // Check if file already exists on GitHub to obtain its SHA
    const checkRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Jesus-Loves-Ministry-CMS',
      },
    });

    if (checkRes.ok) {
      const existingData = await checkRes.json();
      sha = existingData.sha;
    }

    const body: Record<string, any> = {
      message: commitMessage,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch,
    };
    if (sha) {
      body.sha = sha;
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Jesus-Loves-Ministry-CMS',
      },
      body: JSON.stringify(body),
    });

    return putRes.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { playlistUrl, playlistName, language } = body;

    if (!playlistUrl || typeof playlistUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid YouTube playlist URL.' },
        { status: 400 }
      );
    }

    const playlistId = extractYouTubePlaylistId(playlistUrl);
    if (!playlistId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Could not extract a valid YouTube playlist ID. Example: https://www.youtube.com/playlist?list=PL...',
        },
        { status: 400 }
      );
    }

    // 1. Fetch playlist page from YouTube
    const ytUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
    const ytRes = await fetch(ytUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      cache: 'no-store',
    });

    if (!ytRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to fetch YouTube playlist (HTTP ${ytRes.status}). Please check that the playlist is public or unlisted.`,
        },
        { status: 400 }
      );
    }

    const html = await ytRes.text();

    // 2. Extract Playlist Title
    let resolvedTitle = (playlistName || '').trim();
    if (!resolvedTitle) {
      const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
      if (ogTitleMatch && ogTitleMatch[1]) {
        resolvedTitle = ogTitleMatch[1].trim();
      } else {
        const titleTagMatch = html.match(/<title>([^<]+)<\/title>/);
        if (titleTagMatch && titleTagMatch[1]) {
          resolvedTitle = titleTagMatch[1].replace(/ - YouTube$/, '').trim();
        }
      }
    }
    if (!resolvedTitle) {
      resolvedTitle = 'YouTube Video Series';
    }

    // 3. Extract Videos from ytInitialData
    const extractedVideos: ExtractedVideo[] = [];
    const ytDataMatch = html.match(/var ytInitialData = ({.*?});<\/script>/);

    if (ytDataMatch && ytDataMatch[1]) {
      try {
        const ytData = JSON.parse(ytDataMatch[1]);
        const secList =
          ytData.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content
            ?.sectionListRenderer;
        const items = secList?.contents?.[0]?.itemSectionRenderer?.contents || [];

        const seenIds = new Set<string>();

        for (const item of items) {
          if (item.lockupViewModel) {
            const lm = item.lockupViewModel;
            const id = lm.contentId;
            const title = lm.metadata?.lockupMetadataViewModel?.title?.content;
            const badge =
              lm.contentImage?.thumbnailViewModel?.overlays?.[0]
                ?.thumbnailBottomOverlayViewModel?.badges?.[0]?.thumbnailBadgeViewModel;
            const duration = badge?.text || '0:00';

            if (id && title && !seenIds.has(id)) {
              seenIds.add(id);
              extractedVideos.push({
                id,
                title: title.trim(),
                duration,
                thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${id}`,
              });
            }
          } else if (item.playlistVideoRenderer) {
            const pvr = item.playlistVideoRenderer;
            const id = pvr.videoId;
            const title = pvr.title?.runs?.[0]?.text || pvr.title?.simpleText;
            const duration = pvr.lengthText?.simpleText || '0:00';

            if (id && title && !seenIds.has(id)) {
              seenIds.add(id);
              extractedVideos.push({
                id,
                title: title.trim(),
                duration,
                thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${id}`,
              });
            }
          }
        }
      } catch (err) {
        console.error('Error parsing ytInitialData:', err);
      }
    }

    // Fallback: If 0 videos extracted, check if YOUTUBE_API_KEY is available
    if (extractedVideos.length === 0 && process.env.YOUTUBE_API_KEY) {
      try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
        const apiRes = await fetch(apiUrl);
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          for (const item of apiData.items || []) {
            const id = item.contentDetails?.videoId;
            const title = item.snippet?.title;
            if (id && title && title !== 'Private video' && title !== 'Deleted video') {
              extractedVideos.push({
                id,
                title: title.trim(),
                duration: '0:00',
                thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${id}`,
              });
            }
          }
        }
      } catch (apiErr) {
        console.error('YouTube API fallback failed:', apiErr);
      }
    }

    if (extractedVideos.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Could not find any public videos in this playlist. Please ensure the playlist is public and contains videos.',
        },
        { status: 400 }
      );
    }

    // 4. Create / Ensure Series document exists
    const seriesSlug = slugify(resolvedTitle) || `playlist-${playlistId}`;
    const seriesRelPath = `content/video-series/${seriesSlug}.md`;
    const seriesContent = `---
title: "${cleanYamlString(resolvedTitle)}"
description: "Lectures and videos from the ${cleanYamlString(resolvedTitle)} playlist."
---
`;

    const seriesDiskPath = path.join(process.cwd(), 'content', 'video-series', `${seriesSlug}.md`);
    try {
      const seriesDir = path.dirname(seriesDiskPath);
      if (!fs.existsSync(seriesDir)) {
        fs.mkdirSync(seriesDir, { recursive: true });
      }
      if (!fs.existsSync(seriesDiskPath)) {
        fs.writeFileSync(seriesDiskPath, seriesContent, 'utf8');
      }
    } catch {
      // Non-blocking for environments where local disk might be read-only
    }
    // Also push series to GitHub if configured
    await commitToGitHubIfConfigured(
      seriesRelPath,
      seriesContent,
      `Add video series: ${resolvedTitle}`
    );

    // 5. Ensure default speaker exists
    const speakerDiskPath = path.join(process.cwd(), 'content', 'speakers', 'jesus-loves-ministry.md');
    const speakerRelPath = 'content/speakers/jesus-loves-ministry.md';
    const speakerContent = `---
title: Jesus Loves Ministry
role: Biblical Teaching Ministry
bio: Proclaiming the Gospel and biblical truth through scripture lessons, teachings, and video lectures.
---
`;
    try {
      if (!fs.existsSync(speakerDiskPath)) {
        fs.writeFileSync(speakerDiskPath, speakerContent, 'utf8');
      }
    } catch {
      // Non-blocking
    }
    await commitToGitHubIfConfigured(
      speakerRelPath,
      speakerContent,
      'Add Jesus Loves Ministry speaker profile'
    );

    // 6. Create Video MDX Documents inside the Playlist Folder
    const importedVideos: { slug: string; title: string; videoUrl: string; folder: string }[] = [];
    const playlistFolder = seriesSlug;
    const playlistDir = path.join(process.cwd(), 'content', 'videos', playlistFolder);
    try {
      if (!fs.existsSync(playlistDir)) {
        fs.mkdirSync(playlistDir, { recursive: true });
      }
    } catch {
      // Non-blocking
    }

    const recordedDate = new Date().toISOString();
    let defaultLang = (language || '').trim();
    if (!defaultLang) {
      defaultLang =
        detectLanguageFromText(resolvedTitle) ||
        detectLanguageFromText(extractedVideos[0]?.title || '') ||
        '';
    }

    for (let index = 0; index < extractedVideos.length; index++) {
      const v = extractedVideos[index];
      const videoLang = defaultLang || detectLanguageFromText(v.title) || '';
      let videoSlug = slugify(v.title);
      if (!videoSlug || videoSlug.length < 3) {
        videoSlug = `video-${v.id}`;
      }

      const filename = `${videoSlug}.mdx`;
      const diskPath = path.join(playlistDir, filename);
      const relPath = `content/videos/${playlistFolder}/${filename}`;

      const videoMdx = `---
title: "${cleanYamlString(v.title)}"
series: ${seriesRelPath}
speaker: ${speakerRelPath}
scripture: Scripture Study
duration: '${v.duration}'
recordedDate: ${recordedDate}
description: "${cleanYamlString(v.title)}"
thumbnail: '${v.thumbnail}'
videoUrl: '${v.videoUrl}'${videoLang ? `\nlanguage: ${videoLang}` : ''}
---

## ${v.title}

Video presentation from the **${cleanYamlString(resolvedTitle)}** playlist.
`;

      try {
        fs.writeFileSync(diskPath, videoMdx, 'utf8');
      } catch (writeErr) {
        console.error(`Failed to write video ${diskPath}:`, writeErr);
      }

      await commitToGitHubIfConfigured(
        relPath,
        videoMdx,
        `Import video: ${v.title} via Tina Admin`
      );

      importedVideos.push({
        slug: `${playlistFolder}/${videoSlug}`,
        title: v.title,
        videoUrl: v.videoUrl,
        folder: playlistFolder,
      });
    }

    return NextResponse.json({
      success: true,
      importedCount: importedVideos.length,
      playlistName: resolvedTitle,
      folder: playlistFolder,
      seriesSlug,
      language: defaultLang || null,
      videos: importedVideos,
    });
  } catch (error: any) {
    console.error('Playlist import route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred while importing the playlist.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/youtube/playlist',
    method: 'POST',
    description: 'Imports a YouTube playlist into TinaCMS video documents and series.',
    bodyParams: {
      playlistUrl: 'string (required) - e.g. https://www.youtube.com/playlist?list=PL...',
      playlistName: 'string (optional) - defaults to YouTube playlist title',
      language: 'string (optional) - Kannada, English, Tamil, Telugu, Hindi, Malayalam',
    },
  });
}
