import React from "react";
import "./index.scss";

function Button({ children, ...props }) {
  return (
    <div className="section-button">
      <button className="button" type="button" {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;
