import type { Match } from "@/types/match";

type CompetitionProgressProps = {
  matches: Match[];
};

export function CompetitionProgress({
  matches,
}: CompetitionProgressProps) {
  if (matches.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Ainda não existem jogos definidos.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {matches.map((match) => {
        const formattedDate = match.date
          ? new Intl.DateTimeFormat("pt-PT", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(match.date))
          : "Data por definir";

        const homeTeam =
          match.venue === "home" ? "FC Porto" : match.opponent;

        const awayTeam =
          match.venue === "home" ? match.opponent : "FC Porto";

        return (
          <div
            key={match.id}
            className="border-b border-slate-100 px-6 py-4 last:border-b-0"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              {match.round}
            </p>

            <div className="mt-2 flex items-center justify-between gap-6">
              <p className="font-semibold text-slate-900">
                {homeTeam}{" "}
                <span className="mx-2 text-slate-400">vs</span>{" "}
                {awayTeam}
              </p>

              <p className="shrink-0 text-sm text-slate-500">
                {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}