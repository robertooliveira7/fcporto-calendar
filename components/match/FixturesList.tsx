"use client";

import { useState } from "react";
import { MatchCard } from "@/components/match/MatchCard";
import { COMPETITION_LABELS } from "@/constants/competitions";
import type { Competition, Match } from "@/types/match";

type FixturesListProps = {
  matches: Match[];
};

type FixtureFilter = "all" | "upcoming" | "results";

type CompetitionFilter = "all" | Competition;

export function FixturesList({ matches }: FixturesListProps) {
  const [filter, setFilter] = useState<FixtureFilter>("all");

  const [competition, setCompetition] =
    useState<CompetitionFilter>("all");
    const [search, setSearch] = useState("");

 const filteredMatches = matches.filter((match) => {
  const matchesStatus =
    filter === "all" ||
    (filter === "upcoming" && match.status === "scheduled") ||
    (filter === "results" && match.status === "finished");

  const matchesCompetition =
    competition === "all" || match.competition === competition;

  const matchesSearch = match.opponent
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchesStatus && matchesCompetition && matchesSearch;
});

  const groupedMatches = filteredMatches.reduce<Record<string, Match[]>>(
  (groups, match) => {
    const month = match.date
      ? new Intl.DateTimeFormat("pt-PT", {
          month: "long",
          year: "numeric",
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

  return (
    <>
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
    onChange={(event) => setSearch(event.target.value)}
    className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
  />
</div>
      <div className="mt-8 inline-flex rounded-lg border border-slate-200 bg-white p-1">
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
          onClick={() => setFilter("upcoming")}
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
          onClick={() => setFilter("results")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
            filter === "results"
              ? "bg-blue-700 text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Resultados
        </button>
      </div>

      <div className="mt-4">
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
            setCompetition(event.target.value as CompetitionFilter)
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="all">Todas as competições</option>

          {Object.entries(COMPETITION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {filteredMatches.length === 0 ? (
  <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
    <p className="font-semibold text-slate-900">
      Nenhum jogo encontrado
    </p>

    <p className="mt-2 text-sm text-slate-500">
      Experimenta alterar a pesquisa ou os filtros selecionados.
    </p>
  </div>
) : (
  <div className="mt-10 space-y-12">
    {Object.entries(groupedMatches).map(([month, monthMatches]) => (
      <section key={month}>
        <div className="mb-5 flex items-center gap-4">
          <h2 className="shrink-0 text-lg font-bold capitalize text-slate-900">
            {month}
          </h2>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid gap-4">
          {monthMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    ))}
  </div>
)}
</>
  );
  }