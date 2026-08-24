import type { ValidationResult } from "../../domain/logic/types";
import { useLanguage } from "../../i18n/useLanguage";
import { Icons } from "../common/Icon";
import React from "react";

interface Props {
  validation: ValidationResult;
}

export const GuidanceMessage: React.FC<Props> = ({ validation }) => {
  const { t } = useLanguage();

  const resolvedGuidanceMessage = validation.guidanceMessageKey
    ? t(validation.guidanceMessageKey)
    : validation.guidanceMessage;

  return (
    <div className="p-2.5 rounded-sm border bg-amber-50 border-amber-200 text-amber-800 dark:bg-[#1a1b26] dark:border-[#e0af68]/40 dark:text-[#e0af68] flex items-start gap-2.5 text-xs shadow-xs">
      <Icons.HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <p className="leading-relaxed wrap-break-word min-w-0">
        <span className="font-bold uppercase">[{t("guideLabel")}]:</span>{" "}
        {resolvedGuidanceMessage}
      </p>
    </div>
  );
};
