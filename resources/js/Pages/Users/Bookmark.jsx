import Card from '@/Components/Card';
import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import React, { useState } from 'react'


export default function Bookmark({ bookmarks, auth }) {
    if(bookmarks.length === 0){
        return(
            <AuthLayout user={auth?.user}>
                <NoDataDisplay>
                    nothing to display
                </NoDataDisplay>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout user={auth?.user}>
            <div className="pb-5">
                <h1 className='text-secondaryAccent text-xl font-semibold'>Bookmark page</h1>
                <p className='text-white text-base font-light'>Your movie wishlist and reminders</p>
            </div>
            <div className='w-full h-20 flex flex-wrap gap-2'>
                {
                    bookmarks.map((bookmark, index) => (
                        <Card item={bookmark} key={index} />
                    ))
                }
            </div>
        </AuthLayout>
    )
}
