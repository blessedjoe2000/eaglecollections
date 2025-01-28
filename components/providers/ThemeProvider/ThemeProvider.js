"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    const savedMode = localStorage.getItem("colorMode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          dividerBackground: mode === "light" ? "#000" : "#EEEEEE",
          link: {
            default: mode === "light" ? "#000" : "#fff",
            // hover: mode === "light" ? "#006BFF" : "#FEF602",
          },
          primary: {
            main: "#fff",
            light: "#F5F5F5",
          },
          secondary: {
            main: "#01579B",
            light: "#E3F2FD",
          },
          text: {
            primary: mode === "light" ? "#000" : "#fff",
            secondary: mode === "light" ? "#000" : "#E0E0E0",
          },
          background: {
            default: mode === "light" ? "#F5F5F5" : "#021526",
            paper: mode === "light" ? "#FFFFFF" : "#000",
          },
        },
        components: {
          MuiDivider: {
            defaultProps: {
              disableRipple: true,
            },
            styleOverrides: {
              root: {
                backgroundColor: mode === "light" ? "#E0E0E0" : "#4A4A4A",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                color: "#006BFF",
                // backgroundColor: "#01579B",
                "&:hover": {
                  //   backgroundColor: "#006BFF",
                },
              },
            },
          },
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
