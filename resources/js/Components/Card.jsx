import { IoPlay } from 'react-icons/io5'
import { FaStarOfLife } from 'react-icons/fa'
import { useState } from 'react';
import { Link } from '@inertiajs/react';

const base = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'

export default function Card({ item }) {

    const [ isHover, setIsHover ] = useState(false);
    const vote = parseFloat(item.vote_average)
    const voteFix = vote.toFixed(1) 
    const date = new Date(item.release_date);
    const formattedDate = date.toLocaleDateString("en-US");
  return (
    <div className='space-y-2'>
      <Link href={route('post.show', item.imdb_id)}>
        <div className="relative sm:w-40 sm:h-60 w-32 h-44 cursor-pointer">
          <img src={base+item.poster_path} alt="" srcSet="" className={`absolute w-full h-full object-cover rounded-md ${ isHover ? 'opacity-60' : '' }`}/>
          <div className='absolute px-3 py-1 bg-secondaryBtn -top-0 shadow-2xl -right-2 flex justify-center space-x-1'>
            <FaStarOfLife size={10} color='#818383' />
            <p className='text-primaryBtn font-semibold text-sm'>{voteFix}</p>
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
            <h1 className="text-text text-base font-medium">{ item?.title.substring(0, 20) + '...' }</h1>
          </div>
            <p className='text-primaryBtn font-light text-xs'>{formattedDate}</p>
        </div>
      </Link>
    </div>
  )
}
