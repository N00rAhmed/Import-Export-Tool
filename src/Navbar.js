import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>Datamorph</h1>
      </div>
      <ul className="nav-links">
        {/* <li><Link to="/">Home</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
