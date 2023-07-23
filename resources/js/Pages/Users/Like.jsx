import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Like({ auth, likes }) {
    const { web_name } = usePage().props
    if (likes.length === 0) {
        return (
            <AuthLayout user={auth?.user}>
                <Head>
                    <title>Liked</title>
                    <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="Like" />
                    <meta property="og:description" content="Halaman Like menampilkan semua film dan acara TV yang telah disukai oleh pengguna. Ketika mereka menemukan konten yang disukai, pengguna dapat menyatakan dukungan mereka dengan memberikan tanda suka. Halaman ini memungkinkan pengguna untuk memantau daftar film dan acara TV yang paling mereka nikmati dan menghadirkan rekomendasi lebih akurat berdasarkan preferensi mereka." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <div className="pb-5">
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
        <AuthLayout user={auth?.user}>
            <Head>
                <title>Liked</title>
                <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="Like" />
                <meta property="og:description" content="Halaman Like menampilkan semua film dan acara TV yang telah disukai oleh pengguna. Ketika mereka menemukan konten yang disukai, pengguna dapat menyatakan dukungan mereka dengan memberikan tanda suka. Halaman ini memungkinkan pengguna untuk memantau daftar film dan acara TV yang paling mereka nikmati dan menghadirkan rekomendasi lebih akurat berdasarkan preferensi mereka." />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <div className="pb-5">
                <h1 className='text-secondaryAccent text-xl font-semibold'>Like page</h1>
                <p className='text-white text-base font-light'>Your movie ratings and feedback.</p>
            </div>
            <div className='w-full h-20 flex flex-wrap gap-2'>
                {
                    likes.map((like, index) => (
                        <Card item={like} key={index} />
                    ))
                }
            </div>
        </AuthLayout>
    )
}