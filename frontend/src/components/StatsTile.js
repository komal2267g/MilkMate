import React from "react";

const StatsTile = ({ title, value }) => {
  return (
    <div className="stats-tile">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsTile;
