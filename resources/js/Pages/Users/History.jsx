import Card from '@/Components/Card';
import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, usePage } from '@inertiajs/react';

export default function History({ histories, auth }) {
    const { web_name } = usePage().props
    if (histories.length === 0) {
        return (
            <AuthLayout user={auth?.user}>
                <Head>
                    <title>History</title>
                    <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="History" />
                    <meta property="og:description" content="Halaman History menyimpan jejak perjalanan hiburan pengguna. Di sini, mereka dapat melihat daftar film dan acara TV yang pernah mereka tonton sebelumnya. Hal ini memudahkan pengguna untuk melanjutkan menonton dari titik terakhir mereka, serta mengingat kembali momen-momen favorit mereka. Melalui Halaman History, pengguna dapat dengan cepat mengakses dan meninjau kembali seluruh aktivitas menonton mereka dengan nyaman." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <div className="pb-5">
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
        <AuthLayout user={auth?.user}>
            <Head>
                <title>History</title>
                <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="History" />
                <meta property="og:description" content="Halaman History menyimpan jejak perjalanan hiburan pengguna. Di sini, mereka dapat melihat daftar film dan acara TV yang pernah mereka tonton sebelumnya. Hal ini memudahkan pengguna untuk melanjutkan menonton dari titik terakhir mereka, serta mengingat kembali momen-momen favorit mereka. Melalui Halaman History, pengguna dapat dengan cepat mengakses dan meninjau kembali seluruh aktivitas menonton mereka dengan nyaman." />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <div className="pb-5">
                <h1 className='text-secondaryAccent text-xl font-semibold'>History page</h1>
                <p className='text-white text-base font-light'>Your movie memories and recommendations.</p>

            </div>
            <div className='w-full h-20 flex flex-wrap gap-2'>
                {
                    histories.map((data, index) => (
                        <Card item={data.post} key={index} />
                    ))
                }
            </div>
        </AuthLayout>
    )
}
