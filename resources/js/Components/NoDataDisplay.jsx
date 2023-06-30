import React from 'react'

export default function NoDataDisplay({ message }) {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-gray-300 font-medium text-lg'>{ message }</h1>
    </div>
  )
}
