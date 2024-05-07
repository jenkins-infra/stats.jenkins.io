import React from "react";
import jenkinsButler from "../assets/jenkinsButler.svg";
import "./LandingPage.css";

interface StatsLinkProps {
  url: string;
  children: React.ReactNode; // This type is suitable for any valid React child, including strings, elements, and fragments.
}

const StatsLink: React.FC<StatsLinkProps> = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="stats-link"
  >
    {children}
  </a>
);

export default function LandingPage() {
  return (
    <div className="background">
      <a
        href="https://www.jenkins.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={jenkinsButler} className="logo" alt="Jenkins Butler Logo" />
      </a>
      <div className="landing-text">
        <h1 className="landing-text-1">Jenkins Infra-Statistics</h1>
        <p className="landing-text-2">
          Graphical representation of numbers and information around Jenkins
        </p>
        <nav className="stats">
          <StatsLink url="https://www.jenkins.io">
            Statistics in Detail
          </StatsLink>
          <StatsLink url="https://www.jenkins.io">
            Plugin Installation Trend
          </StatsLink>
          <StatsLink url="https://www.jenkins.io">
            Plugin Versions by Jenkins Version
          </StatsLink>
          <StatsLink url="https://www.jenkins.io">
            Jenkins Plugin Dependency Graph
          </StatsLink>
        </nav>
      </div>
    </div>
  );
}
