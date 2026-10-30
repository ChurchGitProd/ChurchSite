import { defineConfig } from "tinacms";
import { scripturaCmsCallback } from "./adminCustomizer";
import YouTubeUrlField from "./components/YouTubeUrlField";

// Validation helper ensuring uploaded/selected document has .pdf extension
const validatePdfField = (val?: string) => {
  if (!val) return undefined;
  const clean = String(val).split('?')[0].split('#')[0].toLowerCase().trim();
  if (!clean.endsWith('.pdf')) {
    return 'Please select or upload a valid PDF document (.pdf extension required).';
  }
  return undefined;
};

// Your hosting provider's Git API URL


const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
  process.env.TINA_CLIENT_ID ||
  process.env.GITHUB_CLIENT_ID ||
  "";

const token =
  process.env.TINA_TOKEN ||
  process.env.GITHUB_TOKEN ||
  "";




export default defineConfig({
  branch,
  clientId,
  token,
  cmsCallback: scripturaCmsCallback,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "book",
        label: "Books",
        path: "content/books",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "abstract",
            label: "Scholarly Abstract",
            description: "Scholarly abstract or comprehensive summary for this monograph",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "format",
            label: "Format / Badge",
            options: ["Monograph", "Manual"],
            required: true,
          },
          {
            type: "string",
            name: "subject",
            label: "Subject",
            options: ["Hermeneutics", "Biblical Archaeology", "Covenant Theology"],
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            type: "string",
            name: "featured",
            label: "Featured",
            options: ["yes", "no"],
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Book Monograph PDF",
            description: "Upload or select a PDF monograph file for digital download",
            ui: {
              validate: validatePdfField,
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Book Overview / Abstract",
            isBody: true,
          },
        ],
      },
      {
        name: "lesson",
        label: "Bible Lessons",
        path: "content/lessons",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "book",
            label: "Book of the Bible",
            required: true,
          },
          {
            type: "string",
            name: "chapters",
            label: "Chapters",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "content",
            label: "Lesson Content",
            isBody: true,
          },
          {
            type: "string",
            name: "teacher",
            label: "Teacher / Author",
            required: true,
          },
          {
            type: "string",
            name: "division",
            label: "Biblical Division",
            options: ["Pentateuch", "Historical Books", "Gospels & Acts", "Epistles"],
            required: true,
          },
          {
            type: "string",
            name: "difficulty",
            label: "Difficulty Level",
            options: ["beginner", "intermediate", "advanced"],
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Lesson Cover Image",
            description: "Optional cover image for this expository lesson",
          },
        ],
      },
      {
        name: "magazine",
        label: "Magazines",
        path: "content/magazines",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "issue",
            label: "Issue",
            required: true,
          },
          {
            type: "string",
            name: "season",
            label: "Season / Issue",
            options: ["Spring", "Summer", "Fall", "Winter"],
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            options: ["2024", "2023", "2022", "2021"],
          },
          {
            type: "string",
            name: "topic",
            label: "Topic",
            options: ["Biblical Studies", "Systematic Theology", "Church History", "Ethics"],
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "publishDate",
            label: "Publish Date",
          },
          {
            type: "number",
            name: "articlesCount",
            label: "Articles Count",
          },
          {
            type: "number",
            name: "contributorsCount",
            label: "Contributors Count",
          },
          {
            type: "number",
            name: "pagesCount",
            label: "Pages Count",
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / Tag",
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Magazine Issue PDF",
            description: "Upload or select a PDF magazine issue file for digital download",
            ui: {
              validate: validatePdfField,
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Issue Content / Overview",
            isBody: true,
          },
        ],
      },
      {
        name: "dailyLetter",
        label: "Daily Newsletter",
        path: "content/newsletter",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Contributing Scholar / Author",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Summary",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Devotional Reflection",
            isBody: true,
          },
        ],
      },
      {
        name: "bibleReference",
        label: "Scripture References",
        path: "content/references",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Reference Image",
          },
          {
            type: "string",
            name: "author",
            label: "Author / Scholar",
            required: true,
          },
          {
            type: "string",
            name: "testament",
            label: "Testament",
            options: ["Old Testament", "New Testament"],
            required: true,
          },
          {
            type: "string",
            name: "genre",
            label: "Biblical Genre",
            options: ["Prophecy", "Law", "Poetry & Wisdom", "Gospels", "Epistles"],
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Commentary Body",
            isBody: true,
          },
        ],
      },
      {
        name: "video",
        label: "Video Lectures",
        path: "content/videos",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "series",
            label: "Series Tag",
            options: ["Hermeneutics Series", "Archaeology Series", "Covenant Series"],
            required: true,
          },
          {
            type: "string",
            name: "speaker",
            label: "Speaker",
            options: ["Dr. Charles Vance", "Prof. Julian Mercer", "Dr. Thomas Keller"],
            required: true,
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true,
          },
          {
            type: "string",
            name: "duration",
            label: "Video Duration",
            required: true,
          },
          {
            type: "string",
            name: "recordedDate",
            label: "Recorded Date",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Video Thumbnail",
          },
          {
            type: "string",
            name: "videoUrl",
            label: "YouTube Video URL",
            description: "Paste a YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)",
            ui: {
              component: YouTubeUrlField,
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Lecture Notes & Outline",
            isBody: true,
          },
        ],
      },
      {
        name: "bibleImage",
        label: "Sacred Images",
        path: "content/images",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category / Classification",
            options: ["Archaeology", "Manuscript", "Manuscripts", "Scribal Study", "Diagrams"],
            required: true,
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "High-Resolution Image",
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Historical Date / Era",
          },
          {
            type: "string",
            name: "citation",
            label: "Archival Citation & Attribution",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Commentary Body",
            isBody: true,
          },
        ],
      },
      {
        name: "libraryResource",
        label: "Digital Library",
        path: "content/library",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Commentaries",
              "Lexicons",
              "Historical Documents",
              "Theological Treatises",
              "Research Papers",
            ],
            required: true,
          },
          {
            type: "string",
            name: "era",
            label: "Historical Era",
            options: [
              "Patristic Era",
              "Reformation",
              "Modern Scholarship",
              "Contemporary",
            ],
            required: true,
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / Classification",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Author / Scholar",
          },
          {
            type: "string",
            name: "primaryDetail",
            label: "Primary Metadata",
          },
          {
            type: "string",
            name: "detailIcon",
            label: "Detail Icon",
            options: ["calendar", "languages", "user", "scroll", "graduation-cap"],
          },
          {
            type: "string",
            name: "tags",
            label: "Metadata Tags",
            list: true,
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Research Document PDF",
            description: "Upload or select a research paper or treatise PDF file for digital consultation",
            ui: {
              validate: validatePdfField,
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Resource Overview / Content Outline",
            isBody: true,
          },
        ],
      },
      {
        name: "archiveDocument",
        label: "Historical Archives",
        path: "content/archives",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Historical Commentary",
              "Seminar Transcript",
              "Manuscript Documentation",
            ],
            required: true,
          },
          {
            type: "string",
            name: "catalogRef",
            label: "Catalog Reference",
            required: true,
          },
          {
            type: "string",
            name: "dateLabel",
            label: "Date / Published Label",
            required: true,
          },
          {
            type: "string",
            name: "attributionRole",
            label: "Attribution Role",
          },
          {
            type: "string",
            name: "attributionName",
            label: "Attribution Name",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "actionLabel",
            label: "Action Button Label",
          },
          {
            type: "string",
            name: "actionType",
            label: "Action Type",
            options: ["download", "link"],
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Archival Document / Transcript PDF",
            description: "Upload or select an archival facsimile or transcript PDF file",
            ui: {
              validate: validatePdfField,
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Document Content / Overview",
            isBody: true,
          },
        ],
      },
      {
        name: "usefulResource",
        label: "Web Resources",
        path: "content/resources",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Bible Software",
              "Commentaries",
              "Lexicons & Dictionaries",
              "Academic Journals",
              "Church History",
              "Original Languages",
            ],
            required: true,
          },
          {
            type: "string",
            name: "pricingType",
            label: "Pricing Type",
            options: [
              "Free",
              "Paid",
              "Open Access",
            ],
            required: true,
          },
          {
            type: "string",
            name: "rating",
            label: "Rating",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail Image",
          },
          {
            type: "string",
            name: "externalUrl",
            label: "External Website URL",
          },
          {
            type: "string",
            name: "actionLabel",
            label: "Action Button Label",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Overview / Notes",
            isBody: true,
          },
        ],
      },
      {
        name: "quickLink",
        label: "Quick Links",
        path: "content/quick-links",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle / Metric",
            required: true,
          },
          {
            type: "string",
            name: "targetUrl",
            label: "Target URL",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Quick Guide / Overview",
            isBody: true,
          },
        ],
      },
      {
        name: "home",
        label: "Home",
        path: "content/home",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badgeText",
                label: "Hero Badge Text",
                description: "Pill badge at top of hero (e.g. PREMIUM DIGITAL BIBLE LIBRARY & SCHOLARLY ARCHIVE)",
              },
              {
                type: "string",
                name: "headingLine1",
                label: "Heading Line 1 (Bold Blue)",
                description: "First line in bold blue sans-serif typography (e.g. Unveiling the Depth of)",
              },
              {
                type: "string",
                name: "headingLine2",
                label: "Heading Line 2 (Gold Script)",
                description: "Second line in elegant gold handwritten script typography (e.g. Holy Scripture)",
              },
              {
                type: "string",
                name: "headline",
                label: "Combined Headline (Fallback)",
                description: "Legacy combined title fallback",
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline / Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "ctaText",
                label: "Primary CTA Button Text",
                required: true,
              },
              {
                type: "string",
                name: "ctaLink",
                label: "Primary CTA Button Destination Link",
                required: true,
              },
              {
                type: "string",
                name: "secondaryCtaText",
                label: "Secondary CTA Button Text",
                required: true,
              },
              {
                type: "string",
                name: "secondaryCtaLink",
                label: "Secondary CTA Button Destination Link",
                required: true,
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hero Featured Image",
              },
            ],
          },
          {
            type: "object",
            name: "scriptureOfTheDay",
            label: "Scripture of the Day",
            fields: [
              {
                type: "object",
                name: "dailyVerses",
                label: "Daily Verses (Day 1 – 31)",
                description:
                  "Add one entry per day of the month. The website shows the entry matching today's date (India time, switching at 12:00 AM) and repeats every month. Edit any entry at any time to change that day.",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.day
                      ? `Day ${item.day}${item?.reference ? ` — ${item.reference}` : ""}`
                      : "New Day",
                  }),
                },
                fields: [
                  {
                    type: "number",
                    name: "day",
                    label: "Day of Month (1 – 31)",
                    required: true,
                    ui: {
                      validate: (val?: number) => {
                        if (!Number.isInteger(val) || (val as number) < 1 || (val as number) > 31) {
                          return "Enter a whole number from 1 to 31.";
                        }
                      },
                    },
                  },
                  {
                    type: "string",
                    name: "verse",
                    label: "Verse Text",
                    required: true,
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
                    required: true,
                  },
                ],
              },
              {
                type: "string",
                name: "verse",
                label: "Fallback Verse Text",
                description: "Shown only when no Daily Verse exists for any day.",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "reference",
                label: "Fallback Scripture Reference",
              },
            ],
          },
          {
            type: "object",
            name: "featuredLessons",
            label: "Featured Lessons Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "object",
                name: "lesson1",
                label: "Lesson 1",
                fields: [
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "readTime",
                    label: "Read Time",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Lesson Image",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Lesson Route / URL (optional)",
                    description: "Target route for this lesson (e.g. /lessons/genesis-1-11-the-theology-of-creation)",
                  },
                ],
              },
              {
                type: "object",
                name: "lesson2",
                label: "Lesson 2",
                fields: [
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "readTime",
                    label: "Read Time",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Lesson Image",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Lesson Route / URL (optional)",
                    description: "Target route for this lesson (e.g. /lessons/grace-justification-and-new-life)",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "newsletter",
            label: "Newsletter Signup Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Newsletter Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Newsletter Description",
                required: true,
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "zoomMeeting",
            label: "Upcoming Zoom Meeting",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Meeting Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Meeting Description",
                required: true,
              },
              {
                type: "string",
                name: "date",
                label: "Meeting Date",
                required: true,
              },
              {
                type: "string",
                name: "time",
                label: "Meeting Time",
                required: true,
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true,
              },
              {
                type: "string",
                name: "buttonLink",
                label: "Button Link",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "latestReferences",
            label: "Latest Bible References Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
              {
                type: "object",
                name: "items",
                label: "Reference Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
                  },
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "tags",
                    label: "Tags",
                    list: true,
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "featuredVideos",
            label: "Featured Bible Videos Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
              {
                type: "object",
                name: "items",
                label: "Video Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "series",
                    label: "Series Tag",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "duration",
                    label: "Duration",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Cover Image",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "galleryPreview",
            label: "Bible Image Gallery Preview Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
              {
                type: "object",
                name: "items",
                label: "Gallery Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Image Title",
                  },
                  {
                    type: "string",
                    name: "category",
                    label: "Category / Tag",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "featuredPublications",
            label: "Featured Books & Magazines Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
              {
                type: "object",
                name: "book",
                label: "Featured Book",
                fields: [
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "image",
                    name: "coverImage",
                    label: "Cover Image",
                  },
                  {
                    type: "string",
                    name: "downloadLink",
                    label: "Download Link",
                  },
                ],
              },
              {
                type: "object",
                name: "magazine",
                label: "Featured Magazine",
                fields: [
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "issue",
                    label: "Issue / Number",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "image",
                    name: "coverImage",
                    label: "Cover Image",
                  },
                  {
                    type: "string",
                    name: "readLink",
                    label: "Read Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "announcementsWidget",
            label: "Platform Announcements Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Widget Title",
              },
              {
                type: "object",
                name: "items",
                label: "Announcements",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "date",
                    label: "Date",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "usefulToolsWidget",
            label: "Useful Tools Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Widget Title",
              },
              {
                type: "object",
                name: "tools",
                label: "Tools",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Tool Name",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Tool Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "quickStudyLinksWidget",
            label: "Quick Study Links Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Widget Title",
              },
              {
                type: "object",
                name: "links",
                label: "Study Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Link Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Target Route / URL",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    options: [
                      "BookOpen",
                      "Bookmark",
                      "Clipboard",
                      "Folder",
                      "FileText",
                      "Video",
                      "Image",
                      "Globe"
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "quarterlyNewsletter",
            label: "Pre-Footer Quarterly Newsletter Strip",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About Us",
        path: "content/about",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "introTitle",
            label: "Introduction Title",
            required: true,
          },
          {
            type: "string",
            name: "introParagraph1",
            label: "Introduction Paragraph 1",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "introParagraph2",
            label: "Introduction Paragraph 2",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "mission",
            label: "Mission Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Mission Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Mission Description",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "vision",
            label: "Vision Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Vision Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Vision Description",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "statementOfFaith",
            label: "Statement of Faith",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "point1Title",
                label: "Point 1 Title",
                required: true,
              },
              {
                type: "string",
                name: "point1Text",
                label: "Point 1 Text",
                required: true,
              },
              {
                type: "string",
                name: "point2Title",
                label: "Point 2 Title",
                required: true,
              },
              {
                type: "string",
                name: "point2Text",
                label: "Point 2 Text",
                required: true,
              },
              {
                type: "string",
                name: "point3Title",
                label: "Point 3 Title",
                required: true,
              },
              {
                type: "string",
                name: "point3Text",
                label: "Point 3 Text",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "quoteWidget",
            label: "Quote Widget",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote Text",
                required: true,
              },
              {
                type: "string",
                name: "author",
                label: "Quote Author",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "leadershipTitle",
            label: "Leadership Section Title",
          },
          {
            type: "object",
            name: "leadership",
            label: "Academic Leadership",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item.name}${item.role ? ' — ' + item.role : ''}` : "Leadership Member",
              }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Scholar Name",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Role / Position",
                required: true,
              },
              {
                type: "image",
                name: "avatar",
                label: "Avatar / Portrait Image",
                required: true,
              },
              {
                type: "string",
                name: "bio",
                label: "Biography",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "academicOffice",
            label: "Academic Office Contact Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "address",
                label: "Address",
              },
              {
                type: "string",
                name: "email",
                label: "Email",
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "string",
                name: "buttonLink",
                label: "Button Link",
              },
            ],
          },
        ],
      },
      {
        name: "contact",
        label: "Contact",
        path: "content/contact",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "emailCard",
            label: "Email Contact Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "email",
                label: "Email Address",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "phoneCard",
            label: "Phone Contact Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "locationCard",
            label: "Location Contact Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "contactForm",
            label: "Contact Form Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Form Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Form Description",
                required: true,
              },
              {
                type: "string",
                name: "submitButtonText",
                label: "Submit Button Text",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "officeHours",
            label: "Office Hours Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "weekdayHours",
                label: "Weekday Hours",
                required: true,
              },
              {
                type: "string",
                name: "saturdayHours",
                label: "Saturday Hours",
                required: true,
              },
              {
                type: "string",
                name: "sundayHours",
                label: "Sunday Hours",
                required: true,
              },
              {
                type: "string",
                name: "note",
                label: "Note",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "mapLocation",
            label: "Map Location Section",
            fields: [
              {
                type: "image",
                name: "imageUrl",
                label: "Map Image URL",
              },
              {
                type: "string",
                name: "addressText",
                label: "Map Address Overlay Text",
              },
            ],
          },
          {
            type: "object",
            name: "additionalInfo",
            label: "Additional Information Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "items",
                label: "Information Points",
                list: true,
              },
            ],
          },
        ],
      },
      {
        name: "zoomInfo",
        label: "Seminars & Zoom",
        path: "content/zoom-info",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "featuredMeeting",
            label: "Featured Meeting Card",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true,
              },
              {
                type: "string",
                name: "time",
                label: "Time",
                required: true,
              },
              {
                type: "string",
                name: "duration",
                label: "Duration",
                required: true,
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true,
              },
              {
                type: "string",
                name: "zoomUrl",
                label: "Real Zoom Meeting Link",
                description: "Paste the actual Zoom meeting URL.",
              },
            ],
          },
          {
            type: "object",
            name: "speakerCard",
            label: "Speaker Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true,
              },
              {
                type: "string",
                name: "bio",
                label: "Bio",
                required: true,
              },
              {
                type: "image",
                name: "avatarUrl",
                label: "Speaker Avatar Image",
                description: "Upload or select an avatar image for the featured speaker",
              },
            ],
          },
          {
            type: "object",
            name: "meetingAccessCard",
            label: "Meeting Access Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "platform",
                label: "Platform",
                required: true,
              },
              {
                type: "string",
                name: "meetingId",
                label: "Meeting ID",
                required: true,
              },
              {
                type: "string",
                name: "passcode",
                label: "Passcode",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "preparationCard",
            label: "Preparation Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                required: true,
              },
              {
                type: "string",
                name: "reading1",
                label: "Reading 1",
                required: true,
              },
              {
                type: "string",
                name: "reading2",
                label: "Reading 2",
                required: true,
              },
              {
                type: "string",
                name: "reading3",
                label: "Reading 3",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "sessionsTitle",
            label: "Sessions Section Title",
            required: true,
          },
          {
            type: "object",
            name: "sessions",
            label: "Upcoming & Past Sessions",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title ? `${item.title}${item.date ? ' — ' + item.date : ''}` : "Seminar Session",
              }),
            },
            fields: [
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Session Title",
                required: true,
              },
              {
                type: "string",
                name: "status",
                label: "Status (e.g. Upcoming, Recording Available)",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "speaker",
                label: "Speaker / Faculty",
                required: true,
              },
              {
                type: "string",
                name: "timeOrActionText",
                label: "Time or Action Text (e.g. '7:00 PM EST' or 'Watch Recording →')",
              },
              {
                type: "string",
                name: "actionUrl",
                label: "Action URL (e.g. /videos for recordings)",
              },
              {
                type: "boolean",
                name: "isDashed",
                label: "Use dashed border style",
              },
            ],
          },
          {
            type: "object",
            name: "relatedScripture",
            label: "Related Scripture Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "scripture1Title",
                label: "Scripture 1 Title",
                required: true,
              },
              {
                type: "string",
                name: "scripture1Subtitle",
                label: "Scripture 1 Subtitle",
                required: true,
              },
              {
                type: "string",
                name: "scripture2Title",
                label: "Scripture 2 Title",
                required: true,
              },
              {
                type: "string",
                name: "scripture2Subtitle",
                label: "Scripture 2 Subtitle",
                required: true,
              },
              {
                type: "string",
                name: "scripture3Title",
                label: "Scripture 3 Title",
                required: true,
              },
              {
                type: "string",
                name: "scripture3Subtitle",
                label: "Scripture 3 Subtitle",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "books",
        label: "Books Directory",
        path: "content/books",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "object",
            name: "featuredBook",
            label: "Featured Book Spotlight",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "image",
                name: "coverImage",
                label: "Cover Image",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
                required: true,
              },
              {
                type: "string",
                name: "abstractButtonText",
                label: "Abstract Button Text",
                required: true,
              },
              {
                type: "image",
                name: "pdfFile",
                label: "Featured Book PDF",
                description: "Upload or select a PDF file for this featured spotlight monograph",
                ui: {
                  validate: validatePdfField,
                },
              },
            ],
          },
          {
            type: "string",
            name: "submissionsTitle",
            label: "Submissions Widget Title",
            required: true,
          },
          {
            type: "string",
            name: "submissionsDescription",
            label: "Submissions Widget Description",
            required: true,
          },
          {
            type: "string",
            name: "submissionsButtonText",
            label: "Submissions Button Text",
            required: true,
          },
        ],
      },
      {
        name: "lessons",
        label: "Lessons Directory",
        path: "content/lessons",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "object",
            name: "featuredLesson",
            label: "Featured Lesson Block",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "teacher",
                label: "Teacher",
                required: true,
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true,
              },
              {
                type: "image",
                name: "image",
                label: "Featured Spotlight Cover Image (Optional)",
                description: "Upload or choose an image for this featured lesson spotlight.",
              },
            ],
          },
          {
            type: "string",
            name: "progressTitle",
            label: "Progress Widget Title",
            required: true,
          },
          {
            type: "string",
            name: "progressCourse",
            label: "Progress Course Name",
            required: true,
          },
          {
            type: "string",
            name: "progressPercentage",
            label: "Progress Percentage",
            required: true,
          },
          {
            type: "string",
            name: "progressDescription",
            label: "Progress Description",
            required: true,
          },
          {
            type: "string",
            name: "progressButtonText",
            label: "Progress Button Text",
            required: true,
          },
          {
            type: "string",
            name: "seminarTitle",
            label: "Seminar Widget Title",
            required: true,
          },
        ],
      },
      {
        name: "magazines",
        label: "Magazines Directory",
        path: "content/magazines",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "featuredIssue",
            label: "Featured Issue Hero",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true,
              },
              {
                type: "string",
                name: "details",
                label: "Details",
                required: true,
              },
              {
                type: "image",
                name: "coverImage",
                label: "Cover Image",
              },
              {
                type: "string",
                name: "readButtonText",
                label: "Read Button Text",
                required: true,
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
                required: true,
              },
              {
                type: "image",
                name: "pdfFile",
                label: "Magazine Issue PDF",
                description: "Upload or select a PDF for digital magazine download",
                ui: {
                  validate: validatePdfField,
                },
              },
            ],
          },
          {
            type: "string",
            name: "spotlightTitle",
            label: "Spotlight Section Title",
            required: true,
          },
          {
            type: "string",
            name: "archiveTitle",
            label: "Archive Section Title",
            required: true,
          },
        ],
      },
      {
        name: "newsletter",
        label: "Newsletter Directory",
        path: "content/newsletter",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "featuredDevotional",
            label: "Featured Devotional",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "scripture",
                label: "Scripture Quote",
                required: true,
              },
              {
                type: "string",
                name: "content",
                label: "Content",
                required: true,
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true,
              },
              {
                type: "image",
                name: "coverImage",
                label: "Devotional Background Cover Image (Optional)",
                description: "Upload or select a subtle background cover image for the featured devotional card",
              },
            ],
          },
          {
            type: "object",
            name: "signupCTA",
            label: "Signup CTA Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true,
              },
              {
                type: "string",
                name: "privacyNote",
                label: "Privacy Note",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "scriptureQuote",
            label: "Scripture Quote Banner",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                required: true,
              },
              {
                type: "string",
                name: "reference",
                label: "Reference",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "references",
        label: "References Directory",
        path: "content/references",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "object",
            name: "featuredReference",
            label: "Featured Reference Block",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "crossReferences",
                label: "Cross References",
                required: true,
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "topicsTitle",
            label: "Topics Widget Title",
            required: true,
          },
          {
            type: "string",
            name: "relatedLessonTitle",
            label: "Related Lesson Widget Title",
            required: true,
          },
          {
            type: "string",
            name: "relatedLessonCourse",
            label: "Related Lesson Course Name",
            required: true,
          },
          {
            type: "string",
            name: "relatedLessonDescription",
            label: "Related Lesson Description",
            required: true,
          },
          {
            type: "string",
            name: "relatedLessonButtonText",
            label: "Related Lesson Button Text",
            required: true,
          },
          {
            type: "image",
            name: "relatedLessonImage",
            label: "Related Lesson Course Thumbnail (Optional)",
            description: "Upload or select an image for the Related Lesson Course widget in the sidebar",
          },
        ],
      },
      {
        name: "videos",
        label: "Videos Directory",
        path: "content/videos",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "object",
            name: "featuredVideo",
            label: "Featured Video Hero",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "speaker",
                label: "Speaker",
                required: true,
              },
              {
                type: "string",
                name: "scripture",
                label: "Scripture",
                required: true,
              },
              {
                type: "string",
                name: "recorded",
                label: "Recorded Date",
                required: true,
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true,
              },
              {
                type: "string",
                name: "videoUrl",
                label: "Featured YouTube Video URL (Optional)",
                description: "Paste a YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)",
              },
              {
                type: "image",
                name: "coverImage",
                label: "Featured Cover Image / Thumbnail (Optional)",
                description: "Upload or choose a custom cover image to display in the hero section.",
              },
            ],
          },
          {
            type: "string",
            name: "lecturesTitle",
            label: "Lectures Section Title",
            required: true,
          },
        ],
      },
      {
        name: "images",
        label: "Images Directory",
        path: "content/images",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "object",
            name: "featuredImage",
            label: "Featured Image Spotlight",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "scriptureLabel",
                label: "Scripture Label",
                required: true,
              },
              {
                type: "string",
                name: "scriptureQuote",
                label: "Scripture Quote",
                required: true,
              },
              {
                type: "string",
                name: "scriptureReference",
                label: "Scripture Reference",
                required: true,
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
                required: true,
              },
              {
                type: "string",
                name: "citationButtonText",
                label: "Citation Button Text",
                required: true,
              },
              {
                type: "image",
                name: "image",
                label: "Featured Image",
              },
            ],
          },
          {
            type: "string",
            name: "archiveTitle",
            label: "Archive Section Title",
            required: true,
          },
        ],
      },
      {
        name: "library",
        label: "Library Directory",
        path: "content/library",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "object",
            name: "featuredResource",
            label: "Featured Resource Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "details",
                label: "Details",
                required: true,
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "categoriesTitle",
            label: "Categories Widget Title",
            required: true,
          },
          {
            type: "string",
            name: "popularTitle",
            label: "Popular Resources Widget Title",
            required: true,
          },
          {
            type: "string",
            name: "recentTitle",
            label: "Recent Additions Widget Title",
            required: true,
          },
        ],
      },
      {
        name: "archives",
        label: "Archives Directory",
        path: "content/archives",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "catalogInfo",
            label: "Catalog Info Text",
            required: true,
          },
          {
            type: "object",
            name: "featuredArchive",
            label: "Featured Archive Block",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "catalogRef",
                label: "Catalog Reference",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "category",
                label: "Category",
                required: true,
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true,
              },
              {
                type: "image",
                name: "pdfFile",
                label: "Featured Document PDF",
                description: "Upload or select a PDF file for this featured archival document (optional)",
                ui: {
                  validate: validatePdfField,
                },
              },
            ],
          },
          {
            type: "string",
            name: "classificationsTitle",
            label: "Classifications Widget Title",
            required: true,
          },
          {
            type: "object",
            name: "accessPolicy",
            label: "Access Policy Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "resources",
        label: "Resources Directory",
        path: "content/resources",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "featuredResource",
            label: "Featured Resource Banner",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "rating",
                label: "Rating",
                required: true,
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true,
              },
              {
                type: "string",
                name: "linkUrl",
                label: "Link URL",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "string",
            name: "popularResourcesTitle",
            label: "Popular Resources Title",
            required: true,
          },
          {
            type: "string",
            name: "recentAdditionsTitle",
            label: "Recent Additions Title",
            required: true,
          },
          {
            type: "string",
            name: "categoryTagsTitle",
            label: "Category Tags Title",
            required: true,
          },
        ],
      },
      {
        name: "quickLinks",
        label: "Quick Links Directory",
        path: "content/quick-links",
        format: "md",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "featuredBanner",
            label: "Featured Access Banner",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "button1Text",
                label: "Button 1 Text",
                required: true,
              },
              {
                type: "string",
                name: "button1Link",
                label: "Button 1 Link",
                required: true,
              },
              {
                type: "string",
                name: "button2Text",
                label: "Button 2 Text",
                required: true,
              },
              {
                type: "string",
                name: "button2Link",
                label: "Button 2 Link",
                required: true,
              },
              {
                type: "string",
                name: "button3Text",
                label: "Button 3 Text",
                required: true,
              },
              {
                type: "string",
                name: "button3Link",
                label: "Button 3 Link",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "categorySectionTitle",
            label: "Category Section Title",
            required: true,
          },
          {
            type: "string",
            name: "searchSectionTitle",
            label: "Search Section Title",
            required: true,
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true,
          },
          {
            type: "string",
            name: "shortcutsSectionTitle",
            label: "Shortcuts Section Title",
            required: true,
          },
        ],
      },
      {
        name: "page",
        label: "Standard Pages",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
              },
              {
                type: "string",
                name: "ctaLink",
                label: "CTA Button Link",
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hero Image",
              },
            ],
          },
        ],
      },
      {
        name: "global",
        label: "Website Navigation & Branding",
        path: "content/global",
        format: "json",
        match: {
          include: "index",
        },
        ui: {
          global: true,
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Website Brand Name",
            description: "Displayed in header and footer (e.g. SCRIPTURA)",
            required: true,
          },
          {
            type: "string",
            name: "siteTagline",
            label: "Brand Subtitle / Tagline",
            description: "Displayed under brand name (e.g. Digital Library)",
          },
          {
            type: "string",
            name: "logoIcon",
            label: "Brand Logo Icon / Emoji",
            description: "Logo icon or emoji displayed in header badge (e.g. 📚)",
          },
          {
            type: "string",
            name: "footerDescription",
            label: "Footer Brand Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "copyrightText",
            label: "Copyright Notice Text",
            description: "Text after copyright year (e.g. All rights reserved.)",
          },
          {
            type: "object",
            name: "topNavLinks",
            label: "Top Navigation Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Navigation Link",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "Identifier (e.g. home, about, contact)", required: true },
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true },
            ],
          },
          {
            type: "object",
            name: "navSections",
            label: "Navigation Dropdown Menus",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `Dropdown: ${item.label}` : "Dropdown Menu",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "Menu ID (e.g. bible, hub, connect)", required: true },
              { type: "string", name: "label", label: "Menu Label (e.g. Bible, Knowledge Hub)", required: true },
              {
                type: "object",
                name: "items",
                label: "Dropdown Sub-Links",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label ? `${item.label} (${item.href})` : "Sub-Link",
                  }),
                },
                fields: [
                  { type: "string", name: "id", label: "Link ID", required: true },
                  { type: "string", name: "label", label: "Link Label", required: true },
                  { type: "string", name: "href", label: "Destination URL", required: true },
                ],
              },
            ],
          },
          {
            type: "string",
            name: "footerQuickLinksTitle",
            label: "Footer Quick Links Column Title",
          },
          {
            type: "object",
            name: "footerQuickLinks",
            label: "Footer Quick Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Footer Link",
              }),
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true },
            ],
          },
          {
            type: "string",
            name: "footerResourcesTitle",
            label: "Footer Resources Column Title",
          },
          {
            type: "object",
            name: "footerResources",
            label: "Footer Resources Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Footer Link",
              }),
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true },
            ],
          },
          {
            type: "string",
            name: "footerConnectTitle",
            label: "Footer Connect Column Title",
          },
          {
            type: "object",
            name: "footerConnect",
            label: "Footer Connect Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Footer Link",
              }),
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true },
            ],
          },
        ],
      },
    ],
  },
});
