import { terminalStyles } from "../../styles/terminalTheme";
import { useLanguage } from "../../i18n/useLanguage";
import React from "react";

export const StatusBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className={terminalStyles.statusBar}>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#9ece6a] inline-block" />
        <span>{t("statusReady")}</span>
      </div>
      <div className="flex items-center gap-3">
        <span>{t("memOptimal")}</span>
        <span className="opacity-40">|</span>
        <span>{t("encodingLabel")}</span>
      </div>
    </div>
  );
};
