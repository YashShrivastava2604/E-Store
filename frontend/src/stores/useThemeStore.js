import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: (localStorage.getItem("theme") || "light"),
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return { theme: next };
    }),
}));
