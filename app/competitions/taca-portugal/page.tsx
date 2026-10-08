import { MatchCard } from "@/components/match/MatchCard";
import { getTacaPortugalFixtures } from "@/services/fpf";

export default async function TacaPortugalPage() {
  const fixtures = await getTacaPortugalFixtures();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Taça de Portugal
      </h1>

      <p className="mt-2 text-slate-600">
        Percurso do FC Porto na Taça de Portugal 2026/27.
      </p>

      <div className="mt-8 grid gap-4">
        {fixtures.length > 0 ? (
          fixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">
              Ainda não existem jogos definidos para o FC Porto na Taça de Portugal.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}