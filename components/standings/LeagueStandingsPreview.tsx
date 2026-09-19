import type { Standing } from "@/types/standings";

type LeagueStandingsPreviewProps = {
  standings: Standing[];
};

export function LeagueStandingsPreview({
  standings,
}: LeagueStandingsPreviewProps) {
  const topFive = standings.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {topFive.map((team) => {
        const isFcPorto = team.team === "FC Porto";

        return (
          <div
            key={team.team}
            className={`grid grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0 ${
              isFcPorto ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            <span className="text-sm text-slate-500">
              {team.position}
            </span>

            <span className="font-medium text-slate-900">
              {team.team}
            </span>

            <span className="font-bold text-slate-900">
              {team.points} pts
            </span>
          </div>
        );
      })}
    </div>
  );
}