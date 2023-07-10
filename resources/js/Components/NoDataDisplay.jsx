import React from 'react'

export default function NoDataDisplay({ children }) {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        { children }
    </div>
  )
}
