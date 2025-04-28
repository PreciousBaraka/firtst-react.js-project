import React from "react";

const CustomTextArea = ({
  rows = 3,
  placeholder = "",
  name,
  value = "",
  onChange = () => {},
}) => {
  return (
    <textarea
      rows={rows}
      className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-magenta text-gray-600'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}></textarea>
  );
};

export default CustomTextArea;
