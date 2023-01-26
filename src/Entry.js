/* Copyright 2023 Kevin Morris <kevr@0cost.org */
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./Routing";

const Entry = () => {
  const router = appRouter();
  return <RouterProvider router={router} />;
};

export default Entry;
