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
import CreateInvite from "./scenes/invites/CreateInvite";
import Categories from "./scenes/categories/Categories";
import EditCategory from "./scenes/categories/EditCategory";
import CreateCategory from "./scenes/categories/CreateCategory";
import Countries from "./scenes/countries/Countries";
import EditCountry from "./scenes/countries/EditCountry";
import CreateCountry from "./scenes/countries/CreateCountry";
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
            <Route path="/invites/create" element={<CreateInvite />} />
          </Route>
          <Route path="/routes" element={<ProtectedRoute />}>
            <Route index element={<Routes />} />
            <Route path="/routes/edit/:id" element={<EditRoute />} />
            <Route path="/routes/create" element={<CreateRoute />} />
          </Route>
          <Route path="/categories" element={<ProtectedRoute />}>
            <Route index element={<Categories />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/categories/create" element={<CreateCategory />} />
          </Route>
          <Route path="/countries" element={<ProtectedRoute />}>
            <Route index element={<Countries />} />
            <Route path="/countries/edit/:id" element={<EditCountry />} />
            <Route path="/countries/create" element={<CreateCountry />} />
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
