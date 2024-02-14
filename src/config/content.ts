export const USER_ANIME_SCORE_OPTIONS = [
  {
    label: "Not rated",
    value: 0,
  },
  {
    label: "(10) Masterpiece",
    value: 10,
  },
  {
    label: "(9)",
    value: 9,
  },
  {
    label: "(8)",
    value: 8,
  },
  {
    label: "(7)",
    value: 7,
  },
  {
    label: "(6)",
    value: 6,
  },
  {
    label: "(5)",
    value: 5,
  },
  {
    label: "(4)",
    value: 4,
  },
  {
    label: "(3)",
    value: 3,
  },
  {
    label: "(2)",
    value: 2,
  },
  {
    label: "(1)",
    value: 1,
  },
];

export const BASE_URL = "https://api.myanimelist.net/v2";

export const ANIME_STATUS_OPTIONS = [
  { label: "Watching", value: "watching" },
  { label: "Completed", value: "completed" },
  { label: "On-Hold", value: "on_hold" },
  { label: "Dropped", value: "dropped" },
  { label: "Plan to Watch", value: "plan_to_watch" },
] as const;

export type AnimeStatusOption = (typeof ANIME_STATUS_OPTIONS)[number]["value"];

export const ANIME_SORT_OPTIONS = [
  { label: "Last Updated", value: "list_updated_at" },
  { label: "Score", value: "list_score" },
  { label: "Title", value: "anime_title" },
  { label: "Anime Start Date", value: "anime_start_date" },
] as const;

export type AnimeSortOption = (typeof ANIME_SORT_OPTIONS)[number]["value"];
