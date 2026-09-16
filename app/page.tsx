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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Jogos seguintes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                 Os eventos que se seguem no calendário do FC Porto.
              </p>
            </div>

            <a
              href="/fixtures"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Ver todos →
            </a>
          </div>

          <div className="mt-6 grid gap-4">
            {followingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}