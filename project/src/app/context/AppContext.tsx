import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "ar" | "en";
type Theme = "dark" | "light";

interface AppCtx {
  lang: Lang;
  theme: Theme;
  isDark: boolean;
  isAr: boolean;
  toggleLang: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppCtx>({} as AppCtx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "ar");
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "dark");

  const toggleLang = () => setLang(p => { const n = p === "ar" ? "en" : "ar"; localStorage.setItem("lang", n); return n; });
  const toggleTheme = () => setTheme(p => { const n = p === "dark" ? "light" : "dark"; localStorage.setItem("theme", n); return n; });

  useEffect(() => { document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);

  return (
    <AppContext.Provider value={{ lang, theme, isDark: theme === "dark", isAr: lang === "ar", toggleLang, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
