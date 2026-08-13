import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createAppTheme, type ThemeMode } from "./theme";

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "erp.theme.mode";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === "dark" || stored === "light") {
      return stored;
    }

    return "light";
  });

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((current) => {
      const next = current === "light" ? "dark" : "light";

      window.localStorage.setItem(STORAGE_KEY, next);

      return next;
    });
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error(
      "useAppTheme must be used inside AppThemeProvider",
    );
  }

  return context;
}