import React from 'react'

export default function CustomModal({ children, open, onClose }) {

    if(!open) return null
    
  return (
    <div className='backdrop-blur-sm fixed top-0 w-full h-screen p-10 flex justify-center' onClick={onClose}>
        <div className='h-fit rounded-sm w-fit sm:p-10 flex flex-col justify-center items-center' onClick={(e) => {
            e.stopPropagation()
        }}>
            { children }
        </div>
    </div>
  )
}
