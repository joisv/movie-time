import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

export default function Like({ auth, likes }) {
    const { web_name } = usePage().props
    const [isDetail, setIsDetail] = useState(false);
    if (likes.length === 0) {
        return (
            <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
                <Head>
                    <title>Liked</title>
                    <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="Like" />
                    <meta property="og:description" content="Halaman Like menampilkan semua film dan acara TV yang telah disukai oleh pengguna. Ketika mereka menemukan konten yang disukai, pengguna dapat menyatakan dukungan mereka dengan memberikan tanda suka. Halaman ini memungkinkan pengguna untuk memantau daftar film dan acara TV yang paling mereka nikmati dan menghadirkan rekomendasi lebih akurat berdasarkan preferensi mereka." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                    <MdMenu size={25} color='#ffffff' />
                </button>
                <div className="pb-5 px-1">
                    <h1 className='text-secondaryAccent text-xl font-semibold'>Like page</h1>
                    <p className='text-white text-base font-light'>Your movie ratings and feedback.</p>
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
                <title>Liked</title>
                <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="Like" />
                <meta property="og:description" content="Halaman Like menampilkan semua film dan acara TV yang telah disukai oleh pengguna. Ketika mereka menemukan konten yang disukai, pengguna dapat menyatakan dukungan mereka dengan memberikan tanda suka. Halaman ini memungkinkan pengguna untuk memantau daftar film dan acara TV yang paling mereka nikmati dan menghadirkan rekomendasi lebih akurat berdasarkan preferensi mereka." />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                <MdMenu size={25} color='#ffffff' />
            </button>
            <div className="p-5 px-1">
                <h1 className='text-secondaryAccent text-xl font-semibold'>Like page</h1>
                <p className='text-white text-base font-light'>Your movie ratings and feedback.</p>
            </div>
            <div  className={`md:w-[65%] grid h-fit ${isDetail ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-2 max-[375px]:grid-cols-2' : 'md:grid-cols-2 p-2 sm:p-0 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-4 grid-cols-3 gap-2 max-[375px]:grid-cols-2'}`}>
                {
                    likes.map((like, index) => (
                        <Card item={like} key={index} />
                    ))
                }
            </div>
        </AuthLayout>
    )
}