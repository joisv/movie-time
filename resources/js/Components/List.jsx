import useHooks from '@/hooks/useHooks';
import { router } from '@inertiajs/react';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ImSpinner8 } from 'react-icons/im';

export default function List({ searchTerm }) {
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        if (searchTerm) {
            getData();
        }
    }, [searchTerm])

    const { data: datas, get: getD, loading, err } = useHooks();
    const getData = async () => {
        await getD(route('search.movie', { search: searchTerm ? searchTerm : null }), {
            onSuccess: () => {
                console.log('succes');
            },
        })
    };
    return (
        <>
            {
                searchTerm === '' ? null : datas.length === 0 ? <div className="w-full top-10 bg-secondaryBtn text-gray-300 p-2 rounded-md text-base z-50 absolute space-y-3">
                            <div className='hover:bg-gray-700 p-1 cursor-pointer' >
                                <span>
                                    not found
                                </span>
                            </div>
                </div> : <div className="w-full top-10 bg-secondaryBtn text-gray-300 p-2 rounded-md sm:text-base z-50 absolute space-y-2 flex flex-col items-center max-h-[45vh] h-fit overflow-y-auto">
                    {
                        loading ? <ImSpinner8 size={18} color='#ffffff' className='animate-spin'/> :
                        datas?.map((data, index) => (
                            <div
                                className='hover:bg-gray-700 p-1 cursor-pointer' key={index}
                                onClick={() => router.visit(route('post.show', data.slug))}
                            >
                                <span>
                                    {data.title}
                                </span>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )
}
