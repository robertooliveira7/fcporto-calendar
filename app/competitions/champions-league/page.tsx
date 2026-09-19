import { MatchCard } from "@/components/match/MatchCard";
import { LeagueTable } from "@/components/standings/LeagueTable";
import { FIXTURES } from "@/data/2026-27/fixtures";
import { CHAMPIONS_STANDINGS } from "@/data/2026-27/champions-standings";

export default function ChampionsLeaguePage() {
  const championsFixtures = FIXTURES.filter(
    (match) => match.competition === "champions-league"
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Liga dos Campeões
      </h1>

      <p className="mt-2 text-slate-600">
        Classificação e percurso do FC Porto na Liga dos Campeões 2026/27.
      </p>

      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Classificação
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Fase de liga · Liga dos Campeões 2026/27
          </p>
        </div>

        <LeagueTable standings={CHAMPIONS_STANDINGS} />
      </section>

      <section className="mt-14">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Jogos
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Todos os jogos do FC Porto na Liga dos Campeões.
          </p>
        </div>

        <div className="grid gap-4">
          {championsFixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}