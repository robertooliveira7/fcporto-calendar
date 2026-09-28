import { FixturesList } from "@/components/match/FixturesList";
import { getAllFixtures } from "@/services/matches";

export default async function FixturesPage() {
  const fixtures = await getAllFixtures();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Todos os Jogos
      </h1>

      <p className="mt-2 text-slate-600">
        Consulta todos os jogos do FC Porto na época 2026/27.
      </p>

      <FixturesList matches={fixtures} />
    </main>
  );
}