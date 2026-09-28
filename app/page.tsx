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
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Época 2026/27
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Calendário FC Porto
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Todos os jogos do FC Porto, num só lugar.
        </p>
      </section>

      {nextMatch && (
        <div className="mt-10">
          <NextMatch match={nextMatch} />
        </div>
      )}

      {followingMatches.length > 0 && (
        <div className="mt-6">
          <ExpandableSection
            title="Jogos seguintes"
            description="Os próximos eventos no calendário do FC Porto."
            link={{
              label: "Ver todos",
              href: "/fixtures",
            }}
          >
            <div className="grid gap-4">
              {followingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </ExpandableSection>
        </div>
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
          <div className="grid gap-4">
            {recentResults.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </ExpandableSection>
      )}

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
    </main>
  );
}