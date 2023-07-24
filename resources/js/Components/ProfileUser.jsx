import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProfileUser({ user }) {
  return (
    <div className='flex md:space-x-3 space-x-1 items-center'>
      {
        user.avatar ? <LazyLoadImage
          effect='blur'
          src={`/storage/${user?.avatar}`}
          className='h-10 w-10 rounded-full object-cover object-top'
        /> : <FaUserCircle size={35} color='#ffffff' />
        }
      <div className='text-text font-medium opacity-80'>
        <h1>{user?.name}</h1>
        <h4 className='text-sm'>{user?.email}</h4>
      </div>
    </div>
  )
}
