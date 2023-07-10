import useHook from '@/hooks/useHook';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from "react-icons/im";

const data = [
    'Buffering terjadi secara berkala',
    'Kualitas video rendah',
    'Video terputus atau berhenti tiba-tiba',
    'Sinkronisasi audio dan video tidak tepat',
    'Masalah pemutaran pada perangkat tertentu',
    'Gangguan iklan atau pop-up yang mengganggu',
    'Tampilan menjadi tidak responsif'
]

export default function Radio({ onClose, itemId, auth, setOpenModal }) {

    const [loading, setLoading] = useState(false);

    const [dataReport, setDataReport] = useState({
        user_id: auth.user?.id,
        post_id: itemId,
        content: data[0]
    })

    const handleReport = async () => {
        if (auth.user) {
            setLoading(true)
            try {
                const response = await axios.post(route('report.store', dataReport))
                if (response.status === 200) {
                    setOpenModal(false)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        } else {
            alert('login')
        }
    }
    return (
        <div>
            {
                data.map((item, index) => (
                    <div className="flex items-center mb-4" key={index}>
                        <input id={`default-radio-${index}`} type="radio" name="default-radio" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                            value={item}
                            checked={dataReport.content == item}
                            onChange={(e) => setDataReport(values => ({
                                ...values,
                                content: e.target.value
                            }))}
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
                    className='bg-red-500 text-white rounded-sm w-14 disabled:bg-red-400 flex items-center justify-center  gap-1 p-1'
                    onClick={handleReport}
                    disabled={loading}
                >
                    {
                        loading ? <ImSpinner9 size={15} color='#ffffff' className='animate-spin'/> : ' send'
                    }
                   
                </button>
            </div>
        </div>
    )
}
