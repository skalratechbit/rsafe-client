export const getDesignTokens = (mode: any) => {
  const muiBreakpoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      custom: 800,
    },
  };

  return {
    typography: {
      fontFamily: "Open Sans",
    },
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#fff" : "#000",
      },
      divider: mode === "light" ? "#ccc" : "#575757",
      background: {
        default: mode === "light" ? "#fff" : "#000",
        paper: mode === "light" ? "#fbbf24" : "#000e21",
        header: mode === "light" ? "#F2F2F2" : "#272727",
        error: "#FF0000",
        button: "#20c1f5",
        filter: mode === "light" ? "#fff" : "#2d2d2d",
        tabelColour: mode === "light" ? "#F2F2F2" : "#2E2E2E",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
        secondary: mode === "light" ? "#27272a" : "#71717a",
      },
    },
    breakpoints: muiBreakpoints,
  };
};
