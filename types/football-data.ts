export type FootballDataTeam = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

export type FootballDataStandingRow = {
  position: number;
  team: FootballDataTeam;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type FootballDataStandingsResponse = {
  standings: {
    stage: string;
    type: "TOTAL" | "HOME" | "AWAY";
    group: string | null;
    table: FootballDataStandingRow[];
  }[];
};
export type FootballDataMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  homeTeam: FootballDataTeam;
  awayTeam: FootballDataTeam;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
};

export type FootballDataMatchesResponse = {
  matches: FootballDataMatch[];
};