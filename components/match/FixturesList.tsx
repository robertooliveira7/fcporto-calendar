"use client";

import { useState } from "react";

import { MatchCard } from "@/components/match/MatchCard";
import { COMPETITION_LABELS } from "@/constants/competitions";
import type { Competition, Match } from "@/types/match";

type FixturesListProps = {
  matches: Match[];
  showCompetitionFilter?: boolean;
};

type FixtureFilter = "all" | "upcoming" | "results";
type CompetitionFilter = "all" | Competition;
type ViewMode = "list" | "calendar";

type CalendarMonth = {
  year: number;
  month: number;
};

const WEEKDAYS = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

const COMPETITION_SHORT_LABELS: Record<Competition, string> = {
  liga: "Liga",
  "champions-league": "Champions",
  "taca-portugal": "Taça PT",
  "taca-liga": "Taça Liga",
};

const COMPETITION_STYLES: Record<Competition, string> = {
  liga: "border-blue-500 bg-blue-50 text-blue-700",
  "champions-league":
    "border-violet-500 bg-violet-50 text-violet-700",
  "taca-portugal":
    "border-emerald-500 bg-emerald-50 text-emerald-700",
  "taca-liga":
    "border-amber-500 bg-amber-50 text-amber-700",
};

const COMPETITION_DOT_STYLES: Record<Competition, string> = {
  liga: "bg-blue-500",
  "champions-league": "bg-violet-500",
  "taca-portugal": "bg-emerald-500",
  "taca-liga": "bg-amber-500",
};

function getMatchDateParts(date: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Europe/Lisbon",
  }).formatToParts(new Date(date));

  return {
    year: Number(
      parts.find((part) => part.type === "year")?.value
    ),
    month:
      Number(
        parts.find((part) => part.type === "month")?.value
      ) - 1,
    day: Number(
      parts.find((part) => part.type === "day")?.value
    ),
  };
}

function formatMatchTime(date: string) {
  return new Intl.DateTimeFormat("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Lisbon",
  }).format(new Date(date));
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/Lisbon",
  })
    .format(new Date(date))
    .replace(".", "")
    .toUpperCase();
}

function getInitialCalendarMonth(
  matches: Match[]
): CalendarMonth {
  const datedMatches = matches
    .filter((match) => match.date !== null)
    .sort(
      (a, b) =>
        new Date(a.date!).getTime() -
        new Date(b.date!).getTime()
    );

  const now = new Date();

  const nextMatch = datedMatches.find(
    (match) =>
      new Date(match.date!).getTime() >= now.getTime()
  );

  const initialMatch =
    nextMatch ?? datedMatches[datedMatches.length - 1];

  if (!initialMatch?.date) {
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
    };
  }

  const parts = getMatchDateParts(initialMatch.date);

  return {
    year: parts.year,
    month: parts.month,
  };
}

function getCalendarDays(
  year: number,
  month: number
) {
  const numberOfDays = new Date(
    Date.UTC(year, month + 1, 0)
  ).getUTCDate();

  const firstWeekday = new Date(
    Date.UTC(year, month, 1)
  ).getUTCDay();

  const leadingEmptyDays = (firstWeekday + 6) % 7;

  return [
    ...Array.from(
      { length: leadingEmptyDays },
      () => null
    ),
    ...Array.from(
      { length: numberOfDays },
      (_, index) => index + 1
    ),
  ];
}

function getMonthLabel(
  year: number,
  month: number
) {
  return new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1)));
}

