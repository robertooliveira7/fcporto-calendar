import { FIXTURES } from "@/data/2026-27/fixtures";
import type { Match } from "@/types/match";

export async function getTacaPortugalFixtures(): Promise<Match[]> {
  return FIXTURES.filter(
    (match) => match.competition === "taca-portugal"
  );
}