// Content for the /missing-heroicons page and the Heroicons request notes on icon pages

// Every Sidekickicon belongs to exactly one group
export const sidekickiconGroups: { title: string; icons: string[] }[] = [
  {
    title: "Text editing",
    icons: [
      "bars-3-bottom-center",
      "blockquote",
      "checklist",
      "checklist-boxes",
      "h4",
      "h5",
      "h6",
      "heading",
      "indent",
      "italic-slash",
      "lettered-list",
      "outdent",
      "paint-brush-slash",
      "pilcrow",
      "quotation-mark",
      "table-cells-merge",
      "table-cells-split",
    ],
  },
  {
    title: "Calls and media",
    icons: [
      "arrows-crossing",
      "camera-rotate",
      "headphones",
      "headphones-slash",
      "microphone-slash",
      "photo-plus",
      "video-camera-arrow-down-left",
      "video-camera-arrow-up-right",
      "video-camera-x-mark",
    ],
  },
  {
    title: "Arrows",
    icons: [
      "archive-box-arrow-up",
      "arrow-bottom-left-on-square",
      "arrow-path-clock",
      "arrow-path-single-clockwise",
      "arrow-path-single-counterclockwise",
      "arrow-uturn-down-right",
      "arrow-uturn-up-left",
      "chevron-down-up",
      "chevron-left-right",
      "chevron-right-left",
    ],
  },
  {
    title: "Loading and status",
    icons: ["arc-third", "check-double", "circle-dashed", "radial-rays"],
  },
  {
    title: "Layout",
    icons: [
      "dots-2x2",
      "dots-2x3",
      "dots-3x2",
      "dots-3x3",
      "sidebar-left",
      "sidebar-right",
      "view-split",
    ],
  },
  {
    title: "Security and privacy",
    icons: [
      "cookie",
      "lock-semi-open",
      "mask",
      "password",
      "password-pencil",
      "shield",
    ],
  },
  {
    title: "Shapes",
    icons: ["badge", "circle", "square", "triangle"],
  },
  {
    title: "Everyday objects",
    icons: [
      "compass",
      "computer-laptop",
      "crown",
      "dice",
      "face-meh",
      "face-smile-plus",
      "floppy-disk",
      "gamepad",
      "keyboard",
      "pin",
      "pin-slash",
      "robot",
    ],
  },
];

// How a Sidekickicon relates to the Heroicons it complements
export const heroiconsPairings: Record<string, string> = {
  "bars-3-bottom-center": "Heroicons has left and right aligned bars",
  h4: "Heroicons has H1 to H3",
  h5: "Heroicons has H1 to H3",
  h6: "Heroicons has H1 to H3",
  "italic-slash": "Goes with Heroicons' italic",
  "paint-brush-slash": "Goes with Heroicons' paint-brush",
  "table-cells-merge": "Goes with Heroicons' table-cells",
  "table-cells-split": "Goes with Heroicons' table-cells",
  "microphone-slash": "Goes with Heroicons' microphone",
  "photo-plus": "Goes with Heroicons' photo",
  "video-camera-arrow-down-left": "Matches Heroicons' phone-arrow-down-left",
  "video-camera-arrow-up-right": "Matches Heroicons' phone-arrow-up-right",
  "video-camera-x-mark": "Matches Heroicons' phone-x-mark",
  "arrow-path-single-clockwise": "A single-arrow arrow-path",
  "arrow-path-single-counterclockwise": "A single-arrow arrow-path",
  "check-double": "Goes with Heroicons' check",
  "lock-semi-open": "Between Heroicons' lock-closed and lock-open",
  shield: "Heroicons only has shields with a symbol inside",
  "computer-laptop": "Goes with Heroicons' computer-desktop",
  "face-meh": "Between Heroicons' face-smile and face-frown",
};

// Votes on Heroicons' own GitHub discussions asking for the icon, from the Sidekickicons
// roadmap (counted in October 2026)
export const heroiconsRequests: Record<
  string,
  { votes: number; discussions: number[] }
> = {
  keyboard: { votes: 31, discussions: [418, 525] },
};

// The top of the Sidekickicons roadmap
export const comingNext: { name: string; votes: number }[] = [
  { name: "target", votes: 19 },
  { name: "coffee", votes: 19 },
  { name: "star-half", votes: 18 },
  { name: "snowflake", votes: 18 },
  { name: "eraser", votes: 17 },
  { name: "check-square", votes: 14 },
];

export const heroiconsDiscussionUrl = (number: number) =>
  `https://github.com/tailwindlabs/heroicons/discussions/${number}`;

export const roadmapUrl = "https://github.com/ndri/sidekickicons/blob/main/ROADMAP.md";

export const suggestIconUrl =
  "https://github.com/ndri/sidekickicons/discussions/new?category=icon-suggestions";
