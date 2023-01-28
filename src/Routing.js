import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Domain from "./pages/Domain";
import { createBrowserRouter } from "react-router-dom";

export const appRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/domains/:name",
    element: <Domain />,
  },
];

export const appRouter = () => createBrowserRouter(appRoutes);
