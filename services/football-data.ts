import type {
  FootballDataMatchesResponse,
  FootballDataStandingsResponse,
} from "@/types/football-data";
import type { Match, MatchStatus } from "@/types/match";
import type { Standing } from "@/types/standings";

const API_BASE_URL = "https://api.football-data.org/v4";
const FC_PORTO_ID = 503;
const FC_ALVERCA_ID = 7822;

function getApiToken() {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;

  if (!token) {
    throw new Error("FOOTBALL_DATA_API_TOKEN não está definido.");
  }

  return token;
}

function mapFootballDataStatus(status: string): MatchStatus {
  switch (status) {
    case "FINISHED":
      return "finished";

    case "IN_PLAY":
    case "PAUSED":
      return "live";

    case "POSTPONED":
      return "postponed";

    case "CANCELLED":
      return "cancelled";

    default:
      return "scheduled";
  }
}

export async function getLigaStandings(): Promise<Standing[]> {
  const response = await fetch(
    `${API_BASE_URL}/competitions/PPL/standings?season=2026`,
    {
      headers: {
        "X-Auth-Token": getApiToken(),
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao obter classificação da Liga: ${response.status}`
    );
  }

  const data =
    (await response.json()) as FootballDataStandingsResponse;

  const totalStandings = data.standings.find(
    (standing) => standing.type === "TOTAL"
  );

  if (!totalStandings) {
    throw new Error("Classificação geral da Liga não encontrada.");
  }

  return totalStandings.table.map((row) => ({
    position: row.position,
    team: row.team.shortName,
    played: row.playedGames,
    wins: row.won,
    draws: row.draw,
    losses: row.lost,
    goalsFor: row.goalsFor,
    goalsAgainst: row.goalsAgainst,
    goalDifference: row.goalDifference,
    points: row.points,
  }));
}

export async function getLigaMatches(): Promise<Match[]> {
  const response = await fetch(
    `${API_BASE_URL}/teams/${FC_PORTO_ID}/matches?season=2026&competitions=2017`,
    {
      headers: {
        "X-Auth-Token": getApiToken(),
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao obter jogos da Liga: ${response.status}`
    );
  }

  const data =
    (await response.json()) as FootballDataMatchesResponse;

  return data.matches.map((match) => {
    const fcPortoIsHome = match.homeTeam.id === FC_PORTO_ID;

    const opponent = fcPortoIsHome
      ? match.awayTeam
      : match.homeTeam;

    const homeScore = match.score.fullTime.home;
    const awayScore = match.score.fullTime.away;

    const hasScore =
      homeScore !== null && awayScore !== null;

    const date =
      match.status === "SCHEDULED" &&
      match.utcDate.endsWith("T00:00:00Z")
        ? null
        : match.utcDate;

    return {
      id: `liga-api-${match.id}`,
      opponent: opponent.shortName,

      fcPortoCrest: fcPortoIsHome
        ? match.homeTeam.crest
        : match.awayTeam.crest,

      opponentCrest:
        opponent.id === FC_ALVERCA_ID
          ? "/logos/alverca.png"
          : opponent.crest,

      competition: "liga",

      round: match.matchday
        ? `Jornada ${match.matchday}`
        : "Liga",

      date,

      stadium: fcPortoIsHome
        ? "Estádio do Dragão"
        : "",

      venue: fcPortoIsHome
        ? "home"
        : "away",

      status: mapFootballDataStatus(match.status),

      score: hasScore
        ? {
            fcPorto: fcPortoIsHome
              ? homeScore
              : awayScore,

            opponent: fcPortoIsHome
              ? awayScore
              : homeScore,
          }
        : null,

      goals: [],
    };
  });
}

export async function getChampionsStandings(): Promise<Standing[]> {
  const response = await fetch(
    `${API_BASE_URL}/competitions/CL/standings?season=2026`,
    {
      headers: {
        "X-Auth-Token": getApiToken(),
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao obter classificação da Champions: ${response.status}`
    );
  }

  const data =
    (await response.json()) as FootballDataStandingsResponse;

  const totalStandings = data.standings.find(
    (standing) => standing.type === "TOTAL"
  );

  if (!totalStandings) {
    throw new Error(
      "Classificação geral da Champions não encontrada."
    );
  }

  return totalStandings.table.map((row) => ({
    position: row.position,
    team: row.team.shortName,
    played: row.playedGames,
    wins: row.won,
    draws: row.draw,
    losses: row.lost,
    goalsFor: row.goalsFor,
    goalsAgainst: row.goalsAgainst,
    goalDifference: row.goalDifference,
    points: row.points,
  }));
}

export async function getChampionsMatches(): Promise<Match[]> {
  const response = await fetch(
    `${API_BASE_URL}/teams/${FC_PORTO_ID}/matches?season=2026&competitions=2001`,
    {
      headers: {
        "X-Auth-Token": getApiToken(),
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao obter jogos da Champions: ${response.status}`
    );
  }

  const data =
    (await response.json()) as FootballDataMatchesResponse;

  return data.matches.map((match) => {
    const fcPortoIsHome = match.homeTeam.id === FC_PORTO_ID;

    const opponent = fcPortoIsHome
      ? match.awayTeam
      : match.homeTeam;

    const homeScore = match.score.fullTime.home;
    const awayScore = match.score.fullTime.away;

    const hasScore =
      homeScore !== null && awayScore !== null;

    return {
      id: `champions-api-${match.id}`,
      opponent: opponent.shortName,

      fcPortoCrest: fcPortoIsHome
        ? match.homeTeam.crest
        : match.awayTeam.crest,

      opponentCrest: opponent.crest,

      competition: "champions-league",

      round: match.matchday
        ? `Jornada ${match.matchday}`
        : "Liga dos Campeões",

      date: match.utcDate,

      stadium: fcPortoIsHome
        ? "Estádio do Dragão"
        : "",

      venue: fcPortoIsHome
        ? "home"
        : "away",

      status: mapFootballDataStatus(match.status),

      score: hasScore
        ? {
            fcPorto: fcPortoIsHome
              ? homeScore
              : awayScore,

            opponent: fcPortoIsHome
              ? awayScore
              : homeScore,
          }
        : null,

      goals: [],
    };
  });
}