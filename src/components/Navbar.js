import React from "react";

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Hearthstone Cards Viewer
      </a>
      <ul>
        <li className="active">
          <a href="/cards">Cards</a>
        </li>
        <li className="active">
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
