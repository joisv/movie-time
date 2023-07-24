import Card from '@/Components/Card';
import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import { MdMenu } from 'react-icons/md';


export default function Bookmark({ bookmarks, auth }) {
    const { web_name } = usePage().props
    const [isDetail, setIsDetail] = useState(false);
    if (bookmarks.length === 0) {
        return (
            <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
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
                <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                    <MdMenu size={25} color='#ffffff' />
                </button>
                <div className="pb-5 px-1">
                    <h1 className='text-secondaryAccent text-xl font-semibold'>Bookmark page</h1>
                    <p className='text-white text-base font-light'>Your movie wishlist and reminders</p>
                </div>
                <NoDataDisplay>
                    nothing to display
                </NoDataDisplay>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
            <Head>
                <title>Bookmark</title>
                <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="Bookmark" />
                <meta property="og:description" content="Halaman Bookmark adalah tempat di mana pengguna dapat menyimpan film dan acara TV yang menarik perhatian mereka untuk ditonton nanti. Pengguna dapat menambahkan dan mengatur daftar bookmark yang dapat diakses dengan mudah dari mana saja. Dengan fitur ini, mereka dapat menyimpan potongan hiburan yang menarik untuk ditonton di waktu yang lebih tepat atau saat mood mereka cocok." />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                <MdMenu size={25} color='#ffffff' />
            </button>
            <div className="pb-5 px-1">
                <h1 className='text-secondaryAccent text-xl font-semibold'>Bookmark page</h1>
                <p className='text-white text-base font-light'>Your movie wishlist and reminders</p>
            </div>
            <div className={`md:w-[65%] grid h-fit ${isDetail ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-2 max-[375px]:grid-cols-2' : 'md:grid-cols-2 p-2 sm:p-0 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-4 grid-cols-3 gap-2 max-[375px]:grid-cols-2'}`}>
                {
                    bookmarks.map((bookmark, index) => (
                        <Card item={bookmark} key={index} />
                    ))
                }
            </div>
        </AuthLayout>
    )
}
