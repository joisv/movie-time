import { Head, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { IoPlay } from 'react-icons/io5'
import { IoBookmarkOutline } from "react-icons/io5";
import { MdNoAdultContent } from 'react-icons/md'

import AuthLayout from '@/Layouts/AuthLayout';

const backdrop = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'
const poster = 'https://image.tmdb.org/t/p/original/'

export default function Show({ auth, postdata }) {
    console.info(postdata);
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
        // const finArray = postdata.liked_by_users?.findIndex(element => element.id === auth.user?.id)
        // if (finArray > -1) {
        //     setLike(true)
        // }
        const finBookmark = postdata.bookmarked_by_users?.findIndex(el => el.id === auth.user?.id)
        if (finBookmark > -1) {
            setBookmark(true)
        }
    }, [])

    async function handleBookmark() {
        setBookmark((prevBookmark) => !prevBookmark);
        if (auth.user) {
            try {
                const response = await axios.post(route('post.bookmark', postdata.id))
                console.log(response);
                if (response === 200) {
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            router.visit(route('login'))
        }
    }
    return (
        <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
            <Head title="Welcome" />
            <div style={{
                backgroundImage: `url(${poster + postdata.backdrop_path})`
            }} className='sm:w-full h-[70vh] sm:bg-cover bg-center detail-shadow relative'>
                <div className="flex items-center w-full h-full backdrop-blur-sm backdrop-brightness-50 sm:px-8 sm:space-x-4 px-2">
                    <div className='md:w-52 sm:w-32 rounded-md overflow-hidden shadow-2xl hidden sm:block'>
                        <img src={poster + postdata.poster_path} alt="" srcSet="" />
                    </div>
                    <div>
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
                        <div className="sm:flex space-x-2 sm:mt-5 items-center hidden">
                            <button onClick={() => router.visit(route('stream', postdata.id))} type="button" className='bg-secondaryBtn rounded-md border border-secondaryAccent px-2 py-1 text-secondaryAccent mt-3 md:text-xl sm:text-lg text-lg flex items-center gap-1'>
                                <IoPlay color='white' size={20} />
                                <span >watch</span>
                            </button>
                            <button onClick={() => handleBookmark()} type="button" className={` rounded-md px-2 py-1 text-white mt-3 md:text-xl sm:text-lg text-lg flex items-center gap-1 ${bookmark ? 'bg-secondaryAccent' : 'bg-transparent'}`}>
                                <IoBookmarkOutline color='white' size={20} />
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
        </AuthLayout>

    )
}

{/* <div className="relative bg-center bg-gray-100  dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <button type="button" onClick={() => setIsDetail((prev) => !prev)} className='text-red-500'>tombol</button>
        <div className='p-10'>
            <h1 className='font-semibold'>{ postdata.title }</h1>
            <p>{postdata.description}</p>
            
            <div className='flex space-x-3'>
                <button className={`px-2 my-3 rounded-sm ${like ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={handleLike}>
                        like {postdata.like}
                </button>
                <button className={`px-2 my-3 rounded-sm ${bookmark ? 'bg-lime-400 text-white' : 'bg-gray-300'}`} onClick={handleBookmark}>
                        bookmark { postdata.bookmark }
                </button>
                <button type="button" className='px-2 my-3 rounded-sm bg-red-500 text-white' onClick={() => setOpenModal(true)}>report</button>
            </div>
            
            <form onSubmit={submit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." 
                        required
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </div>
                </div>
            </form>
            <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                

                {
                    comments?.map((comment, index) => (
                        <div className='mb-5 p-3 bg-gray-400 rounded-md' key={index}>
                            <h1 className='mb-1 font-medium text-lg'>{comment.user.name}</h1>
                            <p>{comment.content}</p>
                        </div>
                    ))
                }
        </div>  
     
    </div> */}

{/* <CustomModal open={openModal} onClose={() => setOpenModal(false)}>
        <Radio onClose={() => setOpenModal(false)} itemId={postdata.id} auth={auth} setOpenModal={setOpenModal}/>
     </CustomModal> */}