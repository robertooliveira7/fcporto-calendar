export type CompetitionStage = {
  round: string;
  opponent: string | null;
  date: string | null;
  status: "upcoming" | "scheduled" | "finished";
};