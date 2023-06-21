import React from 'react'

export default function CustomModal({ children, open, onClose }) {

    if(!open) return null
    
  return (
    <div className='bg-slate-600 bg-opacity-50 fixed top-0 w-full h-screen p-10 flex justify-center items-center' onClick={onClose}>
        <div className='bg-blue-600 h-fit rounded-sm w-fit p-10 flex flex-col justify-center items-center' onClick={(e) => {
            e.stopPropagation()
        }}>
            { children }
        </div>
    </div>
  )
}
