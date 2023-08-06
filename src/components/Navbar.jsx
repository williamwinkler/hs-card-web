import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Hearthstone Cards Viewer
      </Link>
      <ul>
        <li className="active">
          <Link to="/cards">Cards</Link>
        </li>
      </ul>
    </nav>
  );
}
