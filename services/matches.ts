import { FIXTURES } from "@/data/2026-27/fixtures";
import {
  getChampionsMatches,
  getLigaMatches,
} from "@/services/football-data";
import type { Competition, Match } from "@/types/match";

function mergeAutomaticMatchesWithManualData(
  automaticMatches: Match[],
  competition: Competition
): Match[] {
  const manualMatches = FIXTURES.filter(
    (match) => match.competition === competition
  );

  return automaticMatches.map((automaticMatch) => {
    const manualMatch = manualMatches.find(
      (manualMatch) => manualMatch.round === automaticMatch.round
    );

    if (!manualMatch) {
      return automaticMatch;
    }

    return {
      ...automaticMatch,

      // Mantemos IDs estáveis que já existiam na aplicação.
      id: manualMatch.id,

      // Mantemos o nome editorial que já tínhamos definido.
      opponent: manualMatch.opponent,

      // Estes dados continuam a ser manuais.
      stadium: manualMatch.stadium || automaticMatch.stadium,
      goals: manualMatch.goals,
    };
  });
}

export async function getLigaFixtures(): Promise<Match[]> {
  const automaticMatches = await getLigaMatches();

  return mergeAutomaticMatchesWithManualData(
    automaticMatches,
    "liga"
  );
}

export async function getChampionsFixtures(): Promise<Match[]> {
  const automaticMatches = await getChampionsMatches();

  return mergeAutomaticMatchesWithManualData(
    automaticMatches,
    "champions-league"
  );
}

export async function getAllFixtures(): Promise<Match[]> {
  const [ligaFixtures, championsFixtures] = await Promise.all([
    getLigaFixtures(),
    getChampionsFixtures(),
  ]);

  const cupFixtures = FIXTURES.filter(
    (match) =>
      match.competition === "taca-portugal" ||
      match.competition === "taca-liga"
  );

  return [
    ...ligaFixtures,
    ...championsFixtures,
    ...cupFixtures,
  ].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}