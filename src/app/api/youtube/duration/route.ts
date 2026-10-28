import { NextRequest, NextResponse } from 'next/server';
import { extractYouTubeId, formatIsoDuration } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get('url');
  const rawId = searchParams.get('id');

  // Allow extracting either from a full YouTube URL or a pre-extracted ID
  let videoId: string | null = null;
  if (rawId && /^[a-zA-Z0-9_-]{11}$/.test(rawId.trim())) {
    videoId = rawId.trim();
  } else if (rawUrl) {
    videoId = extractYouTubeId(rawUrl);
  }

  if (!videoId) {
    return NextResponse.json(
      {
        error: 'Invalid or unsupported YouTube URL. Please provide a standard watch, youtu.be, embed, or shorts link.',
        canManualEdit: true,
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return NextResponse.json(
      {
        error: 'YouTube API key (YOUTUBE_API_KEY) is not configured on the server. Please enter the duration manually.',
        canManualEdit: true,
        videoId,
      },
      { status: 200 }
    );
  }

  try {
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(apiKey.trim())}`;
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 400 || res.status === 403) {
        return NextResponse.json(
          {
            error: 'YouTube API request rejected (invalid API key or quota exceeded). Please enter duration manually.',
            canManualEdit: true,
            videoId,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          error: `YouTube API returned status ${res.status}. Please enter duration manually.`,
          canManualEdit: true,
          videoId,
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const item = data?.items?.[0];

    if (!item) {
      return NextResponse.json(
        {
          error: 'Video not found, private, or unavailable on YouTube. Please enter duration manually.',
          canManualEdit: true,
          videoId,
        },
        { status: 200 }
      );
    }

    const isoDuration = item?.contentDetails?.duration;
    const formatted = formatIsoDuration(isoDuration);

    if (!formatted) {
      return NextResponse.json(
        {
          error: 'Could not parse duration from YouTube. Please enter duration manually.',
          canManualEdit: true,
          videoId,
          rawDuration: isoDuration,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        videoId,
        duration: formatted,
        rawDuration: isoDuration,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'Network error contacting YouTube Data API. Please enter duration manually.',
        canManualEdit: true,
        videoId,
      },
      { status: 200 }
    );
  }
}
