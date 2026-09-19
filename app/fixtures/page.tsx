import { FixturesList } from "@/components/match/FixturesList";
import { FIXTURES } from "@/data/2026-27/fixtures";

export default function FixturesPage() {
  const sortedFixtures = [...FIXTURES].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Todos os Jogos
      </h1>

      <p className="mt-2 text-slate-600">
        Consulta todos os jogos do FC Porto na época 2026/27.
      </p>

      <FixturesList matches={sortedFixtures} />
    </main>
  );
}