import type {
  TruthTableData,
  ValidationResult,
} from "../../domain/logic/types";
import { TruthTableGrid } from "./TruthTableGrid";
import { useLanguage } from "../../i18n/useLanguage";
import { Icons } from "../common/Icon";
import React from "react";

interface Props {
  validation: ValidationResult;
  truthTable: TruthTableData | null;
  onGenerateTable: () => void;
}

export const TruthTableSection: React.FC<Props> = ({
  validation,
  truthTable,
  onGenerateTable,
}) => {
  const { t } = useLanguage();

  return (
    <>
      <button
        disabled={!validation.isValid}
        onClick={onGenerateTable}
        className="w-full py-2.5 px-3 rounded-xs border font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-500 dark:bg-[#202330] dark:border-[#9ece6a] dark:text-[#9ece6a] dark:hover:bg-[#9ece6a]/20 disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 flex items-center justify-center gap-2 shadow-xs"
      >
        <Icons.Table className="w-4 h-4 shrink-0" />
        <span>{t("execute")}</span>
      </button>

      {truthTable && (
        <section className="relative p-3 pt-4 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#7aa2f7]/40 mt-2 shadow-xs">
          <span className="absolute -top-2.5 left-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xs border bg-white text-blue-700 border-blue-300 dark:bg-[#1a1b26] dark:text-[#7aa2f7] dark:border-[#7aa2f7]/30 z-10">
            {t("outputSection")}
          </span>

          <div className="w-full overflow-x-auto">
            <TruthTableGrid data={truthTable} />
          </div>
        </section>
      )}
    </>
  );
};
