import Image from "next/image";

import { MatchCountdown } from "@/components/match/MatchCountdown";
import { COMPETITION_LABELS } from "@/constants/competitions";
import type { Match } from "@/types/match";

type NextMatchProps = {
  match: Match;
};

function formatMatchDate(date: string | null) {
  if (!date) {
    return {
      displayDate: "DATA POR DEFINIR",
      time: null,
    };
  }

  const parsedDate = new Date(date);

  const numericDate = new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Lisbon",
  })
    .format(parsedDate)
    .replace("/", ".");

  const weekday = new Intl.DateTimeFormat("pt-PT", {
    weekday: "short",
    timeZone: "Europe/Lisbon",
  })
    .format(parsedDate)
    .replace(".", "")
    .toUpperCase();

  const numericTime = new Intl.DateTimeFormat("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Lisbon",
  }).format(parsedDate);

  return {
    displayDate: `${numericDate} | ${weekday}`,
    time: numericTime.replace(":", "h"),
  };
}

export function NextMatch({ match }: NextMatchProps) {
  const fcPortoIsHome = match.venue === "home";

  const homeTeam = fcPortoIsHome ? "FC Porto" : match.opponent;
  const awayTeam = fcPortoIsHome ? match.opponent : "FC Porto";

  const homeCrest = fcPortoIsHome
    ? match.fcPortoCrest
    : match.opponentCrest;

  const awayCrest = fcPortoIsHome
    ? match.opponentCrest
    : match.fcPortoCrest;

  const { displayDate, time } = formatMatchDate(match.date);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 bg-blue-600" />

      <div className="p-4 sm:p-5">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
            Próximo jogo
          </p>

          <div className="flex flex-wrap items-center justify-end gap-2 text-[10px] uppercase tracking-[0.1em] sm:text-xs">
            <span className="font-semibold text-slate-500">
              {COMPETITION_LABELS[match.competition]}
            </span>

            <span className="text-slate-300">·</span>

            <span className="font-medium text-slate-400">
              {match.round}
            </span>
          </div>
        </div>

        {/* Equipas + hora + data */}
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          {/* Casa */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              {homeCrest ? (
                <Image
                  src={homeCrest}
                  alt={`Símbolo ${homeTeam}`}
                  width={52}
                  height={52}
                  unoptimized
                  className="max-h-12 max-w-12 object-contain sm:max-h-14 sm:max-w-14"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-100" />
              )}
            </div>

            <span
              className={`min-w-0 text-sm font-bold leading-tight sm:text-base ${
                homeTeam === "FC Porto"
                  ? "text-slate-950"
                  : "text-slate-700"
              }`}
            >
              {homeTeam}
            </span>
          </div>

          {/* Centro */}
          <div className="flex min-w-[120px] flex-col items-center justify-center text-center">
            {time ? (
              <>
                <span className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {time}
                </span>

                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-sm">
                  {displayDate}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                vs
              </span>
            )}
          </div>

          {/* Fora */}
          <div className="flex min-w-0 flex-row-reverse items-center gap-3 text-right">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              {awayCrest ? (
                <Image
                  src={awayCrest}
                  alt={`Símbolo ${awayTeam}`}
                  width={52}
                  height={52}
                  unoptimized
                  className="max-h-12 max-w-12 object-contain sm:max-h-14 sm:max-w-14"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-100" />
              )}
            </div>

            <span
              className={`min-w-0 text-sm font-bold leading-tight sm:text-base ${
                awayTeam === "FC Porto"
                  ? "text-slate-950"
                  : "text-slate-700"
              }`}
            >
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-4 border-t border-slate-100 pt-3">
          {match.date && (
            <div className="flex justify-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-blue-600"
                    aria-hidden="true"
                  >
                    <path d="M10 2h4" />
                    <path d="M12 14l3-3" />
                    <circle cx="12" cy="14" r="8" />
                  </svg>

                  <span className="text-slate-300">·</span>

                  <MatchCountdown date={match.date} />
                </div>
              </div>
            </div>
          )}

          {/* Estádio */}
          <div className="mt-3 flex justify-end border-t border-slate-100 pt-3 text-xs text-slate-500 sm:text-sm">
            {match.stadium && <span>{match.stadium}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}