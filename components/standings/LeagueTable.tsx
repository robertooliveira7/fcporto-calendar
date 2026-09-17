import type { Standing } from "@/types/standings";

type LeagueTableProps = {
  standings: Standing[];
};

export function LeagueTable({ standings }: LeagueTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Equipa</th>
              <th className="px-3 py-3 text-center">J</th>
              <th className="px-3 py-3 text-center">V</th>
              <th className="px-3 py-3 text-center">E</th>
              <th className="px-3 py-3 text-center">D</th>
              <th className="px-3 py-3 text-center">GM</th>
              <th className="px-3 py-3 text-center">GS</th>
              <th className="px-3 py-3 text-center">DG</th>
              <th className="px-4 py-3 text-center">PTS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {standings.map((team) => {
              const isFcPorto = team.team === "FC Porto";

              return (
                <tr
                  key={team.team}
                  className={
                    isFcPorto
                      ? "bg-blue-50 font-semibold"
                      : "hover:bg-slate-50"
                  }
                >
                  <td className="px-4 py-4 text-slate-500">
                    {team.position}
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-900">
                    {team.team}
                  </td>

                  <td className="px-3 py-4 text-center">{team.played}</td>
                  <td className="px-3 py-4 text-center">{team.wins}</td>
                  <td className="px-3 py-4 text-center">{team.draws}</td>
                  <td className="px-3 py-4 text-center">{team.losses}</td>
                  <td className="px-3 py-4 text-center">{team.goalsFor}</td>
                  <td className="px-3 py-4 text-center">
                    {team.goalsAgainst}
                  </td>

                  <td className="px-3 py-4 text-center">
                    {team.goalDifference > 0
                      ? `+${team.goalDifference}`
                      : team.goalDifference}
                  </td>

                  <td className="px-4 py-4 text-center font-bold text-slate-900">
                    {team.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}