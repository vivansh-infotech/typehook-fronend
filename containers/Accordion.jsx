import { useEffect, useRef, useState } from "react";
const Accordion = ({
  accordion_content,
  accordion_heading,
  className = "",
  isActive,
  name,
}) => {
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();
  const handleToggle = () => {
    setClicked(!clicked);
  };
  useEffect(() => {
    if (!!isActive) {
      if (isActive === name) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    }
  }, [isActive]);

  return (
    <div id="" className={`${clicked ? "active" : ""} ${className}`}>
      <div
        className="flex justify-between h-full items-center cursor-pointer"
        onClick={handleToggle}
      >
        {accordion_heading}
      </div>
      <div
        ref={contentEl}
        className={`answer_wrapper`}
        style={
          clicked
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="answer">{accordion_content}</div>
      </div>
    </div>
  );
};

export default Accordion;
