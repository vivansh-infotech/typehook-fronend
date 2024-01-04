import React, { useEffect, useRef, useState } from "react";

export const Dropdown = ({ content, children, contentClass, className }) => {
  const toggler = useRef();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const getOutSideClick = function (e) {
      if (toggler.current && !toggler.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", getOutSideClick);
    return () => {
      document.removeEventListener("mousedown", getOutSideClick);
    };
  }, []);

  return (
    <div
      ref={toggler}
      className={`relative  ${dropdown && "dropdown-active"}`}
      onClick={() => setDropdown(!dropdown)}
    >
      <div className="">{children}</div>
      {dropdown && (
        <div
          className={`${className && className} ${
            (contentClass && contentClass,
            "absolute top-14 right-0 left-0 z-10")
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
