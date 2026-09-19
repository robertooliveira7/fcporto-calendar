import type { CompetitionStage } from "@/types/competition";

type CompetitionStageProgressProps = {
  stages: CompetitionStage[];
};

export function CompetitionStageProgress({
  stages,
}: CompetitionStageProgressProps) {
  if (stages.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Ainda não existem fases definidas.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {stages.map((stage) => {
        const formattedDate = stage.date
          ? new Intl.DateTimeFormat("pt-PT", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(stage.date))
          : "Data por definir";

        return (
          <div
            key={stage.round}
            className="border-b border-slate-100 px-6 py-4 last:border-b-0"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              {stage.round}
            </p>

            <div className="mt-2 flex items-center justify-between gap-6">
              <p className="font-semibold text-slate-900">
                {stage.opponent ?? "Adversário por definir"}
              </p>

              <p className="shrink-0 text-sm text-slate-500">
                {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}