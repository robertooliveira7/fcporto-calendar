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
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
            Próximo jogo
          </p>

          <div className="flex flex-wrap items-center justify-end gap-1.5 text-right text-[10px] uppercase tracking-[0.08em] sm:gap-2 sm:text-xs sm:tracking-[0.1em]">
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
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-4 sm:gap-5">
          {/* Casa */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              {homeCrest ? (
                <Image
                  src={homeCrest}
                  alt={`Símbolo ${homeTeam}`}
                  width={52}
                  height={52}
                  unoptimized
                  className="max-h-10 max-w-10 object-contain sm:max-h-14 sm:max-w-14"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-slate-100 sm:h-10 sm:w-10" />
              )}
            </div>

            <span
              className={`min-w-0 text-xs font-bold leading-tight sm:text-base ${
                homeTeam === "FC Porto"
                  ? "text-slate-950"
                  : "text-slate-700"
              }`}
            >
              {homeTeam}
            </span>
          </div>

          {/* Centro */}
          <div className="flex min-w-[92px] flex-col items-center justify-center text-center sm:min-w-[120px]">
            {time ? (
              <>
                <span className="text-xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {time}
                </span>

                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 sm:mt-1 sm:text-sm sm:tracking-[0.08em]">
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
          <div className="flex min-w-0 flex-row-reverse items-center gap-2 text-right sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              {awayCrest ? (
                <Image
                  src={awayCrest}
                  alt={`Símbolo ${awayTeam}`}
                  width={52}
                  height={52}
                  unoptimized
                  className="max-h-10 max-w-10 object-contain sm:max-h-14 sm:max-w-14"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-slate-100 sm:h-10 sm:w-10" />
              )}
            </div>

            <span
              className={`min-w-0 text-xs font-bold leading-tight sm:text-base ${
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
        <div className="mt-3 border-t border-slate-100 pt-3 sm:mt-4">
          {match.date && (
            <div className="flex justify-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 shadow-sm sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 sm:gap-2 sm:text-xs">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0 text-blue-600 sm:h-4 sm:w-4"
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
          <div className="mt-2 flex justify-end border-t border-slate-100 pt-2 text-[11px] text-slate-500 sm:mt-3 sm:pt-3 sm:text-sm">
            {match.stadium && <span>{match.stadium}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}