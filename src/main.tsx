import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./pages/landing-page/index.tsx";
import Statistics from "./pages/statistics/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
