import App from "./App";
import { createBrowserRouter } from "react-router-dom";

export const appRoutes = [
  {
    path: "/",
    element: <App />,
  }
];

export const appRouter = () => createBrowserRouter(appRoutes);
