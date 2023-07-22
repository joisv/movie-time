import AuthLayout from '@/Layouts/AuthLayout'
import { Head } from '@inertiajs/react'
import DisplayMovieWithSlide from './HomePartials/DisplayMovieWithSlide';
import { useState } from 'react';
import BannerSlider from './HomePartials/BannerSlider';

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
    const [ histories, setHistory ] = useState(userHistory.map(history => history.post))
    return (
        <AuthLayout user={auth.user}>
            <Head title="Explore" />
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
