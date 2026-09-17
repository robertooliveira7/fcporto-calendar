import { MatchCard } from "@/components/match/MatchCard";
import { LeagueTable } from "@/components/standings/LeagueTable";
import { FIXTURES } from "@/data/2026-27/fixtures";
import { LIGA_STANDINGS } from "@/data/2026-27/liga-standings";

export default function LigaPage() {
  const ligaFixtures = FIXTURES.filter(
    (match) => match.competition === "liga"
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Liga
      </h1>

      <p className="mt-2 text-slate-600">
        Classificação e percurso do FC Porto na Liga Portugal 2026/27.
      </p>

      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Classificação
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Liga Portugal 2026/27
          </p>
        </div>

        <LeagueTable standings={LIGA_STANDINGS} />
      </section>

      <section className="mt-14">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Jogos
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Todos os jogos do FC Porto na Liga.
          </p>
        </div>

        <div className="grid gap-4">
          {ligaFixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}