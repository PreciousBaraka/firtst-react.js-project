import React from "react";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import CustomSelect from "./CustomSelect";

const CustomFormItem = ({
  label,
  name,
  rows = 2,
  type = "text",
  placeholder = "",
  value = "",
  options = [],
  onChange = () => {},
  className = "",
}) => {
  return (
    <div className={`mb-3 flex flex-col space-y-1 ${className}`}>
      <label htmlFor={name} className='text-gray-700'>
        {label}
      </label>
      {type === "textarea" ? (
        <CustomTextArea
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === "select" ? (
        <CustomSelect
          defaultValue={value}
          onChange={onChange}
          selectLabel={placeholder}
          options={options}
        />
      ) : (
        <CustomInput
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CustomFormItem;
