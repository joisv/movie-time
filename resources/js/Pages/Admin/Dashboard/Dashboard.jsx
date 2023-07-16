import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PopularMovieOrderByViews from './partials/PopularMovieOrderByViews';
import UserActivity from './partials/UserActivity';
import PostIssue from './partials/PostIssue';
import MostFavoriteMovie from './partials/MostFavoriteMovie';
import MostWatchedMovie from './partials/MostWatchedMovie';

export default function Dashboard({ auth, postByViews }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 ">
                    <div className="bg-transparent overflow-hidden shadow-sm sm:rounded-md min-h-screen p-2 space-y-4">
                        <div className="sm:flex justify-between sm:space-x-3 sm:h-[50vh]">
                            <PopularMovieOrderByViews posts={postByViews} />
                            <UserActivity />
                            <PostIssue />
                        </div>
                        <div className="sm:flex sm:space-x-3">
                            <MostFavoriteMovie />
                            <MostWatchedMovie />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
