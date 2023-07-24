import Card from '@/Components/Card';
import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

export default function History({ histories, auth }) {
    const { web_name } = usePage().props
    const [isDetail, setIsDetail] = useState(false);

    if (histories.length === 0) {
        return (
            <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
                <Head>
                    <title>History</title>
                    <link rel="shortcut icon" href={`storage/${web_name?.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="History" />
                    <meta property="og:description" content="Halaman History menyimpan jejak perjalanan hiburan pengguna. Di sini, mereka dapat melihat daftar film dan acara TV yang pernah mereka tonton sebelumnya. Hal ini memudahkan pengguna untuk melanjutkan menonton dari titik terakhir mereka, serta mengingat kembali momen-momen favorit mereka. Melalui Halaman History, pengguna dapat dengan cepat mengakses dan meninjau kembali seluruh aktivitas menonton mereka dengan nyaman." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                    <MdMenu size={25} color='#ffffff' />
                </button>
                <div className="pb-5 px-1">
                    <h1 className='text-secondaryAccent text-xl font-semibold'>History page</h1>
                    <p className='text-white text-base font-light'>Your movie memories and recommendations.</p>

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
                <title>History</title>
                <link rel="shortcut icon" href={`storage/${web_name?.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="History" />
                <meta property="og:description" content="Halaman History menyimpan jejak perjalanan hiburan pengguna. Di sini, mereka dapat melihat daftar film dan acara TV yang pernah mereka tonton sebelumnya. Hal ini memudahkan pengguna untuk melanjutkan menonton dari titik terakhir mereka, serta mengingat kembali momen-momen favorit mereka. Melalui Halaman History, pengguna dapat dengan cepat mengakses dan meninjau kembali seluruh aktivitas menonton mereka dengan nyaman." />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                <MdMenu size={25} color='#ffffff' />
            </button>
            <div className="pb-5 px-1">
                <h1 className='text-secondaryAccent text-xl font-semibold'>History page</h1>
                <p className='text-white text-base font-light'>Your movie memories and recommendations.</p>

            </div>
            <div className={`md:w-[65%] grid h-fit ${isDetail ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-2 max-[375px]:grid-cols-2' : 'grid-cols-3 p-2 sm:p-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-4 gap-2 max-[375px]:grid-cols-2'}`}>
                {
                    histories.map((data, index) => (
                        <Card item={data.post} key={index} />
                    ))
                }
            </div>
        </AuthLayout>
    )
}
