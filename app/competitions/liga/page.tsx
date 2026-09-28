import { FixturesList } from "@/components/match/FixturesList";
import { LeagueStandingsPreview } from "@/components/standings/LeagueStandingsPreview";
import { getLigaStandings } from "@/services/football-data";
import { getLigaFixtures } from "@/services/matches";

export default async function LigaPage() {
  const [standings, ligaFixtures] = await Promise.all([
    getLigaStandings(),
    getLigaFixtures(),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Liga
      </h1>

      <p className="mt-2 text-slate-600">
        Jogos e classificação do FC Porto na Liga 2026/27.
      </p>

      <div className="mt-10">
        <LeagueStandingsPreview
          standings={standings}
          limit={standings.length}
        />
      </div>

      <div className="mt-12">
        <FixturesList
          matches={ligaFixtures}
          showCompetitionFilter={false}
        />
      </div>
    </main>
  );
}