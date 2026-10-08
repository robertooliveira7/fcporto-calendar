import { getTacaPortugalFixtures } from "@/services/fpf";
import { FIXTURES } from "@/data/2026-27/fixtures";
import {
  getChampionsMatches,
  getLigaMatches,
} from "@/services/football-data";
import { getTacaLigaMatch } from "@/services/liga-portugal";
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
      (manualMatch) =>
        manualMatch.round === automaticMatch.round
    );

    if (!manualMatch) {
      return automaticMatch;
    }

    return {
      ...automaticMatch,

      // Mantemos IDs estáveis.
      id: manualMatch.id,

      // Mantemos o nome editorial quando já existe.
      opponent: manualMatch.opponent,

      // Dados que continuam manuais.
      stadium:
        manualMatch.stadium || automaticMatch.stadium,
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

export async function getTacaLigaFixtures(): Promise<Match[]> {
  const automaticMatch = await getTacaLigaMatch();

  const manualMatch = FIXTURES.find(
    (match) => match.competition === "taca-liga"
  );

  if (!manualMatch) {
    return [automaticMatch];
  }

  return [
    {
      ...automaticMatch,
      id: manualMatch.id,
      opponent: manualMatch.opponent,
      stadium:
        manualMatch.stadium || automaticMatch.stadium,
      goals: manualMatch.goals,
    },
  ];
}

export async function getAllFixtures(): Promise<Match[]> {
  const [
    ligaFixtures,
    championsFixtures,
    tacaLigaFixtures,
  ] = await Promise.all([
    getLigaFixtures(),
    getTacaPortugalFixtures(),
    getChampionsFixtures(),
    getTacaLigaFixtures(),
  ]);

const tacaPortugalFixtures =
  await getTacaPortugalFixtures();

  return [
    ...ligaFixtures,
    ...championsFixtures,
    ...tacaLigaFixtures,
    ...tacaPortugalFixtures,
  ].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;

    return (
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
    );
  });
}