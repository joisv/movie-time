import Card from '@/Components/Card';
import NoDataDisplay from '@/Components/NoDataDisplay';
import AuthLayout from '@/Layouts/AuthLayout';
import useHook from '@/hooks/useHook';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'

export default function History({ histories, auth }) {
    
    if(histories.length === 0){
        return(
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
