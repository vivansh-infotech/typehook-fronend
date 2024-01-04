import React, { useRef, useState } from "react";

export const DynamicTextArea = ({ inputData, register, errors }) => {
  const { title, slug, placeholder } = inputData;
  const maxLength = 4001;
  const [characterLength, setCharacterLength] = useState(0);

  return (
    <div className="mb-9">
      <label htmlFor="" className="text-14 font-700">
        {title}
      </label>
      <div className="mt-4">
        <textarea
          maxLength={maxLength}
          onKeyUp={(e) => setCharacterLength(e.target.value.length)}
          name={slug}
          {...register(slug)}
          className="webkit-appearance-none h-[128px] !text-[11px]  dark:text-gray text-gray-300  placeholder:text-gray dark:placeholder:text-gray-300 placeholder:!text-[11px]  after: bg-white/[0.03] w-full shadow-c4 relative z-10 outline-none rounded-[10px] px-8 py-4"
          type="text"
          placeholder={placeholder}
        ></textarea>
      </div>
      <div className="flex justify-between">
        <p className="text-red-400 mt-2 p-0 text-14">
          {errors[slug] && errors[slug].message}
        </p>
        <p className="text-10 font-500 text-gray-500 text-right mt-3">
          {characterLength}/4000
        </p>
      </div>
    </div>
  );
};
