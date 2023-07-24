import AuthLayout from '@/Layouts/AuthLayout'
import { SwiperSlide } from 'swiper/react';
import { IoPlay } from 'react-icons/io5'

import GenerateButton from '@/Components/GenerateButton';
import { shortSentence } from '@/Helper/shortSentence';
import DisplayMovieWithSlide from './HomePartials/DisplayMovieWithSlide';
import BannerSlider from './HomePartials/BannerSlider';
import SwiperAuto from '@/Components/SwiperAuto';
import { Head, usePage } from '@inertiajs/react';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

const img = [
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
  '../../Gravity.jpg',
  '../../Moana-Movie-Poster-landscape.jpg',
]

export default function Home({
  popularMovie,
  auth,
  recently_added,
  recomendationMovies
}) {

  const { web_name } = usePage().props
  const [isDetail, setIsDetail] = useState(false);

  return (

    <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail} >
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="Halaman Home adalah pintu gerbang utama bagi pengguna untuk memulai perjalanan mereka di situs kami. Di sini, pengguna akan menemukan beragam film dan acara TV terbaru yang tersedia untuk streaming. Dengan tampilan yang sederhana dan intuitif, pengguna dapat dengan mudah menelusuri koleksi film dan acara TV berdasarkan kategori, popularitas, atau tahun rilis. Selain itu, kami menyediakan rekomendasi khusus berdasarkan preferensi pengguna dan film favorit mereka. Halaman Home adalah tempat yang sempurna untuk memulai petualangan hiburan mereka" />
        <meta property="og:url" content={window.location.url} />
      </Head>
      <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
        <MdMenu size={25} color='#ffffff' />
      </button>
      <SwiperAuto>
        {img.map((data, index) => (
          <SwiperSlide key={index} virtualIndex={index} >
            <div
              className={`bg-cover bg-center rounded-sm flex flex-col justify-center sm:px-14 sm:h-[60vh] h-[40vh] p-2 sm:p-0 shadow-bg w-full`}
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
      <div className="space-y-3 sm:p-0 p-2">
        <DisplayMovieWithSlide title='Recomendations' datas={recomendationMovies} />
        <DisplayMovieWithSlide title='Popular Movie' datas={popularMovie} />
        <BannerSlider />
        <DisplayMovieWithSlide title='Latest Movie' datas={recently_added} />
      </div>
    </AuthLayout>
  )
}
