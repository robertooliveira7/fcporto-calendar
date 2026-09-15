export type Competition =
  | "liga"
  | "taca-portugal"
  | "taca-liga"
  | "champions-league";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "postponed"
  | "cancelled";

export type Match = {
  id: string;
  opponent: string;
  competition: Competition;
  date: string;
  stadium: string;
  venue: "home" | "away";
  status: MatchStatus;
  score: {
    fcPorto: number;
    opponent: number;
  } | null;
};