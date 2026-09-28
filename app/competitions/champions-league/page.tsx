import { FixturesList } from "@/components/match/FixturesList";
import { ChampionsStandingsPreview } from "@/components/standings/ChampionsStandingsPreview";
import { getChampionsStandings } from "@/services/football-data";
import { getChampionsFixtures } from "@/services/matches";

export default async function ChampionsLeaguePage() {
  const [standings, championsFixtures] = await Promise.all([
    getChampionsStandings(),
    getChampionsFixtures(),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Liga dos Campeões
      </h1>

      <p className="mt-2 text-slate-600">
        Jogos e classificação do FC Porto na Liga dos Campeões 2026/27.
      </p>

      <div className="mt-10">
        <ChampionsStandingsPreview standings={standings} />
      </div>

      <div className="mt-12">
        <FixturesList
          matches={championsFixtures}
          showCompetitionFilter={false}
        />
      </div>
    </main>
  );
}