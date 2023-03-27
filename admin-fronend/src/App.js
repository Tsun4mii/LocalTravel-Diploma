import { ColorModeContext, useMode } from "./utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./scenes/global/Root";
import Index from "./scenes/dashboard";
import Signin from "./scenes/signin/Signin";
import Signup from "./scenes/signup/Signup";
import ProtectedRoute from "./scenes/global/ProtectedRoute";
import Points from "./scenes/points/Points";
import EditPoint from "./scenes/points/EditPoint";
import CreatePoint from "./scenes/points/CreatePoint";
import { useEffect } from "react";
import Invites from "./scenes/invites/Invites";
import Routes from "./scenes/routes/Routes";
import EditRoute from "./scenes/routes/EditRoute";
import CreateRoute from "./scenes/routes/CreateRoute";

function App() {
  const [theme, colorMode] = useMode();

  useEffect(() => {
    document.title = "LT Admin";
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Index />} />
          <Route path="/points" element={<ProtectedRoute />}>
            <Route index element={<Points />} />
            <Route path="/points/edit/:id" element={<EditPoint />} />
            <Route path="/points/create" element={<CreatePoint />} />
          </Route>
          <Route path="/invites" element={<ProtectedRoute />}>
            <Route index element={<Invites />} />
          </Route>
          <Route path="/routes" element={<ProtectedRoute />}>
            <Route index element={<Routes />} />
            <Route path="/routes/edit/:id" element={<EditRoute />} />
            <Route path="/routes/create" element={<CreateRoute />} />
          </Route>
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </>
    )
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
