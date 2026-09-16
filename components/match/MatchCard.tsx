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

  const fcPortoGoals = match.goals.filter(
    (goal) => goal.team === "fc-porto"
  );

  const opponentGoals = match.goals.filter(
    (goal) => goal.team === "opponent"
  );

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
     <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
  <span>{COMPETITION_LABELS[match.competition]}</span>
  <span>•</span>
  <span>{match.round}</span>
  <span>•</span>
  <span>{match.venue === "home" ? "Casa" : "Fora"}</span>
</div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-start gap-6">
        <div>
          <p className="font-semibold text-slate-900">
            {match.venue === "home" ? "FC Porto" : match.opponent}
          </p>

        

          <div className="mt-3 space-y-1 text-sm text-slate-500">
            {(match.venue === "home" ? fcPortoGoals : opponentGoals).map(
              (goal, index) => (
                <p key={`${goal.scorer}-${goal.minute}-${index}`}>
                  {goal.scorer}
                  {goal.penalty ? " (p)" : ""} {goal.minute}&apos;
                </p>
              )
            )}
          </div>
        </div>

        <span className="text-lg font-bold text-slate-900">
          {match.status === "finished" && match.score
            ? match.venue === "home"
              ? `${match.score.fcPorto} - ${match.score.opponent}`
              : `${match.score.opponent} - ${match.score.fcPorto}`
            : "vs"}
        </span>

        <div className="text-right">
          <p className="font-semibold text-slate-900">
            {match.venue === "home" ? match.opponent : "FC Porto"}
          </p>

          <div className="mt-3 space-y-1 text-sm text-slate-500">
            {(match.venue === "home" ? opponentGoals : fcPortoGoals).map(
              (goal, index) => (
                <p key={`${goal.scorer}-${goal.minute}-${index}`}>
                  {goal.scorer}
                  {goal.penalty ? " (p)" : ""} {goal.minute}&apos;
                </p>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <p>{formattedDate}</p>
        <p className="mt-1">{match.stadium}</p>
      </div>
    </article>
  );
}