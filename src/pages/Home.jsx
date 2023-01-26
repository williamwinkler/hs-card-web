import React from "react";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Find Hearthstone cards on the link below</p>

      <Link to="/cards">Cards</Link>
    </div>
  );
}
