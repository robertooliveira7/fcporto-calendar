import type { Standing } from "@/types/standings";

type LeagueStandingsPreviewProps = {
  standings: Standing[];
  limit?: number;
};

export function LeagueStandingsPreview({
  standings,
  limit = 5,
}: LeagueStandingsPreviewProps) {
 

  const visibleStandings = standings.slice(0, limit);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      {visibleStandings.map((standing) => (
        <div
          key={standing.team}
          className="grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-slate-200 px-6 py-4 last:border-b-0"
        >
          <span className="text-sm text-slate-500">
            {standing.position}
          </span>

          <span className="font-medium text-slate-900">
            {standing.team}
          </span>

          <span className="font-semibold text-slate-900">
            {standing.points} pts
          </span>
        </div>
      ))}
    </div>
  );
}