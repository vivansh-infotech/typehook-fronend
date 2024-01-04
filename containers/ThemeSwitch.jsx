import { IconDarkMode, IconLightMode } from "@/components/icon";
import { useTheme } from "next-themes";
import React from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme, forcedTheme } = useTheme();
  const changeTheme = (e) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className="ml-auto w-[45px] h-[23px]">
      {forcedTheme ? (
        <></>
      ) : (
        <label className="switch">
          <input
            type="checkbox"
            onChange={changeTheme}
            checked={theme === "dark" ? false : true}
          />
          <div className="switch-track">
            <div className="toggle-icon">
              <span className="switch-icon">
                <IconDarkMode className="w-3 h-3 text-gray-300" />
              </span>
              <span className="switch-icon">
                <IconLightMode className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};
