import {
  DropdownIndicator,
  DropdownStyle,
  MultiValueRemove
} from "@/containers/MultiSelect";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useController, useForm } from "react-hook-form";
import Select from "react-select";
export const FormSelect = forwardRef(
  (
    { options, name, control, isMulti = false, onOptionSelection, ...rest },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      clearSelect() {
        field.onChange("");
      }
    }));
    const { field, fieldState } = useController({
      name,
      control
    });
    const setValue = (val) => {
      if (isMulti) {
        field.onChange(val);
      } else {
        field.onChange(val.value);
      }
    };
    useEffect(() => {
      if (onOptionSelection) {
        onOptionSelection(field.value);
      }
    }, [field.value]);
    return (
      <>
        <Select
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
            MultiValueRemove
          }}
          isMulti={isMulti}
          styles={DropdownStyle}
          options={options}
          onChange={setValue}
          onBlur={field.onBlur}
          value={
            isMulti
              ? field.value
              : options.filter((c) => c.value === field.value && c.value)
          }
          name={field.name}
          {...rest}
        />

        {fieldState.error && (
          <p className="text-red-400 mt-2 p-0 text-14">
            {fieldState?.error?.message}
          </p>
        )}
      </>
    );
  }
);
