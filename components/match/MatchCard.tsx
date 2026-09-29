import Image from "next/image";

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

  const homeTeamName =
    match.venue === "home" ? "FC Porto" : match.opponent;

  const awayTeamName =
    match.venue === "home" ? match.opponent : "FC Porto";

  const homeTeamCrest =
    match.venue === "home"
      ? match.fcPortoCrest
      : match.opponentCrest;

  const awayTeamCrest =
    match.venue === "home"
      ? match.opponentCrest
      : match.fcPortoCrest;

  const homeGoals =
    match.venue === "home" ? fcPortoGoals : opponentGoals;

  const awayGoals =
    match.venue === "home" ? opponentGoals : fcPortoGoals;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <span>{COMPETITION_LABELS[match.competition]}</span>
        <span>•</span>
        <span>{match.round}</span>
        <span>•</span>
        <span>{match.venue === "home" ? "Casa" : "Fora"}</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-start gap-6">
        <div>
          <div className="flex items-center gap-3">
            {homeTeamCrest && (
              <Image
                src={homeTeamCrest}
                alt={`Símbolo ${homeTeamName}`}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 object-contain"
              />
            )}

            <p className="font-semibold text-slate-900">
              {homeTeamName}
            </p>
          </div>

          <div className="mt-3 space-y-1 text-sm text-slate-500">
            {homeGoals.map((goal, index) => (
              <p key={`${goal.scorer}-${goal.minute}-${index}`}>
                {goal.scorer}
                {goal.penalty ? " (p)" : ""} {goal.minute}&apos;
              </p>
            ))}
          </div>
        </div>

        <span className="pt-2 text-lg font-bold text-slate-900">
          {match.status === "finished" && match.score
            ? match.venue === "home"
              ? `${match.score.fcPorto} - ${match.score.opponent}`
              : `${match.score.opponent} - ${match.score.fcPorto}`
            : "vs"}
        </span>

        <div className="text-right">
          <div className="flex items-center justify-end gap-3">
            <p className="font-semibold text-slate-900">
              {awayTeamName}
            </p>

            {awayTeamCrest && (
              <Image
                src={awayTeamCrest}
                alt={`Símbolo ${awayTeamName}`}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 object-contain"
              />
            )}
          </div>

          <div className="mt-3 space-y-1 text-sm text-slate-500">
            {awayGoals.map((goal, index) => (
              <p key={`${goal.scorer}-${goal.minute}-${index}`}>
                {goal.scorer}
                {goal.penalty ? " (p)" : ""} {goal.minute}&apos;
              </p>
            ))}
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