import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Index from "../index/Index";
import Profile from "../profile/Profile";
import PublicProfile from "../profile/PublicProfile";
import CreateRoute from "../route/CreateRoute";
import RouteId from "../route/RouteId";
import Search from "../search/Search";
import Signin from "../signin/Signin";
import Signup from "../signup/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Root from "./Root";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Index />} />
        <Route path="/route/:id" element={<RouteId />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/user/:id" element={<PublicProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/route/create" element={<ProtectedRoute />}>
          <Route index element={<CreateRoute />} />
        </Route>
      </Route>
    </>
  )
);
