import React from "react";

export const Loader = ({ fullScreen = false, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center  ${className && className} ${
        fullScreen ? "h-screen" : ""
      }`}
    >
      <div className="lds-ellipsis">
        <div></div> <div></div> <div></div>
        <div></div>
      </div>
    </div>
  );
};
