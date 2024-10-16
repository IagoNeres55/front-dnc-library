import React from "react";
import "./index.scss";

function Button({ children, color, ...props }) {
  return (
    <div className="section-button">
      <button
        className="button"
        type="button"
        style={{ backgroundColor: color }}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
