import { formatDateTime } from '@/Helper/formatDate';
import { shortSentence } from '@/Helper/shortSentence';
import React from 'react'

export default function PopularMovieOrderByViews({ posts }) {
    return (
        <div className='w-full p-1 h-full border border-gray-600 rounded-md'>
            <header>
                <h1 className='text-lg font-semibold'>Popular Movie</h1>
            </header>
            <ul className="flex flex-col justify-between h-[90%]">
                {
                    posts.map((post, index) => (
                        <li key={index}>
                            <div className="flex items-center space-x-4 ">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        {shortSentence(post.title, 5)}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {formatDateTime(post.created_at)}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                    {post.views}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
