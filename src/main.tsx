import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import LandingPage from "./components/LandingPage.tsx";
import NavBar from "./components/NavBar.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <NavBar />
    <LandingPage />
  </React.StrictMode>
);
