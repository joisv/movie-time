import AuthLayout from '@/Layouts/AuthLayout';
import useHook from '@/hooks/useHook';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'

export default function History({ histories, auth }) {

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
  return (
    <AuthLayout user={auth?.user}>
         <div className='space-y-4 z-20'>
            {
            histories?.map(data => (
                <div className='text-text cursor-pointer' key={data.post.id}>
                    <Link href={route('post.show',data.post.id)}>
                        <div onClick={() => useHistory(data.post.id)}>
                            <h1 className='font-semibold'>{data.post.title}</h1>
                            <p>{data.post.description}</p>
                        </div>
                    </Link>
                </div>
            ))
            }
            </div>
    </AuthLayout>
  )
}
