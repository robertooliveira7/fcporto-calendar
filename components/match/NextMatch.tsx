import { MatchCountdown } from "@/components/match/MatchCountdown";
import { COMPETITION_LABELS } from "@/constants/competitions";
import type { Match } from "@/types/match";

type NextMatchProps = {
  match: Match;
};

export function NextMatch({ match }: NextMatchProps) {
  const formattedDate = match.date
    ? new Intl.DateTimeFormat("pt-PT", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(match.date))
    : "Data por definir";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Próximo jogo
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {COMPETITION_LABELS[match.competition]} · {match.round}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {match.venue === "home" ? "Casa" : "Fora"}
        </span>
      </div>

      <div className="my-10 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <p className="text-xl font-bold text-slate-900">
          {match.venue === "home" ? "FC Porto" : match.opponent}
        </p>

        <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          vs
        </span>

        <p className="text-right text-xl font-bold text-slate-900">
          {match.venue === "home" ? match.opponent : "FC Porto"}
        </p>
      </div>

      <div className="border-t border-slate-100 pt-5">
  <p className="font-medium text-slate-900">{formattedDate}</p>
  <p className="mt-1 text-sm text-slate-500">{match.stadium}</p>

  {match.date && <MatchCountdown date={match.date} />}
</div>
    </section>
  );
}