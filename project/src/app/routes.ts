import { createBrowserRouter } from "react-router";
import Home from "./Home";
import AllWorks from "./components/AllWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/works",
    Component: AllWorks,
  },
]);
