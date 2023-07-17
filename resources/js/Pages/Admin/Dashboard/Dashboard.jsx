import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PopularMovieOrderByViews from './partials/PopularMovieOrderByViews';
import UserActivity from './partials/UserActivity';
import PostIssue from './partials/PostIssue';
import MostFavoriteMovie from './partials/MostFavoriteMovie';
import { MostWatchedMovie } from './partials/MostWatchedMovie';

export default function Dashboard({ auth, dates, viewsData }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 ">
                    <div className="min-h-[110vh] overflow-hidden shadow-sm sm:rounded-md p-2 flex flex-col space-y-3 bg-white">
                        <div className="sm:grid sm:grid-cols-3 gap-3 ">
                            <MostFavoriteMovie />
                            <UserActivity />
                            {/* <PopularMovieOrderByViews posts={postByViews} /> */}
                            <PostIssue />
                        </div>
                        <MostWatchedMovie />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
