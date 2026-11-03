import { defineConfig } from "tinacms";
import { scripturaCmsCallback, nextFreeScriptureDay } from "./adminCustomizer";
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
        ui: {
          filename: {
            slugify: (values: any) => {
              const base = String(values?.title || "book").toLowerCase();
              const slug = base
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80);
              return slug || "book";
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            description: 'Full title of the book, e.g. "The Abrahamic Promise".',
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            description: 'Who wrote the book, e.g. "Prof. Mercer" or "Dr. Charles Vance".',
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            description: 'One or two sentences shown on the book card, e.g. "The grammatical-historical method outlined with practical textual analysis exercises."',
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "abstract",
            label: "Scholarly Abstract",
            description: 'Scholarly abstract or comprehensive summary shown in the "Abstract" drawer on the book page, e.g. "A critical survey of Byzantine text families and their transmission history."',
            ui: {
              component: "textarea",
            },
          },
          {
            type: "reference",
            name: "format",
            label: "Format / Badge",
            collections: ["format"],
            required: true,
            description:
              "Pick the book's format, e.g. 'Monograph'. To add or remove options, open the 'Book Formats' collection in the left sidebar and create or delete a format.",
          },
          {
            type: "reference",
            name: "subject",
            label: "Subject",
            collections: ["subject"],
            required: true,
            description:
              "Pick the book's subject, e.g. 'Hermeneutics'. To add or remove options, open the 'Book Subjects' collection in the left sidebar and create or delete a subject.",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
            description:
              "Front cover shown on book cards and the detail page — upload a portrait (3:4) image or paste an image URL, e.g. '/uploads/abrahamic-promise-cover.jpg'.",
          },
          {
            type: "string",
            name: "featured",
            label: "Featured",
            options: ["yes", "no"],
            description:
              "Set to 'yes' to show this book in 'Featured Books & Magazines' on the home page.",
          },
          {
            type: "string",
            name: "featuredPosition",
            label: "Home Page Position",
            options: ["1", "2"],
            description:
              "Only needed when Featured is 'yes', e.g. '1'. 1 = left card, 2 = right card. Position 1 also becomes the spotlight at the top of the Books page. If two featured books claim one position, the first alphabetically wins.",
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Book Monograph PDF",
            description: "Upload or select a PDF monograph file for digital download, e.g. '/uploads/hermeneutics.pdf'.",
            ui: {
              validate: validatePdfField,
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Book Overview / Abstract",
            description:
              "The full overview text — headings, paragraphs and quotes are rendered on the book detail page, e.g. a chapter-by-chapter synopsis.",
            isBody: true,
          },
        ],
      },
      {
        name: "format",
        label: "Book Formats",
        path: "content/book-formats",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Format Name",
            required: true,
            description:
              "Shown as the badge on book cards, e.g. 'Monograph'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "subject",
        label: "Book Subjects",
        path: "content/book-subjects",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Subject Name",
            required: true,
            description:
              "Shown on book cards and in the subject filter, e.g. 'Hermeneutics'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
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
        ui: {
          filename: {
            slugify: (values: any) => {
              const base = String(values?.title || "lesson").toLowerCase();
              const slug = base
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80);
              return slug || "lesson";
            },
          },
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
            type: "reference",
            name: "division",
            label: "Biblical Division",
            collections: ["division"],
            required: true,
            description:
              "Pick the lesson's division. To add or remove options, open the 'Biblical Divisions' collection in the left sidebar and create or delete a division.",
          },
          {
            type: "string",
            name: "difficulty",
            label: "Difficulty Level",
            options: ["beginner", "intermediate", "advanced"],
            required: true,
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            description: "Shown on the home-page featured card, e.g. '45 mins read' (optional).",
          },
          {
            type: "datetime",
            name: "publishedDate",
            label: "Published Date",
            description:
              "Used only for tie-breaking: when two featured lessons claim the same home-page position, the one with the newer Published Date wins.",
            ui: {
              dateFormat: "MMM DD, YYYY",
            },
          },
          {
            type: "string",
            name: "featured",
            label: "Featured on Home Page",
            options: ["no", "yes"],
            description:
              "Set to 'Yes' to show this lesson in the 'Featured Bible Lessons' section on the home page.",
          },
          {
            type: "string",
            name: "featuredPosition",
            label: "Home Page Position",
            options: ["1", "2", "3"],
            description:
              "Only needed when 'Featured on Home Page' is Yes. 1 = left card, 2 = middle card, 3 = right card. The position-1 lesson also becomes the spotlight at the top of the Lessons page. If another featured lesson already uses this position, the one with the newer Published Date takes the slot — afterwards set the old lesson's 'Featured on Home Page' back to 'No' to keep things tidy.",
          },
          {
            type: "image",
            name: "image",
            label: "Lesson Cover Image",
            description: "Optional cover image for this expository lesson",
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Lesson PDF",
            description: "Upload or select the lesson PDF. The \"Read Lesson\" button opens it in a new browser tab.",
            ui: {
              validate: validatePdfField,
            },
          },
        ],
      },
      {
        name: "genre",
        label: "Biblical Genres",
        path: "content/bible-genres",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Genre Name",
            required: true,
            description:
              "Shown on scripture reference cards and filters, e.g. 'Prophecy'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "division",
        label: "Biblical Divisions",
        path: "content/bible-divisions",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Division Name",
            required: true,
            description:
              "Shown as the category tag on lesson cards, e.g. 'Pentateuch'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
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
        ui: {
          filename: {
            slugify: (values: any) => {
              const base = String(values?.title || "magazine").toLowerCase();
              const slug = base
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80);
              return slug || "magazine";
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            description: 'The issue theme shown on the card and detail page, e.g. "Ecclesiology".',
          },
          {
            type: "string",
            name: "issue",
            label: "Issue",
            required: true,
            description: 'The display label for this issue, e.g. "Summer 2024".',
          },
          {
            type: "string",
            name: "season",
            label: "Season / Issue",
            options: ["Spring", "Summer", "Fall", "Winter"],
            description: "Pick the season — powers the 'All Issues' filter on the Magazines page.",
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            description:
              "Type the publication year, e.g. '2024'. Whatever you enter automatically appears in the website's Year filter.",
          },
          {
            type: "reference",
            name: "topic",
            label: "Topic",
            collections: ["topic"],
            description:
              "Pick the magazine topic. To add or remove options, open the 'Magazine Topics' collection in the left sidebar and create or delete a topic.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            description: 'Short summary shown on the magazine card, e.g. "The nature and mission of the church".',
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            description: "Cover shown on cards and the detail page — portrait images (e.g. 3:4) work best.",
          },
          {
            type: "string",
            name: "publishDate",
            label: "Publish Date",
            description: 'e.g. "June 2024". When two featured issues claim the same home-page position, the one with the newer Publish Date wins.',
          },
          {
            type: "number",
            name: "articlesCount",
            label: "Articles Count",
            description: "Number of articles in this issue, e.g. 8 — shown in the issue stats.",
          },
          {
            type: "number",
            name: "contributorsCount",
            label: "Contributors Count",
            description: "Number of contributors, e.g. 5 — shown in the issue stats.",
          },
          {
            type: "number",
            name: "pagesCount",
            label: "Pages Count",
            description: "Total page count, e.g. 64 — shown in the issue stats.",
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / Tag",
            description: 'Optional tag on the card, e.g. "Latest Issue". Issues marked "Previous Issue" are hidden from the archive grid — use it for the featured hero issue.',
          },
          {
            type: "string",
            name: "featured",
            label: "Featured on Home Page",
            options: ["no", "yes"],
            description:
              "Set to 'Yes' to show this issue in 'Featured Books & Magazines' on the home page.",
          },
          {
            type: "string",
            name: "featuredPosition",
            label: "Home Page Position",
            options: ["1", "2"],
            description:
              "Only needed when Featured is 'Yes'. 1 = left card, 2 = right card. Position 1 also becomes the hero at the top of the Magazines page. If two featured issues claim one position, the one with the newer Publish Date wins.",
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
            description: "The editorial overview rendered on the issue detail page — headings, paragraphs, quotes and lists all display.",
          },
        ],
      },

      {
        name: "topic",
        label: "Magazine Topics",
        path: "content/magazine-topics",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Topic Name",
            required: true,
            description:
              "Shown on magazine cards and in the Topic filter, e.g. 'Systematic Theology'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
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
        ui: {
          filename: {
            slugify: (values: any) => {
              const base = String(values?.title || "reference").toLowerCase();
              const slug = base
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80);
              return slug || "reference";
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            description: 'Short descriptive title, e.g. "The Shema and the Greatest Commandment".',
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true,
            description: 'Book and verse range, e.g. "Deuteronomy 6:4-9" or "Matthew 1:22-23".',
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            description: 'Theological grouping shown on the card, e.g. "Torah Law", "Prophecy Fulfillment", or "Messianic Prophecy".',
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            description: 'One or two sentences summarizing the reference, e.g. "Cross-references the Psalm\'s imagery of suffering with the crucifixion accounts in the Gospels."',
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Reference Image",
            description: "Optional cover image shown on the reference detail page.",
          },
          {
            type: "string",
            name: "author",
            label: "Author / Scholar",
            required: true,
            description: 'Who wrote the commentary, e.g. "Dr. Charles Vance".',
          },
          {
            type: "string",
            name: "testament",
            label: "Testament",
            options: ["Old Testament", "New Testament"],
            required: true,
            description: "Which testament the scripture comes from.",
          },
          {
            type: "reference",
            name: "genre",
            label: "Biblical Genre",
            collections: ["genre"],
            required: true,
            description:
              "Pick the genre. To add or remove options, open the 'Biblical Genres' collection in the left sidebar and create or delete a genre.",
          },
          {
            type: "datetime",
            name: "addedDate",
            label: "Date Added",
            description:
              "The two references with the newest Date Added are shown in 'Latest Bible References' on the home page.",
            ui: {
              dateFormat: "MMM DD, YYYY",
            },
          },
          {
            type: "string",
            name: "featured",
            label: "Featured Scholarly Reference",
            options: ["no", "yes"],
            description:
              "Set to 'Yes' to showcase this reference in the highlighted spotlight at the top of the Scripture References page. Only one should be 'Yes' — if several are marked, the one with the newest Date Added is used.",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: 'Small labels shown as chips on the card, e.g. "Prophecy", "Atonement", "Gospel Parallel". Add as many as you like.',
          },
          {
            type: "string",
            name: "crossReferences",
            label: "Cross References",
            description:
              'Optional list shown in the home-page featured spotlight, e.g. "Romans 4, Galatians 3, Hebrews 11".',
          },
          {
            type: "rich-text",
            name: "body",
            label: "Commentary Body",
            isBody: true,
            description: "The full commentary text — headings, paragraphs, quotes and lists are all rendered on the reference detail page.",
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
        ui: {
          filename: {
            slugify: (values: any) => {
              const base = String(values?.title || "video").toLowerCase();
              const slug = base
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80);
              return slug || "video";
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "reference",
            name: "series",
            label: "Series Tag",
            collections: ["series"],
            required: true,
            description:
              "Pick the video's series. To add or remove options, open the 'Video Series' collection in the left sidebar and create or delete a series.",
          },
          {
            type: "reference",
            name: "speaker",
            label: "Speaker",
            collections: ["speaker"],
            required: true,
            description:
              "Pick the speaker. To add or remove names, open the 'Speakers' collection in the left sidebar.",
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
            type: "datetime",
            name: "recordedDate",
            label: "Recorded Date",
            description:
              "Pick the date this lecture was recorded. When two featured videos claim the same home-page position, the one with the newer Recorded Date wins.",
            ui: {
              dateFormat: "MMM DD, YYYY",
            },
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
            type: "string",
            name: "featured",
            label: "Featured on Home Page",
            options: ["no", "yes"],
            description:
              "Set to 'Yes' to show this video in the 'Featured Bible Videos' section on the home page.",
          },
          {
            type: "string",
            name: "featuredPosition",
            label: "Home Page Position",
            options: ["1", "2", "3"],
            description:
              "Only needed when 'Featured on Home Page' is Yes. 1 = left card, 2 = middle card, 3 = right card. If another featured video already uses this position, the one with the newer Recorded Date takes the slot — afterwards set the old video's 'Featured on Home Page' back to 'No' to keep things tidy.",
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
        name: "series",
        label: "Video Series",
        path: "content/video-series",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Series Name",
            required: true,
            description:
              "Shown as the small tag on video cards, e.g. 'Hermeneutics Series'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "speaker",
        label: "Speakers",
        path: "content/speakers",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Speaker Name",
            required: true,
            description: "e.g. 'Dr. Charles Vance'",
          },
          {
            type: "string",
            name: "role",
            label: "Role / Title",
            description: "e.g. 'Professor of Systematic Theology' (optional)",
          },
          {
            type: "string",
            name: "bio",
            label: "Short Bio",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "avatar",
            label: "Avatar Image",
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
        ui: {
          filename: {
            slugify: (values: any) => {
              const base = String(values?.title || "image").toLowerCase();
              const slug = base
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80);
              return slug || "image";
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "reference",
            name: "category",
            label: "Category / Classification",
            collections: ["imageCategory"],
            required: true,
            description:
              "Pick the image's category. To add or remove options, open the 'Image Categories' collection in the left sidebar and create or delete a category.",
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true,
            description: 'The related verse shown in the spotlight, e.g. "Romans 1:16".',
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
            type: "datetime",
            name: "dateAdded",
            label: "Date Added",
            description:
              "The images with the newest Date Added fill the 'Bible Image Gallery Preview' on the home page.",
            ui: {
              dateFormat: "MMM DD, YYYY",
            },
          },
          {
            type: "string",
            name: "featured",
            label: "Featured Spotlight",
            options: ["no", "yes"],
            description:
              "Set to 'Yes' to showcase this image in the spotlight at the top of the Bible Images page. Only one should be 'Yes' — if several are marked, the newest Date Added wins.",
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
        name: "imageCategory",
        label: "Image Categories",
        path: "content/image-categories",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Category Name",
            required: true,
            description:
              "Shown on image cards and in the gallery filter, e.g. 'Manuscript'.",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
                  max: 31,
                  defaultItem: () => ({ day: nextFreeScriptureDay(), verse: "", reference: "" }),
                  itemProps: (item: any) => ({
                    label: item?.day
                      ? `Day ${item.day}${item?.reference ? ` — ${item.reference}` : ""}`
                      : "Day (not set)",
                  }),
                } as any,
                fields: [
                  {
                    type: "number",
                    name: "day",
                    label: "Day of Month (1 – 31)",
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
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
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
            description:
              "The lessons in this section are chosen per lesson: open a lesson in 'Bible Lessons', set 'Featured on Home Page' to Yes, and pick a position (1-3). This block only controls the section heading.",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
            ],
          },
          {
            type: "object",
            name: "latestReferences",
            label: "Latest Bible References Section",
            description:
              "This section automatically shows the 2 scripture references with the newest 'Date Added'. Set it on each document in 'Scripture References'. This block only controls the section heading.",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
            ],
          },
          {
            type: "object",
            name: "featuredVideos",
            label: "Featured Bible Videos Section",
            description:
              "The videos in this section are chosen per video: open a video in 'Video Lectures', set 'Featured on Home Page' to Yes, and pick a position (1-3). This block only controls the section heading.",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
            ],
          },
          {
                        type: "object",
            name: "galleryPreview",
            label: "Gallery Preview Section",
            description:
              "This section automatically shows the newest images by 'Date Added'. Set it on each document in 'Sacred Images'. This block only controls the section heading.",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
              },
            ],
          },
          {
            type: "object",
            name: "featuredPublications",
            label: "Featured Publications Section",
            description:
              "Books and magazines are chosen per document: set Featured to Yes and pick a position (1-2). This block only controls the section heading.",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
                type: "string",
                name: "address",
                label: "Google Maps Address",
                required: true,
                description:
                  "Type the address or place name to show on the map, e.g. \"123 Church St, Springfield\" or \"St. Peter's Basilica\". A live Google Map appears automatically — no API key needed.",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "addressText",
                label: "Map Caption Text",
                description:
                  "Optional caption shown below the map, e.g. the formatted address.",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            description: "The next live seminar. This is the single source of truth: it feeds this page, the Zoom banner at the bottom of the home page, and the announcement bar link across the whole site. Update it here once and all three stay in sync.",
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
                description: "Include the time zone, e.g. '7:00 PM IST' or '7:00 PM - 8:30 PM EST'. Times without a zone are read as India time (IST). Used to decide which seminar is next and when it shows as Live.",
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
                label: "Zoom Meeting Link (shared site-wide)",
                description: "Paste the full Zoom link here (it must start with https:// and be a zoom.us link). It powers the Join Meeting button on this page, the Join button on the home page Zoom banner, AND the clickable Zoom text on the announcement bar at the top of every page.",
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
                description: "Only sessions marked 'Upcoming' can appear in the home page Zoom banner and the announcement bar link. The soonest upcoming date wins.",
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
                description: "For recordings use a page path like /videos. For an upcoming session you can paste its Zoom link here; the home page banner and announcement bar use the soonest upcoming date.",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            description:
              "The spotlight shows the book set to Featured position 1 on its document. This block only controls the badge and button text.",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
              },
              {
                type: "string",
                name: "abstractButtonText",
                label: "Abstract Button Text",
              },
            ],
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            label: "Featured Lesson Spotlight",
            description:
              "The spotlight shows the lesson set to Featured position 1 on its document. This block only controls the badge and button text.",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            description:
              "The hero shows the magazine set to Featured position 1 on its document. This block only controls the badge, tag and button text.",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
              },
              {
                type: "string",
                name: "readButtonText",
                label: "Read Button Text",
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            description:
              "The spotlight shows the scripture reference with the newest 'Date Added'. This block only controls the badge and button text.",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            label: "Announcement Bar Message",
            description: "Main message on the announcement bar at the top of this page. Each page keeps its own copy of the bar text.",
            required: true,
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Bar Zoom Text (clickable)",
            description: "This text becomes the clickable Zoom link on the bar. The link itself is NOT set on this page: go to Seminars & Zoom > Featured Meeting Card > Zoom Meeting Link. Changing it there updates every page.",
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
            description:
              "The spotlight shows the image marked 'Featured Spotlight = Yes' on its document. This block only controls labels and button text.",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true,
              },
              {
                type: "string",
                name: "scriptureLabel",
                label: "Scripture Label",
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
              },
              {
                type: "string",
                name: "citationButtonText",
                label: "Citation Button Text",
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
