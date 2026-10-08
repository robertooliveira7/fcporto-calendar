import { CompetitionStageProgress } from "@/components/competitions/CompetitionStageProgress";
import { CompetitionProgress } from "@/components/competitions/CompetitionProgress";
import { MatchCard } from "@/components/match/MatchCard";
import { NextMatch } from "@/components/match/NextMatch";
import { ExpandableSection } from "@/components/shared/ExpandableSection";
import { ChampionsStandingsPreview } from "@/components/standings/ChampionsStandingsPreview";
import { LeagueStandingsPreview } from "@/components/standings/LeagueStandingsPreview";
import { TACA_PORTUGAL_STAGES } from "@/data/2026-27/taca-portugal";
import {
  getChampionsStandings,
  getLigaStandings,
} from "@/services/football-data";
import { getAllFixtures } from "@/services/matches";

export default async function HomePage() {
  const [fixtures, ligaStandings, championsStandings] =
    await Promise.all([
      getAllFixtures(),
      getLigaStandings(),
      getChampionsStandings(),
    ]);

  const now = new Date();

  const upcomingMatches = fixtures
    .filter(
      (match) =>
        match.status === "scheduled" &&
        match.date !== null &&
        new Date(match.date) > now
    )
    .sort(
      (a, b) =>
        new Date(a.date!).getTime() -
        new Date(b.date!).getTime()
    );

  const nextMatch = upcomingMatches[0];

  const followingMatches = upcomingMatches.slice(1, 4);

  const recentResults = fixtures
    .filter(
      (match) =>
        match.status === "finished" &&
        match.date !== null
    )
    .sort(
      (a, b) =>
        new Date(b.date!).getTime() -
        new Date(a.date!).getTime()
    )
    .slice(0, 3);

  const tacaLigaMatches = fixtures.filter(
    (match) => match.competition === "taca-liga"
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Introdução */}
      <section>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Época 2026/27
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Calendário FC Porto
          </h1>

          <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
            Todos os jogos do FC Porto, num só lugar.
          </p>
        </div>
      </section>

      {/* Próximo jogo */}
      {nextMatch && (
        <section className="mt-7">
          <NextMatch match={nextMatch} />
        </section>
      )}

      {/* Jogos */}
      <section className="mt-8">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Calendário
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            Jogos
          </h2>
        </div>

        <div className="space-y-6">
          {followingMatches.length > 0 && (
            <ExpandableSection
              title="Jogos seguintes"
              description="Os próximos jogos do FC Porto."
              link={{
                label: "Ver todos",
                href: "/fixtures",
              }}
            >
              <div className="grid gap-3">
                {followingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </ExpandableSection>
          )}

          {recentResults.length > 0 && (
            <ExpandableSection
              title="Resultados recentes"
              description="Os últimos resultados do FC Porto."
              link={{
                label: "Ver todos",
                href: "/fixtures",
              }}
            >
              <div className="grid gap-3">
                {recentResults.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </ExpandableSection>
          )}
        </div>
      </section>

      {/* Classificações */}
      <section className="mt-10 border-t border-slate-200 pt-8">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Classificações
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            FC Porto
          </h2>
        </div>

        <div className="space-y-6">
          <ExpandableSection
            title="Liga"
            description="Classificação atual da Liga Portugal."
            link={{
              label: "Ver classificação",
              href: "/competitions/liga",
            }}
          >
            <LeagueStandingsPreview standings={ligaStandings} />
          </ExpandableSection>

          <ExpandableSection
            title="Liga dos Campeões"
            description="Classificação atual da fase de liga."
            link={{
              label: "Ver classificação",
              href: "/competitions/champions-league",
            }}
          >
            <ChampionsStandingsPreview
              standings={championsStandings}
            />
          </ExpandableSection>
        </div>
      </section>

      {/* Taças */}
      <section className="mt-10 border-t border-slate-200 pt-8">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Competições
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            Taças
          </h2>
        </div>

        <div className="space-y-6">
          <ExpandableSection
            title="Taça de Portugal"
            description="Percurso do FC Porto na competição."
            link={{
              label: "Ver competição",
              href: "/competitions/taca-portugal",
            }}
          >
            <CompetitionStageProgress
              stages={TACA_PORTUGAL_STAGES}
            />
          </ExpandableSection>

          <ExpandableSection
            title="Taça da Liga"
            description="Percurso do FC Porto na competição."
            link={{
              label: "Ver competição",
              href: "/competitions/taca-liga",
            }}
          >
            <CompetitionProgress matches={tacaLigaMatches} />
          </ExpandableSection>
        </div>
      </section>
    </main>
  );
}