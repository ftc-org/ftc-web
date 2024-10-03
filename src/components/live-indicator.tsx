import React from "react";

export const LiveIndicator = ({
  label = "Live Updates",
}: {
  label?: string;
}) => {
  return (
    <div className='inline-flex gap-1 items-center bg-white rounded-full py-1 border-gray-300'>
      <div className='relative'>
        <div className='w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center'>
          <div className='w-2 h-2 bg-red-600 rounded-full animate-pulse duration-100'></div>
        </div>
      </div>
      <span className='text-red-600 font-semibold text-sm uppercase'>
        {label}
      </span>
    </div>
  );
};
