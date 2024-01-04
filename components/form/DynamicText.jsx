import React from "react";

export const DynamicText = ({ inputData, register, errors }) => {
  const { title, slug, placeholder } = inputData;
  return (
    <div className="mb-9">
      <label htmlFor="" className="text-14 font-700">
        {title}
      </label>
      <div className="mt-4">
        <input
          {...register(slug)}
          id=""
          className="webkit-appearance-none h-[42px] !text-[11px] dark:text-gray text-gray-300 placeholder:!text-[11px] placeholder:text-gray dark:placeholder:text-gray-300 bg-white/[0.03] w-full shadow-c4 relative z-10 outline-none rounded-[10px] px-8 py-4 "
          type="text"
          placeholder={placeholder}
        />
      </div>
      {errors[slug] && (
        <p className="text-red-400 mt-2 p-0 text-14">{errors[slug].message}</p>
      )}
    </div>
  );
};
