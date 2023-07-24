import { IoPlay } from 'react-icons/io5'
import { FaStarOfLife } from 'react-icons/fa'
import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const base = '12'

export default function Card({ item }) {
  
  const { auth } = usePage().props
  const [isHover, setIsHover] = useState(false);
  const [data, setData] = useState({
    user_id: auth.user?.id,
    post_id: item.id
  })
  const vote = parseFloat(item.vote_average)
  const voteFix = vote.toFixed(1)
  const date = new Date(item.release_date);
  const formattedDate = date.toLocaleDateString("en-US");

  const handleCard = async () => {
    router.visit(route('post.show', item.slug))
    if (auth.user) {
      try {
        const response = await axios.post(route('history.store', data))
      } catch (error) {
        console.log(error);
      }

    }
  }
  return (
    <div className='space-y-2'>
      <button onClick={() => handleCard()}>
        <div className="relative sm:w-40 sm:h-60 w-32 h-44 cursor-pointer">
          <LazyLoadImage
            alt={item.poster_path}
            src={`/storage/${item.poster_path}`}
            className={`absolute w-full h-full object-cover rounded-md ${isHover ? 'opacity-60' : ''}`}
          />
          <div className='absolute px-3 py-1 bg-secondaryBtn -top-0 shadow-2xl -right-2 flex justify-center space-x-1'>
            <FaStarOfLife size={10} color='#818383' />
            <p className='text-primaryBtn font-semibold text-sm'>{voteFix}</p>
          </div>
          <div
            className={`w-full h-full absolute flex justify-center items-center rounded-md ease-in duration-200 ${isHover ? 'hover-bg' : null}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover ? <IoPlay size={30} color='#01AED3' /> : null}
          </div>
        </div>
        <div>
          <div className='flex space-x-1 text-start'>
            <h1 className="text-text text-base font-medium">{item?.title.substring(0, 20) + '...'}</h1>
          </div>
          <p className='text-primaryBtn font-light text-xs text-start'>{formattedDate}</p>
        </div>
      </button>
    </div>
  )
}
