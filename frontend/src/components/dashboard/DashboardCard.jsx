import React from 'react'
import {useNavigate} from 'react-router-dom'

const DashboardCard = ({iconClass, title, description, url}) => {
    const navigate = useNavigate();
  return (
    <button
      className='bg-white shadow-sm rounded-md flex space-x-4 p-2 focus:ring-2 focus:ring-magenta'
      onClick={() => navigate(url)}>
      <div className='text-gray-600 flex items-center'>{iconClass()}</div>
      <div className='flex flex-col space-y-2'>
        <h6 className='text-cement-200 text-sm'>{title}</h6>
        <h4 className='text-2xl text-cement-200'>{description}</h4>
      </div>
    </button>
  );
}

export default DashboardCard