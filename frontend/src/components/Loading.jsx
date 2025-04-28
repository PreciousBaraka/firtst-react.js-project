import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center my-2">
          <span className='loading loading-spinner text-magenta'></span>
        </div>
      )}
    </>
  );
};

export default Loading;
