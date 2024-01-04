import { IconClose, IconDownSharpArrow } from "@/components/icon";
import { components } from "react-select";
export const DropdownStyle = {
  control: (base, state) => ({
    ...base,
    color: "#FFFFFF",
    fontFamily: "SF Pro Display",
    background: "#28292a",
    minHeight: "48px",
    padding: "0px 22px",
    fontSize: "14px",
    borderRadius: "10px",
    borderColor: state.isFocused ? "#28292a" : "#28292a",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#28292a" : "#28292a",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    background: "#28292a",
    fontFamily: "SF Pro Display",
    fontSize: "14px",
    color: "#FFFFFF",
    borderRadius: 6,
    marginTop: 0,
  }),
  // menuList: (base) => ({
  //   ...base,
  //   background: "#FFFFFF",
  //   padding: 0,
  // }),
  option: (base, state) => ({
    ...base,
    color: "#FFFFFF",

    backgroundColor: " #28292a",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#28292a", color: "white" },
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: "14px",
    color: "#FFFFFF",
    // specify a fallback color here for those values not accounted for in the styleMap
  }),
  input: (base) => ({
    ...base,
    color: "#FFFFFF",
    fontSize: "14px",
  }),
};
export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconDownSharpArrow className="relative right-0" />
    </components.DropdownIndicator>
  );
};
export const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <IconClose className="w-3 h-3" />
    </components.MultiValueRemove>
  );
};
