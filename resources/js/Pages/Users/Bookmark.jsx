import Card from '@/Components/Card';
import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react'


export default function Bookmark({ bookmarks, auth }) {
    const { web_name } = usePage().props
    if (bookmarks.length === 0) {
        return (
            <AuthLayout user={auth?.user}>
                <div className="pb-5">
                    <h1 className='text-secondaryAccent text-xl font-semibold'>Bookmark page</h1>
                    <p className='text-white text-base font-light'>Your movie wishlist and reminders</p>
                </div>
                <Head>
                    <title>Bookmark</title>
                    <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="Bookmark" />
                    <meta property="og:description" content="Halaman Bookmark adalah tempat di mana pengguna dapat menyimpan film dan acara TV yang menarik perhatian mereka untuk ditonton nanti. Pengguna dapat menambahkan dan mengatur daftar bookmark yang dapat diakses dengan mudah dari mana saja. Dengan fitur ini, mereka dapat menyimpan potongan hiburan yang menarik untuk ditonton di waktu yang lebih tepat atau saat mood mereka cocok." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <NoDataDisplay>
                    nothing to display
                </NoDataDisplay>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout user={auth?.user}>
            <Head>
                <title>Bookmark</title>
                <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="Bookmark" />
                <meta property="og:description" content="Halaman Bookmark adalah tempat di mana pengguna dapat menyimpan film dan acara TV yang menarik perhatian mereka untuk ditonton nanti. Pengguna dapat menambahkan dan mengatur daftar bookmark yang dapat diakses dengan mudah dari mana saja. Dengan fitur ini, mereka dapat menyimpan potongan hiburan yang menarik untuk ditonton di waktu yang lebih tepat atau saat mood mereka cocok." />
                <meta property="og:url" content={window.location.url} />
            </Head>
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
