import { Link, router } from '@inertiajs/react';
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function List({ searchTerm }) {
    const [datas, setData] = useState([]);
    useEffect(() => {
        if (searchTerm) {
            getData();
        }
    }, [searchTerm])
    const getData = async () => {
        try {
            const response = await axios.get(route('search.movie', { search: searchTerm ? searchTerm : null }))
            if (response.status === 200) {
                setData(response.data)
            }
        } catch (error) {

        }
    }
    return (
        <>
            {
                searchTerm === '' ? null : <div className="w-full top-10 bg-secondaryBtn text-gray-300 p-2 rounded-md text-base z-50 absolute space-y-3">
                    {
                        datas?.map((data, index) => (
                            <div 
                                className='hover:bg-gray-700 p-1 cursor-pointer'key={index}
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