export function FixturesList({
  matches,
  showCompetitionFilter = true,
}: FixturesListProps) {
  const [filter, setFilter] =
    useState<FixtureFilter>("all");

  const [competition, setCompetition] =
    useState<CompetitionFilter>("all");

  const [search, setSearch] = useState("");

  const [viewMode, setViewMode] =
    useState<ViewMode>("list");

  const [calendarMonth, setCalendarMonth] =
    useState<CalendarMonth>(() =>
      getInitialCalendarMonth(matches)
    );

  const filteredMatches = matches.filter((match) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "upcoming" &&
        match.status === "scheduled") ||
      (filter === "results" &&
        match.status === "finished");

    const matchesCompetition =
      competition === "all" ||
      match.competition === competition;

    const matchesSearch = match.opponent
      .toLowerCase()
      .includes(search.toLowerCase());

    return (
      matchesStatus &&
      matchesCompetition &&
      matchesSearch
    );
  });

  const groupedMatches =
    filteredMatches.reduce<Record<string, Match[]>>(
      (groups, match) => {
        const month = match.date
          ? new Intl.DateTimeFormat("pt-PT", {
              month: "long",
              year: "numeric",
              timeZone: "Europe/Lisbon",
            }).format(new Date(match.date))
          : "Data por definir";

        if (!groups[month]) {
          groups[month] = [];
        }

        groups[month].push(match);

        return groups;
      },
      {}
    );

  const calendarDays = getCalendarDays(
    calendarMonth.year,
    calendarMonth.month
  );

  const calendarMatches = filteredMatches
    .filter((match) => {
      if (!match.date) {
        return false;
      }

      const parts = getMatchDateParts(match.date);

      return (
        parts.year === calendarMonth.year &&
        parts.month === calendarMonth.month
      );
    })
    .sort(
      (a, b) =>
        new Date(a.date!).getTime() -
        new Date(b.date!).getTime()
    );

  function goToPreviousMonth() {
    setCalendarMonth((current) => {
      if (current.month === 0) {
        return {
          year: current.year - 1,
          month: 11,
        };
      }

      return {
        year: current.year,
        month: current.month - 1,
      };
    });
  }

  function goToNextMonth() {
    setCalendarMonth((current) => {
      if (current.month === 11) {
        return {
          year: current.year + 1,
          month: 0,
        };
      }

      return {
        year: current.year,
        month: current.month + 1,
      };
    });
  }

  return (
    <>
      {/* Pesquisa */}
      <div className="mt-8">
        <label
          htmlFor="opponent-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Pesquisar adversário
        </label>

        <input
          id="opponent-search"
          type="search"
          placeholder="Ex.: Benfica, Manchester City..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
        />
      </div>

      {/* Competição */}
      {showCompetitionFilter && (
        <div className="mt-6">
          <label
            htmlFor="competition"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Competição
          </label>

          <select
            id="competition"
            value={competition}
            onChange={(event) =>
              setCompetition(
                event.target
                  .value as CompetitionFilter
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">
              Todas as competições
            </option>

            {Object.entries(
              COMPETITION_LABELS
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Estado + Vista */}
      <div className="mt-4 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">
            Estado
          </p>

          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                filter === "all"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Todos
            </button>

            <button
              type="button"
              onClick={() =>
                setFilter("upcoming")
              }
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                filter === "upcoming"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Próximos
            </button>

            <button
              type="button"
              onClick={() =>
                setFilter("results")
              }
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                filter === "results"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Resultados
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">
            Vista
          </p>

          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() =>
                setViewMode("list")
              }
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                viewMode === "list"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Lista
            </button>

            <button
              type="button"
              onClick={() =>
                setViewMode("calendar")
              }
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                viewMode === "calendar"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Calendário
            </button>
          </div>
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
          <p className="font-semibold text-slate-900">
            Nenhum jogo encontrado
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Experimenta alterar a pesquisa ou os filtros
            selecionados.
          </p>
        </div>
      ) : viewMode === "list" ? (
        /* Lista */
        <div className="mt-10 space-y-12">
          {Object.entries(groupedMatches).map(
            ([month, monthMatches]) => (
              <section key={month}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="shrink-0 text-lg font-bold capitalize text-slate-900">
                    {month}
                  </h2>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid gap-4">
                  {monthMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                    />
                  ))}
                </div>
              </section>
            )
          )}
        </div>
      ) : (
        <>
          {/* Calendário mobile */}
          <section className="mt-8 md:hidden">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
                  aria-label="Mês anterior"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Calendário
                  </p>

                  <h2 className="mt-0.5 text-base font-bold capitalize text-slate-900">
                    {getMonthLabel(
                      calendarMonth.year,
                      calendarMonth.month
                    )}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
                  aria-label="Mês seguinte"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/70">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    className="py-2 text-center text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 p-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return (
                      <div
                        key={`mobile-empty-${index}`}
                        className="aspect-square"
                      />
                    );
                  }

                  const dayMatches =
                    calendarMatches.filter((match) => {
                      if (!match.date) {
                        return false;
                      }

                      return (
                        getMatchDateParts(
                          match.date
                        ).day === day
                      );
                    });

                  return (
                    <div
                      key={day}
                      className="flex aspect-square flex-col items-center justify-center gap-1"
                    >
                      <span className="text-xs font-semibold text-slate-600">
                        {day}
                      </span>

                      {dayMatches.length > 0 && (
                        <div className="flex items-center gap-0.5">
                          {dayMatches
                            .slice(0, 3)
                            .map((match) => (
                              <span
                                key={match.id}
                                className={`h-1.5 w-1.5 rounded-full ${
                                  COMPETITION_DOT_STYLES[
                                    match.competition
                                  ]
                                }`}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Jogos do mês */}
            <div className="mt-4 space-y-2">
              {calendarMatches.length > 0 ? (
                calendarMatches.map((match) => {
                  const isFinished =
                    match.status === "finished" &&
                    match.score !== null;

                  return (
                    <div
                      key={match.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3"
                    >
                      <div className="w-14 shrink-0">
                        <p className="text-xs font-bold text-slate-900">
                          {match.date
                            ? formatShortDate(match.date)
                            : ""}
                        </p>
                      </div>

                      <div
                        className={`h-8 w-1 shrink-0 rounded-full ${
                          COMPETITION_DOT_STYLES[
                            match.competition
                          ]
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
                          {
                            COMPETITION_SHORT_LABELS[
                              match.competition
                            ]
                          }{" "}
                          ·{" "}
                          {match.venue === "home"
                            ? "Casa"
                            : "Fora"}
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                          {match.opponent}
                        </p>
                      </div>

                      <div className="shrink-0 text-sm font-bold text-slate-900">
                        {isFinished
                          ? `${match.score!.fcPorto}-${match.score!.opponent}`
                          : match.date
                            ? formatMatchTime(match.date)
                            : ""}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center">
                  <p className="text-sm text-slate-500">
                    Não existem jogos neste mês.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Calendário desktop */}
          <section className="mt-8 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Mês anterior"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Calendário
                </p>

                <h2 className="mt-0.5 text-lg font-bold capitalize text-slate-900">
                  {getMonthLabel(
                    calendarMonth.year,
                    calendarMonth.month
                  )}
                </h2>
              </div>

              <button
                type="button"
                onClick={goToNextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Mês seguinte"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/70">
              {WEEKDAYS.map((weekday) => (
                <div
                  key={weekday}
                  className="px-2 py-3 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400"
                >
                  {weekday}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-32 border-b border-r border-slate-100 bg-slate-50/40"
                    />
                  );
                }

                const dayMatches =
                  calendarMatches.filter((match) => {
                    if (!match.date) {
                      return false;
                    }

                    return (
                      getMatchDateParts(
                        match.date
                      ).day === day
                    );
                  });

                return (
                  <div
                    key={day}
                    className="min-h-32 border-b border-r border-slate-100 p-2 last:border-r-0"
                  >
                    <div className="mb-2 text-xs font-semibold text-slate-500">
                      {day}
                    </div>

                    <div className="space-y-2">
                      {dayMatches.map((match) => {
                        const isFinished =
                          match.status ===
                            "finished" &&
                          match.score !== null;

                        return (
                          <div
                            key={match.id}
                            className={`rounded-lg border-l-2 px-2 py-2 ${
                              COMPETITION_STYLES[
                                match.competition
                              ]
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-[10px] font-bold uppercase tracking-wide">
                                {
                                  COMPETITION_SHORT_LABELS[
                                    match.competition
                                  ]
                                }
                              </span>

                              <span className="shrink-0 text-[10px] font-semibold">
                                {isFinished
                                  ? `${match.score!.fcPorto}-${match.score!.opponent}`
                                  : match.date
                                    ? formatMatchTime(
                                        match.date
                                      )
                                    : ""}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-xs font-semibold text-slate-800">
                              {match.opponent}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-500">
                              {match.venue === "home"
                                ? "Casa"
                                : "Fora"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}