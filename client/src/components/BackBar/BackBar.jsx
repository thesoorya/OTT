import React from "react";
import { Link } from "react-router-dom";
import './BackBar.css'

const BackBar = () => {
  return (
    <div className="backbar">
      <div className="logo">
        <Link to="/">wizard</Link>
      </div>
    </div>
  );
};

export default BackBar;
