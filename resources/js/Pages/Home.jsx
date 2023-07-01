import React, { useState } from 'react'
import AuthLayout from '@/Layouts/AuthLayout'
import axios from 'axios';
import { Link } from '@inertiajs/react';
import useHook from '@/hooks/useHook';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoPlay } from 'react-icons/io5'
import { FaStarOfLife } from 'react-icons/fa'

import 'swiper/css';
import 'swiper/css/virtual';
import { Autoplay, Navigation, Pagination, Virtual, } from 'swiper';
import GenerateButton from '@/Components/GenerateButton';
import { shortSentence } from '@/Helper/shortSentence';
import Card from '@/Components/Card';

const img = [
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
]

const breakpoints = {
  240: {
    slidesPerView: 2,
    spaceBetween: 80,
  },
  300: {
    slidesPerView: 3,
    spaceBetween: 120
  },
  330: {
    slidesPerView: 3,
    spaceBetween: 90
  },
  400: {
    slidesPerView: 3,
    spaceBetween: 75
  },
  480: {
    slidesPerView: 4,
    spaceBetween: 100
  },
  620:{
    slidesPerView: 3,
    spaceBetween: 30
  },
  738:{
    slidesPerView: 4,
    spaceBetween: 100
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 20
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 10
  },
  1280: {
    slidesPerView: 6,
    spaceBetween: 10
  },
};

export default function Home({ datas, auth }) {

  const { setHistory } = useHook();
  
  const [ dataHistory, setDataHistory ] = useState({
    post_id: '',
    user_id: auth.user?.id,
});

const useHistory = async (post_id) => {
    if(auth.user){
        setDataHistory(prev => prev.post_id = post_id);
        setHistory(dataHistory);
    }
}

console.log(datas);
  
  return (
    <AuthLayout user={auth?.user} isDetail={false}>
    <Swiper 
      modules={[Virtual, Autoplay]} 
      spaceBetween={50} 
      slidesPerView={1}
      centeredSlides={true}
      autoplay= {{ 
        delay: 2500,
        disableOnInteraction: false,
       }} 
      loop={true}
      virtual
      >
      {img.map((img, index) => (
        <SwiperSlide key={index} virtualIndex={index} >
            <div 
              className='w-full sm:h-[60vh] h-[45vh] bg-cover shadow-bg rounded-sm flex flex-col justify-center sm:px-14 px-3' 
              style={{ 
                backgroundImage: `url(${img})`
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
                  <IoPlay size={20}/>
                  watch
                </GenerateButton>
              </div>
             </div>
        </SwiperSlide>
      ))}
    </Swiper>
      <div className='p-2'>
        <h1 className='text-primaryBtn text-2xl font-semibold py-3'>Popular Movie</h1>
        <Swiper 
          navigation={true}
          breakpoints={breakpoints}
        >
          {datas.map((item, index) => (
            <SwiperSlide key={index}>
              <Card item={item}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </AuthLayout>
  )
}
