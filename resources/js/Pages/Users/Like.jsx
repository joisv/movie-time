import AuthLayout from '@/Layouts/AuthLayout';
import useHook from '@/hooks/useHook';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'

export default function Like({ auth, likes }) {
    const { setHistory } = useHook()
  
    const [ dataHistory, setDataHistory ] = useState({
        post_id: '',
        user_id: auth.user?.id,
    });

    const useHistory = async (post_id) => {
        if(auth.user){
            setDataHistory(prev => prev.post_id = post_id);
            setHistory(dataHistory);
        }
    }

    if(likes.length === 0){
        return(
            <AuthLayout user={auth?.user}>
                <h1 className='text-text'>tidak ada data</h1>
            </AuthLayout>
        )
    }
  return (
    <AuthLayout user={auth?.user}>
        <div className='space-y-4 z-20'>
            {
            likes?.map((data, index) => (
                <div className='text-text cursor-pointer' key={index}>
                    <Link href={route('post.show',data.id)}>
                        <div onClick={() => useHistory(data.id)}>
                            <h1 className='font-semibold'>{data.title}</h1>
                            <p>{data.description}</p>
                        </div>
                    </Link>
                </div>
            ))
            }
            </div>
    </AuthLayout>
  )
}