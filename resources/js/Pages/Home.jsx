import AuthLayout from '@/Layouts/AuthLayout'
import { SwiperSlide } from 'swiper/react';
import { IoPlay } from 'react-icons/io5'

import GenerateButton from '@/Components/GenerateButton';
import { shortSentence } from '@/Helper/shortSentence';
import DisplayMovieWithSlide from './HomePartials/DisplayMovieWithSlide';
import BannerSlider from './HomePartials/BannerSlider';
import SwiperAuto from '@/Components/SwiperAuto';

const img = [
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
]

export default function Home({ popularMovie, auth, recently_added }) {

  return (
    <AuthLayout user={auth?.user} isDetail={false}>
      <SwiperAuto>
        {img.map((data, index) => (
          <SwiperSlide key={index} virtualIndex={index} >
            <div
              className={`bg-cover bg-center rounded-sm flex flex-col justify-center sm:px-14 sm:h-[60vh] h-[45vh] shadow-bg w-full`}
              style={{
                backgroundImage: `url(storage/${data})`
              }}
            >
              <div className='text-text mt-20 sm:space-y-2 space-y-1'>
                <h1 className=' font-bold sm:text-2xl text-xl'>Lorem ipsum dolor sit amet.</h1>
                <div className='sm:flex sm:space-x-2 items-center sm:text-sm text-xs'>
                  <span className='rounded-md hidden sm:block px-1 h-fit bg-secondaryAccent text-secondaryBtn font-medium'>HD</span>
                  <span className='mr-1 sm:mr-0'>Duration: n/a</span>
                  <span>Imdb: 8.32</span>
                  <div className='flex space-x-2'>
                    <h1>Genre</h1>
                    <p className='text-secondaryAccent'>Action</p>
                    <p className='text-secondaryAccent'>Romance</p>
                    <p className='text-secondaryAccent'>School</p>
                  </div>
                </div>
                <p className='w-[80%] text-sm font-light text-secondaryAccent'>{shortSentence('Lorem ipsum dolor sit amet consectetur adipisicing elit. A, sint sed voluptates exercitationem quisquam, quasi recusandae minima nemo eligendi eaque corporis facilis autem? Autem, odit.')}</p>
                <GenerateButton className='bg-secondaryAccent hidden sm:flex'>
                  <IoPlay size={20} />
                  watch
                </GenerateButton>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperAuto>
      <div className="space-y-3">
        <DisplayMovieWithSlide title='Popular Movie' datas={popularMovie} />
        <DisplayMovieWithSlide title='Latest Movie' datas={recently_added} />
        <BannerSlider />
      </div>
    </AuthLayout>
  )
}
