import AuthLayout from '@/Layouts/AuthLayout'
import { Head, usePage } from '@inertiajs/react'
import DisplayMovieWithSlide from './HomePartials/DisplayMovieWithSlide';
import { useState } from 'react';
import BannerSlider from './HomePartials/BannerSlider';
import { MdMenu } from 'react-icons/md';

const tabs = ['Genres', 'Popular Movie', 'Youre History', 'Top Rated']

export default function Explore({
    auth,
    postByGenres,
    genreName,
    postByVoteAverage,
    userHistory,
    movieThisYear,
    topLike
}) {
    const [histories, setHistory] = useState(userHistory.map(history => history.post))
    const { web_name } = usePage().props
    const [isDetail, setIsDetail] = useState(false);
    return (
        <AuthLayout user={auth.user} isDetail={isDetail} setIsDetail={setIsDetail}>
            <Head>
                <title>Explore</title>
                <link rel="shortcut icon" href={`storage/${web_name?.name.icon}`} type="image/x-icon" />
                <meta property="og:title" content="Explore" />
                <meta property="og:description" content="Halaman Explore membawa pengalaman penjelajahan konten hiburan ke tingkat berikutnya. Di sini, pengguna dapat mengeksplorasi katalog lengkap film dan acara TV kami dengan kebebasan penuh. Mereka dapat menggunakan filter khusus untuk menyaring berdasarkan genre, tahun, atau rating, sehingga dapat menemukan film dan acara TV sesuai dengan selera mereka. Halaman Explore juga menampilkan trailer, sinopsis, dan ulasan dari pengguna lain, membantu mereka membuat keputusan yang tepat tentang apa yang ingin mereka tonton selanjutnya" />
                <meta property="og:url" content={window.location.url} />
            </Head>
            <button type="button" className={`absolute -top-8  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                <MdMenu size={25} color='#ffffff' />
            </button>
            <div className="space-y-1 sm:p-0 p-2">
                <DisplayMovieWithSlide title='This Year' datas={movieThisYear} />
                <DisplayMovieWithSlide title='Top Rated' datas={postByVoteAverage} />
                <BannerSlider />
                {
                    topLike.length === 0 ? null : <DisplayMovieWithSlide title='Top Like' datas={topLike} />
                }
                {
                    auth.user && userHistory.length === 0 ? null : <DisplayMovieWithSlide title='History' datas={histories} />
                }
                <DisplayMovieWithSlide title={`Genre ${genreName.name}`} datas={postByGenres} />
            </div>
        </AuthLayout>
    )
}
