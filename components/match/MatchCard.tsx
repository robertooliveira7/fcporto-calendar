import { COMPETITION_LABELS } from "@/constants/competitions";

import type { Match } from "@/types/match";

type MatchCardProps = {
  match: Match;
};

export function MatchCard({ match }: MatchCardProps) {
  const formattedDate = match.date
  ? new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(match.date))
  : "Data por definir";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">
        {COMPETITION_LABELS[match.competition]}
      </p>

      <div className="mt-4 flex items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-slate-900">
            {match.venue === "home" ? "FC Porto" : match.opponent}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {match.venue === "home" ? "Casa" : "Fora"}
          </p>
        </div>

        <span className="text-sm font-medium text-slate-400">vs</span>

        <p className="font-semibold text-slate-900">
          {match.venue === "home" ? match.opponent : "FC Porto"}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <p>{formattedDate}</p>
        <p className="mt-1">{match.stadium}</p>
      </div>
    </article>
  );
}