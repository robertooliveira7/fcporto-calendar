import { MatchCard } from "@/components/match/MatchCard";
import { FIXTURES } from "@/data/2026-27/fixtures";

export default function FixturesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Jogos
      </h1>

      <p className="mt-2 text-slate-600">
        Consulta todos os jogos do FC Porto na época 2026/27.
      </p>

      <div className="mt-8 grid gap-4">
        {FIXTURES.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </main>
  );
}