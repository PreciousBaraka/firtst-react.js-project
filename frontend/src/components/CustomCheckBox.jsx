import React from "react";

const CustomCheckBox = ({
  label,
  checked,
  onChange = () => {},
  name = "",
  id,
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-2 my-2 ${className}`}>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className='h-4 w-4 rounded-md accent-pink-500/25 text-white'
      />
      {label && (
        <label htmlFor={id} className='text-md text-gray-600'>
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomCheckBox;
