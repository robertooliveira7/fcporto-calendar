
import { MatchCard } from "@/components/match/MatchCard";
import { getTacaLigaFixtures } from "@/services/matches";

export default async function TacaLigaPage() {
  const matches = await getTacaLigaFixtures();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Taça da Liga
      </h1>

      <p className="mt-2 text-slate-600">
        Percurso do FC Porto na Taça da Liga 2026/27.
      </p>

      <div className="mt-8 grid gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </main>
  );
}
