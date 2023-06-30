import { IoPlay } from 'react-icons/io5'
import { FaStarOfLife } from 'react-icons/fa'
import { useState } from 'react';

export default function Card({  }) {

    const [ isHover, setIsHover ] = useState(false);
    
  return (
    <div className='space-y-2'>
    <div className="relative w-40 h-60 cursor-pointer">
      <img src="../../Interstrellar.jpg" alt="" srcSet="" className={`absolute w-full h-full object-cover rounded-md ${ isHover ? 'opacity-60' : '' }`}/>
      <div className='absolute px-3 py-1 bg-secondaryBtn -top-2 shadow-2xl -right-2 flex border-gray-400 border justify-center space-x-1'>
        <FaStarOfLife size={10} color='#818383' />
        <p className='text-primaryBtn font-semibold text-sm'>8.0</p>
      </div>
      <div 
        className={`w-full h-full absolute flex justify-center items-center rounded-md ease-in duration-200 ${ isHover ? 'hover-bg' : null }`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}  
      >
        { isHover ? <IoPlay size={30} color='#01AED3' /> : null}
      </div>
    </div>
    <div>
      <div className='flex space-x-1'>
        <h1 className="text-text text-lg font-medium">InterStellar</h1>
          <div className='bg-primaryBtn h-fit px-2 py-[1.5px] rounded-sm text-xs font-semibold shadow-2xl'>
            <p>movie</p>
          </div>
      </div>
        <p className='text-primaryBtn font-light text-xs'>june 2 2002</p>
    </div>
  </div>
  )
}
