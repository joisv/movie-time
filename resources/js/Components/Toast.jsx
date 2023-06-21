import React from 'react'

export default function Toast({ children, onClose, open }) {
    if(!open) return null
  return (
    <div className='bg-transparent bg-opacity-50 fixed top-0 w-full h-screen px-10 py-5 ' onClick={onClose}>
        <div className='bg-blue-600 h-fit rounded-sm w-fit p-2 flex flex-col justify-center items-center' onClick={(e) => {
            e.stopPropagation()
        }}>
             <h3 className='text-white'>
                {children}
            </h3>
        </div>
    </div>
  )
}
