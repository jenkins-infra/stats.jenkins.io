import React from "react";
import "./NavBar.css";
import { FaGithub } from "react-icons/fa"; // Importing the GitHub icon

export default function NavBar() {
  return (
    <div className="bar">
      <div className="name">Jenkins</div>
      <div className="fork">
        Fork Me on GitHub
        <FaGithub style={{ marginLeft: "8px", verticalAlign: "middle" }} />{" "}
        {/* GitHub Icon */}
      </div>
    </div>
  );
}
