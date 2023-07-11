import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import useHook from '@/hooks/useHook';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'

export default function Like({ auth, likes }) {
    const { setHistory } = useHook()

    const [dataHistory, setDataHistory] = useState({
        post_id: '',
        user_id: auth.user?.id,
    });

    const useHistory = async (post_id) => {
        if (auth.user) {
            setDataHistory(prev => prev.post_id = post_id);
            setHistory(dataHistory);
        }
    }

    if (likes.length === 0) {
        return (
            <AuthLayout user={auth?.user}>
                <NoDataDisplay>
                    nothing to display
                </NoDataDisplay>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout user={auth?.user}>
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