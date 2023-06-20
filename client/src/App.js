import "maplibre-gl/dist/maplibre-gl.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./scenes/global/AppRouter";
import { NextUIProvider } from "@nextui-org/react";
import { ColorModeContext, useMode } from "./utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";

function App() {
  const [theme, colorMode] = useMode();

  useEffect(() => {
    document.title = "Local Travel";
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <NextUIProvider>
          <CssBaseline />
          <div className="app">
            <RouterProvider router={appRouter} />
          </div>
        </NextUIProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
