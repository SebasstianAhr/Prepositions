import React from "react";
import type { TruthTableData } from "../../domain/logic/types";

interface Props {
  data: TruthTableData;
}

export const TruthTableGrid: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl touch-pan-x">
      <table className="w-full min-w-max text-center border-collapse">
        <thead>
          <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80">
            {data.columns.map((col, i) => (
              <th
                key={i}
                className={`p-3.5 font-mono text-sm sm:text-base font-bold whitespace-nowrap min-w-[3.5rem] ${
                  col.isMainResult
                    ? "text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/40 border-x-2 border-cyan-400 dark:border-cyan-500/50"
                    : "text-slate-800 dark:text-slate-200"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-200 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              {data.columns.map((col, colIndex) => {
                const val = col.values[rowIndex];
                return (
                  <td
                    key={colIndex}
                    className={`p-3 font-mono font-bold text-sm sm:text-base whitespace-nowrap ${
                      col.isMainResult
                        ? "bg-cyan-50/50 dark:bg-cyan-950/20 border-x-2 border-cyan-300 dark:border-cyan-500/30"
                        : ""
                    } ${val ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {val ? "V" : "F"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};