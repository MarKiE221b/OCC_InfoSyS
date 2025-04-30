import React from 'react'

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <span className="loading loading-spinner text-white text-4xl"></span>
    </div>
  )
}

export default Spinner