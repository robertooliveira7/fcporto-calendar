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

  export type Goal = {
  team: "fc-porto" | "opponent";
  scorer: string;
  minute: string;
  penalty: boolean;
};
export type Match = {
  id: string;
  opponent: string;
  competition: Competition;
  round: string;
  date: string | null;
  stadium: string;
  venue: "home" | "away" | "neutral";
  status: MatchStatus;
  score: {
  fcPorto: number;
  opponent: number;
} | null;
goals: Goal[];
fcPortoCrest?: string;
opponentCrest?: string;
};