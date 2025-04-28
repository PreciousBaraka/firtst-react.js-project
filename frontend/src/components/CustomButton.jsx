import React from 'react'

const CustomButton = ({title,className,onClick, type="button"}) => {
  return (
    <button type={type} onClick={onClick}  className={`my-2 bg-blue-700 text-white py-2 w-full rounded-md font-semibold cursor-pointer ${className}`}>{title}</button>
  )
}

export default CustomButton