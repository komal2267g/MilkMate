import React from "react";
import { Link } from "react-router-dom";

const FeaturesPage = () => (
  <div>
    <nav><Link to="/">Home</Link></nav>
    <h1>Features</h1>
    <ul>
      <li>Milk Entry</li>
      <li>Customer Management</li>
      <li>Payments & Statements</li>
    </ul>
  </div>
);

export default FeaturesPage;
