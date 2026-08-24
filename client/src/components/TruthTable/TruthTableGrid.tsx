import type { TruthTableData } from "../../domain/logic/types";
import React from "react";

interface Props {
  data: TruthTableData;
}

export const TruthTableGrid: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto border border-slate-300 dark:border-[#27293a] bg-slate-50 dark:bg-[#13141c] rounded-xs touch-pan-x shadow-xs">
      <table className="w-full min-w-max text-center border-collapse font-mono text-sm sm:text-base">
        <thead>
          <tr className="border-b border-slate-300 dark:border-[#27293a] bg-slate-200/60 dark:bg-[#1a1b26]">
            {data.columns.map((col, i) => (
              <th
                key={i}
                className={`p-2.5 sm:p-3 font-bold whitespace-nowrap min-w-12 ${
                  col.isMainResult
                    ? "text-cyan-700 bg-cyan-100/50 border-x border-cyan-300 dark:text-[#7dcfff] dark:bg-[#7dcfff]/10 dark:border-[#7dcfff]/40"
                    : "text-slate-700 dark:text-[#a9b1d6]"
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
              className="border-b border-slate-200 dark:border-[#1c1d2b] hover:bg-slate-100 dark:hover:bg-[#1a1b26]/60 transition-colors"
            >
              {data.columns.map((col, colIndex) => {
                const val = col.values[rowIndex];
                return (
                  <td
                    key={colIndex}
                    className={`p-2.5 sm:p-3 font-bold whitespace-nowrap ${
                      col.isMainResult
                        ? "bg-cyan-50/50 border-x border-cyan-200 dark:bg-[#7dcfff]/5 dark:border-[#7dcfff]/20"
                        : ""
                    } ${val ? "text-emerald-600 dark:text-[#9ece6a]" : "text-rose-600 dark:text-[#f7768e]"}`}
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
