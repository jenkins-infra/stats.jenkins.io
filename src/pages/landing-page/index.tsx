import React from "react";
import jenkinsButler from "../../assets/jenkins-butler.svg";
import NavBar from "../../components/NavBar";
import "./landing-page.css";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

const StatsLink = styled(NavLink)({
  display: "block",
  margin: "0.5rem",
  background: "#939fa1",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  textDecoration: "none",
});

export default function landingPage() {
  return (
    <>
      <NavBar />
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
            <StatsLink to={"/statistics"}>Statistics in Detail</StatsLink>
            <StatsLink to={"/"}>Plugin Installation Trend</StatsLink>
            <StatsLink to="https://www.jenkins.io">
              Plugin Versions by Jenkins Version
            </StatsLink>
            <StatsLink to="https://www.jenkins.io">
              Jenkins Plugin Dependency Graph
            </StatsLink>
          </nav>
        </div>
      </div>
    </>
  );
}
