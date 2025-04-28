import React from "react";

const CustomInput = ({
  type = "text",
  placeholder = "",
  name,
  value = "",
  onChange = () => {},
}) => {
  return (
    <input
      type={type}
      className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-blue-500 text-gray-600'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
