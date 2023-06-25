import React, { useState } from 'react'
import AuthLayout from '@/Layouts/AuthLayout'
import axios from 'axios';
import { Link } from '@inertiajs/react';
import useHook from '@/hooks/useHook';

export default function Home({ datas, auth }) {

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
          datas.map(data => (
            <div className='text-text cursor-pointer' key={data.id}>
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
