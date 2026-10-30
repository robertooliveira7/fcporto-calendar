import Image from "next/image";

import { COMPETITION_LABELS } from "@/constants/competitions";
import type { Goal, Match } from "@/types/match";

type MatchCardProps = {
  match: Match;
};

function getMatchOutcome(match: Match) {
  if (match.status !== "finished" || !match.score) {
    return null;
  }

  if (match.score.fcPorto > match.score.opponent) {
    return "win";
  }

  if (match.score.fcPorto < match.score.opponent) {
    return "loss";
  }

  return "draw";
}

function getStatusLabel(match: Match) {
  switch (match.status) {
    case "finished":
      return "Terminado";
    case "live":
      return "Ao vivo";
    case "postponed":
      return "Adiado";
    case "cancelled":
      return "Cancelado";
    default:
      return "Agendado";
  }
}

function getStatusStyles(match: Match) {
  if (match.status === "live") {
    return "bg-red-50 text-red-700 ring-red-200";
  }

  if (match.status === "finished") {
    return "bg-slate-100 text-slate-600 ring-slate-200";
  }

  if (match.status === "postponed" || match.status === "cancelled") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-blue-50 text-blue-700 ring-blue-200";
}

function getOutcomeBorder(match: Match) {
  const outcome = getMatchOutcome(match);

  if (outcome === "win") {
    return "border-l-4 border-l-emerald-500";
  }

  if (outcome === "loss") {
    return "border-l-4 border-l-red-400";
  }

  if (outcome === "draw") {
    return "border-l-4 border-l-slate-400";
  }

  return "border-l-4 border-l-blue-600";
}

function formatDate(date: string | null) {
  if (!date) {
    return {
      date: "Data por definir",
      time: null,
    };
  }

  const parsedDate = new Date(date);

  return {
    date: new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Lisbon",
    })
      .format(parsedDate)
      .replace(".", "")
      .toUpperCase(),

    time: new Intl.DateTimeFormat("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Lisbon",
    }).format(parsedDate),
  };
}

function GoalList({
  goals,
  align = "left",
}: {
  goals: Goal[];
  align?: "left" | "right";
}) {
  if (goals.length === 0) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {goals.map((goal, index) => (
        <p
          key={`${goal.scorer}-${goal.minute}-${index}`}
          className="text-xs leading-5 text-slate-500 sm:text-sm"
        >
          {goal.scorer}
          {goal.penalty ? " (p)" : ""}{" "}
          <span className="font-medium text-slate-400">
            {goal.minute}&apos;
          </span>
        </p>
      ))}
    </div>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  // Em campo neutro, mostramos o FC Porto à esquerda.
const fcPortoIsHome = match.venue !== "away";

  const homeTeam = fcPortoIsHome ? "FC Porto" : match.opponent;
  const awayTeam = fcPortoIsHome ? match.opponent : "FC Porto";

  const homeCrest = fcPortoIsHome
    ? match.fcPortoCrest
    : match.opponentCrest;

  const awayCrest = fcPortoIsHome
    ? match.opponentCrest
    : match.fcPortoCrest;

  const homeGoals = match.goals.filter((goal) =>
    fcPortoIsHome
      ? goal.team === "fc-porto"
      : goal.team === "opponent"
  );

  const awayGoals = match.goals.filter((goal) =>
    fcPortoIsHome
      ? goal.team === "opponent"
      : goal.team === "fc-porto"
  );

  const homeScore = match.score
    ? fcPortoIsHome
      ? match.score.fcPorto
      : match.score.opponent
    : null;

  const awayScore = match.score
    ? fcPortoIsHome
      ? match.score.opponent
      : match.score.fcPorto
    : null;

  const { date, time } = formatDate(match.date);

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${getOutcomeBorder(
        match
      )}`}
    >
      <div className="p-4 sm:p-5">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {COMPETITION_LABELS[match.competition]}
            </span>

            <span className="text-slate-300">·</span>

            <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
              {match.round}
            </span>
            {match.venue === "neutral" && (
  <>
    <span className="text-slate-300">·</span>
    <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
      Campo neutro
    </span>
  </>
)}
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset ${getStatusStyles(
              match
            )}`}
          >
            {getStatusLabel(match)}
          </span>
        </div>

        {/* Equipas + resultado */}
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
          {/* Casa */}
          <div className="flex min-w-0 flex-col items-center gap-2.5 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              {homeCrest ? (
                <Image
                  src={homeCrest}
                  alt={`Símbolo ${homeTeam}`}
                  width={48}
                  height={48}
                  unoptimized
                  className="max-h-12 max-w-12 object-contain sm:max-h-14 sm:max-w-14"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-100" />
              )}
            </div>

            <span
              className={`min-w-0 text-sm font-semibold leading-tight sm:text-base ${
                homeTeam === "FC Porto"
                  ? "text-slate-950"
                  : "text-slate-700"
              }`}
            >
              {homeTeam}
            </span>
          </div>

          {/* Centro */}
          <div className="flex min-w-[76px] flex-col items-center justify-center">
            {match.status === "finished" && match.score ? (
              <div className="whitespace-nowrap text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {homeScore}
                <span className="mx-2 font-normal text-slate-300">—</span>
                {awayScore}
              </div>
            ) : (
              <>
                {time ? (
                  <div className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {time}
                  </div>
                ) : (
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                    vs
                  </div>
                )}
              </>
            )}
          </div>

          {/* Fora */}
          <div className="flex min-w-0 flex-col items-center gap-2.5 text-center sm:flex-row-reverse sm:text-right">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              {awayCrest ? (
                <Image
                  src={awayCrest}
                  alt={`Símbolo ${awayTeam}`}
                  width={48}
                  height={48}
                  unoptimized
                  className="max-h-12 max-w-12 object-contain sm:max-h-14 sm:max-w-14"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-100" />
              )}
            </div>

            <span
              className={`min-w-0 text-sm font-semibold leading-tight sm:text-base ${
                awayTeam === "FC Porto"
                  ? "text-slate-950"
                  : "text-slate-700"
              }`}
            >
              {awayTeam}
            </span>
          </div>
        </div>

      {/* Marcadores */}
{match.goals.length > 0 && (
  <div className="mt-4 grid grid-cols-2 gap-6 border-t border-slate-100 pt-3">
    <div>
      <GoalList goals={homeGoals} />
    </div>

    <div>
      <GoalList goals={awayGoals} align="right" />
    </div>
  </div>
)}

        {/* Rodapé */}
        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-600">{date}</span>

            {match.status === "finished" && time && (
              <>
                <span className="text-slate-300">·</span>
                <span>{time}</span>
              </>
            )}
          </div>

          {match.stadium && (
            <span className="sm:text-right">
              {match.stadium}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}