import { MatchCard } from "@/components/match/MatchCard";
import { NextMatch } from "@/components/match/NextMatch";
import { FIXTURES } from "@/data/2026-27/fixtures";

export default function HomePage() {
  const now = new Date();

  const upcomingMatches = FIXTURES
    .filter(
      (match) =>
        match.status === "scheduled" &&
        match.date !== null &&
        new Date(match.date) > now
    )
    .sort(
      (a, b) =>
        new Date(a.date!).getTime() - new Date(b.date!).getTime()
    );

  const nextMatch = upcomingMatches[0];
  const followingMatches = upcomingMatches.slice(1, 4);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Época 2026/27
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          FC Porto Calendar
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Todos os jogos do FC Porto, num só lugar.
        </p>
      </section>

      {nextMatch && (
        <div className="mt-10">
          <NextMatch match={nextMatch} />
        </div>
      )}

      {followingMatches.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex justify-end">
            <a
              href="/fixtures"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Ver todos →
            </a>
          </div>

          <details className="group rounded-xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Jogos seguintes
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Os próximos eventos no calendário do FC Porto.
                </p>
              </div>

              <span className="text-xl text-slate-500 transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="grid gap-4 border-t border-slate-100 p-6">
              {followingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </details>
        </section>
      )}
    </main>
  );
}