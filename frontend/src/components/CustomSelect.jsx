import React from 'react'

const CustomSelect = ({defaultValue="", selectLabel="", options=[], onChange=() => {}}) => {
  return (
    <select
      defaultValue={defaultValue}
      onChange={onChange}
      className='w-[250px] select focus:outline-magenta'>
      <option value=''>{selectLabel}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default CustomSelect