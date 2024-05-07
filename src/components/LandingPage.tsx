import React from "react";
import jenkinsButler from "../assets/jenkinsButler.svg";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="background">
      <div>
        <a href="https://www.jenkins.io" target="_blank">
          <img src={jenkinsButler} className="logo" alt="Jenkins Butler Logo" />
        </a>
      </div>
    </div>
  );
}
