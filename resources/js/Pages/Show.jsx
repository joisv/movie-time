import { Head, router, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { IoPlay } from 'react-icons/io5'
import { IoBookmarkOutline } from "react-icons/io5";
import { MdNoAdultContent, MdMenu } from 'react-icons/md'

import AuthLayout from '@/Layouts/AuthLayout';
import useHooks from '@/hooks/useHooks';
import { ImSpinner8 } from 'react-icons/im';
import Recomendation from './Recomendation';

export default function Show({ auth, postdata }) {
    
    const { data , post, loading, err } = useHooks()
    const [bookmark, setBookmark] = useState(false);
    const [isDetail, setIsDetail] = useState(true);
    const [isAdult, setIsAdult] = useState('#03dd03')

    const vote = parseFloat(postdata.vote_average)
    const voteFix = vote.toFixed(1)
    const date = new Date(postdata.release_date);
    const formattedDate = date.toLocaleDateString("en-US");


    useEffect(() => {
        if (postdata.adult === 0) {
            setIsAdult('#fe091a')
        }
        const finBookmark = postdata.bookmarked_by_users?.findIndex(el => el.id === auth.user?.id)
        if (finBookmark > -1) {
            setBookmark(true)
        }
    }, [])

    async function handleBookmark() {
        
        if (auth.user) {
            post(route('post.bookmark', postdata.id),{
                onSuccess: () => {
                    setBookmark((prevBookmark) => !prevBookmark);
                },
                onError: () => {
                    console.log(err);
                }
            })
        } else {
            router.visit(route('login'))
        }
    }
    const { web_name } = usePage().props
    return (
        <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
            <Head>
                <title>Detail</title>
                <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="Detail" />
                <meta property="og:description" content="Halaman Detail menampilkan informasi lengkap tentang film atau acara TV tertentu. Di halaman ini, pengguna dapat menemukan sinopsis, rating, genre, sutradara, pemeran utama, tahun rilis, dan informasi lain yang relevan. Gambaran singkat tentang konten dan trailer film atau acara TV juga dapat ditampilkan di sini. Selain itu, pengguna memiliki pilihan untuk menyimpan film ini ke daftar Bookmark, memberikan Like, atau mengajukan permintaan jika konten tidak tersedia. Halaman Detail adalah tempat untuk mengeksplorasi lebih dalam tentang sebuah karya hiburan sebelum menonton." />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                <MdMenu size={25} color='#ffffff' />
            </button>
            <div style={{
                backgroundImage: `url(/storage/${postdata.backdrop_path ? postdata.backdrop_path : postdata.poster_path})`
            }} className='sm:w-full sm:h-[70vh] h-[45vh] sm:bg-cover bg-center detail-shadow relative'>
                <div className="flex sm:items-center w-full h-full backdrop-blur-sm backdrop-brightness-50 sm:px-8 sm:space-x-4 px-2">
                    <div className='md:w-52 sm:w-32 rounded-md overflow-hidden shadow-2xl hidden sm:block'>
                        <LazyLoadImage
                            effect='blur'
                            src={`/storage/${postdata.poster_path ? postdata.poster_path : postdata.backdrop_path}`}
                            className='w-full h-full'
                        />
                    </div>
                    <div className='mt-10 sm:mt-0'>
                        <div className='flex space-x-2'>
                            <h1 className='text-tex font-semibold md:text-4xl sm:text-2xl text-xl text-text'>{postdata.title}</h1>
                        </div>
                        <div className="sm:flex sm:space-x-2 items-center text-sm md:text-base">
                            <p className='text-text font-light'>{formattedDate}</p>
                            <div className="flex sm:space-x-2 space-x-1">
                                {
                                    postdata.genres?.map((genre, index) => (
                                        <div className='px-2 py-1 text-xs border border-secondaryAccent rounded-md text-text w-fit h-fit' key={index}>
                                            {genre.name}
                                        </div>
                                    ))
                                }
                                <p className='text-text font-medium hidden sm:block'>2h 30m</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <button onClick={() => router.visit(route('stream', postdata.id))} type="button" className='bg-secondaryBtn rounded-md border border-secondaryAccent px-2 py-1 text-secondaryAccent mt-3 md:text-xl sm:text-lg text-lg flex items-center gap-1'>
                                <IoPlay color='white' size={20} />
                                <span >watch</span>
                            </button>
                            <button 
                                disabled={loading}
                                onClick={() => handleBookmark()} 
                                type="button" 
                                className={` rounded-md px-2 py-1 text-white mt-3 md:text-xl sm:text-lg text-lg flex items-center gap-1 disabled:opacity-50 ${bookmark ? 'bg-secondaryAccent' : 'bg-transparent'}`}>
                                {
                                    loading ? <ImSpinner8 size={18} color='#ffffff' className='animate-spin'/> :  <IoBookmarkOutline color='white' size={20} />
                                }
                                <span >bookmark</span>
                            </button>
                        </div>
                        <div className='sm:mt-4 md:w-[50vw] sm:w-[60vw]'>
                            <h3 className='text-primaryBtn md:text-xl sm:text:lg text-lg font-extralight'>{postdata.tagline}</h3>
                            <h3 className='text-text xm:text-lg md:text-xl text-lg font-semibold'>Synopsis</h3>
                            <p className='text-gray-200 text-sm md:text-base font-extralight'>{postdata.overview}</p>
                        </div>
                        <div className="flex space-x-2">

                        </div>
                    </div>
                </div>
                <div className='flex absolute sm:right-10 right-2 sm:bottom-4 bottom-2 items-center space-x-2'>
                    <div className='sm:h-14 sm:w-14 h-10 w-10 bg-secondaryBtn border-2 border-secondaryAccent rounded-full text-primaryBtn flex justify-center items-center sm:text-xl text-sm font-medium'>{voteFix}</div>
                    <MdNoAdultContent size={30} color={isAdult} />
                </div>
            </div>
            <Recomendation isDetail={isDetail}/>
        </AuthLayout>

    )
}