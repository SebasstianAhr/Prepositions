export const terminalStyles = {
  // Principal Container
  shell:
    "bg-[#16161e] text-[#a9b1d6] font-mono min-h-screen p-2 sm:p-4 selection:bg-[#3d59a1]",
  panel:
    "bg-[#1a1b26] border border-[#38bdf8]/40 rounded-sm p-3 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]",
  panelTitle:
    "absolute -top-3 left-3 bg-[#1a1b26] px-2 text-xs font-bold text-[#38bdf8] uppercase tracking-wider border border-[#38bdf8]/30 rounded-xs",

  // Interactive Buttons
  buttonBase:
    "font-mono font-bold text-xs sm:text-sm transition-all border rounded-sm flex items-center justify-center active:translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none",
  buttonPrimary:
    "bg-[#202330] hover:bg-[#2ac3de]/20 border-[#2ac3de]/60 text-[#2ac3de] shadow-[0_0_8px_rgba(42,195,222,0.15)]",
  buttonDanger:
    "bg-[#202330] hover:bg-[#f7768e]/20 border-[#f7768e]/60 text-[#f7768e]",
  buttonWarning:
    "bg-[#202330] hover:bg-[#e0af68]/20 border-[#e0af68]/60 text-[#e0af68]",

  // Status Indicators
  badgeSuccess:
    "text-[#9ece6a] bg-[#9ece6a]/10 border border-[#9ece6a]/30 px-2 py-0.5 rounded-xs text-xs",
  badgeError:
    "text-[#f7768e] bg-[#f7768e]/10 border border-[#f7768e]/30 px-2 py-0.5 rounded-xs text-xs",

  // typography
  heading: "text-[#7aa2f7] font-extrabold tracking-wide uppercase",
  textMuted: "text-[#565f89]",
  textAccent: "text-[#bb9af7]",

  // lower elements
  statusBar:
    "w-full bg-slate-200 border border-slate-300 text-slate-600 dark:bg-[#13141c] dark:border-[#27293a] dark:text-[#565f89] px-3 py-1.5 rounded-xs flex justify-between items-center text-[10px] font-mono shadow-xs select-none",
  footer:
    "w-full mt-2 pt-3 border-t border-slate-300 dark:border-[#27293a] flex flex-col gap-2 font-mono text-xs text-slate-600 dark:text-[#565f89]",
};
