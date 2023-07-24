import { formatDateTime } from '@/Helper/formatDate';
import { shortSentence } from '@/Helper/shortSentence';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import { ImSpinner8 } from 'react-icons/im';

const tabs = ['Views', 'Likes']

const OptionsCard = ({ posts, loading }) => {
    return (
        <div className='bg-gray-900 h-full p-3 rounded-sm'>
            {
                posts?.map((post, index) => (

                    <ul className=" h-[8vh] space-y-3 " key={index}>
                        <li >
                            <div className="flex items-center space-x-4 ">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-300 truncate ">
                                        {shortSentence(post.title, 5)}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {formatDateTime(post.created_at)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))
            }

        </div>
    )
}

export default function MostFavoriteMovie() {

    const [movies, setMovies] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const getMostMovie = async () => {
            setLoading(true)
            try {

                const response = await axios.get(route('mostmovie'))
                setMovies(response.data)

            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        getMostMovie();
    }, [])

    if(loading){
        return(
            <div className="p-1 border border-gray-400 rounded-md w-full h-[25vh] flex items-center justify-center">
                <ImSpinner8 size={20} color='rgb(17 24 39)' className='animate-spin'/>
            </div>
        )
    }
    return (
        <div className='p-1 h-full rounded-md w-full'>
            <Tab.Group>
                <Tab.List>
                    <div className="space-x-2 py-3">
                        {
                            tabs.map((tab, index) => (
                                <Tab as={Fragment} key={index}>
                                    {({ selected }) => (
                                        <button
                                            className={` w-fit h-fit p-2 rounded-md text-base focus:ring-0 focus:border-0 border-0 ring-0 font-medium ${selected ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
                                        >
                                            {tab}
                                        </button>
                                    )}
                                </Tab>
                            ))
                        }
                    </div>
                </Tab.List>
                <Tab.Panels >
                    <Tab.Panel>
                        <OptionsCard posts={movies.postsSortedByViews} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <OptionsCard posts={movies.postsSortedByLikes} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
