import type { Standing } from "@/types/standings";

type ChampionsStandingsPreviewProps = {
  standings: Standing[];
};

export function ChampionsStandingsPreview({
  standings,
}: ChampionsStandingsPreviewProps) {
  const fcPortoIndex = standings.findIndex(
    (team) => team.team === "FC Porto"
  );

  if (fcPortoIndex === -1) {
    return null;
  }

  const start = Math.max(
    0,
    Math.min(fcPortoIndex - 2, standings.length - 5)
  );

  const nearbyTeams = standings.slice(start, start + 5);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {nearbyTeams.map((team) => {
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