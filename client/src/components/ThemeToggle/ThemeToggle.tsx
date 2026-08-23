import React from "react";
import { Icons } from "../common/Icon";
import type { Theme } from "../../hooks/useTheme";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="px-2 py-1 rounded-xs border border-[#3b4261] bg-[#1a1b26] hover:bg-[#202330] text-[#7dcfff] text-xs font-mono transition-all active:translate-y-0.5 flex items-center gap-1.5"
      title="Cambiar Modo"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <>
          <Icons.Sun className="w-3.5 h-3.5 text-[#e0af68]" />
          <span className="hidden sm:inline">THEME:DARK</span>
        </>
      ) : (
        <>
          <Icons.Moon className="w-3.5 h-3.5 text-[#7aa2f7]" />
          <span className="hidden sm:inline">THEME:LIGHT</span>
        </>
      )}
    </button>
  );
};