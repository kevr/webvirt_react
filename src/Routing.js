import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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
];

export const appRouter = () => createBrowserRouter(appRoutes);
