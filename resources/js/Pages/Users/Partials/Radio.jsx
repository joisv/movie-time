
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react'
import { ImSpinner9 } from "react-icons/im";

const datareport = [
    'Buffering terjadi secara berkala',
    'Kualitas video rendah',
    'Video terputus atau berhenti tiba-tiba',
    'Sinkronisasi audio dan video tidak tepat',
    'Masalah pemutaran pada perangkat tertentu',
    'Gangguan iklan atau pop-up yang mengganggu',
    'Tampilan menjadi tidak responsif'
]

export default function Radio({ onClose, itemId, auth, setOpen }) {

    const { data, setData, errors, processing, post } = useForm({
        user_id: auth.user?.id,
        post_id: itemId,
        content: datareport[0]
    })

    const handleReport = async () => {
        if (auth.user) {
            post(route('report.store'),{
                onSuccess: () => {
                    onClose(false)
                },
            })
        } else {
            alert('login')
        }
    }
    return (
        <div>
            {
                datareport.map((item, index) => (
                    <div className="flex items-center mb-4" key={index}>
                        <input id={`default-radio-${index}`} type="radio" name="default-radio" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                            value={item}
                            checked={data.content == item}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        <label htmlFor={`default-radio-${index}`} className="ml-2 text-sm font-medium text-white ">{item}</label>
                    </div>
                ))
            }
            <div className='flex space-x-2'>
                <button type="button" className='bg-gray-400 text-black rounded-sm px-2 py-1' onClick={onClose}>
                    close
                </button>
                <button
                    type="button"
                    className='bg-[#f2cd00] text-white rounded-sm w-14 disabled:bg-red-400 flex items-center justify-center  gap-1 p-1'
                    onClick={handleReport}
                    disabled={processing}
                >
                    {
                        processing ? <ImSpinner9 size={15} color='#ffffff' className='animate-spin'/> : ' send'
                    }
                   
                </button>
            </div>
        </div>
    )
}
