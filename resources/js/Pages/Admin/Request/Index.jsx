import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CustomTale from '@/Components/CustomTale';
import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import useHook from '@/hooks/useHook';

export default function Index({ auth, datas }) {
    const [ openModal, setOpenModal ] = useState(false);
    const { generateGenreMovie, result, loading } = useHook();
    const [ req, setReq ] = useState('')
    const { data, setData, errors, reset, patch } = useForm({
        status: '',
        user_id: ''
    })

    
    const handleSetId = (id, user_id) => {
        setReq(id);
        setData('user_id', user_id)
    }

    function submit(e) {
        e.preventDefault();
        patch(route('adminrequest.update', req), {
            onSuccess: () => {
                setOpenModal(false);
            }
        })
    }

    function handleGenerateGenre() {
        generateGenreMovie()
    }
    
  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request</h2>}
        >
        <Head title="Dashboard" />

        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    
                <GenerateButton children='genre' disabled={loading} onClick={() => handleGenerateGenre()} className='bg-purple-700' type={'button'}/>
                    <CustomTale datas={datas} setOpenModal={setOpenModal} setId={handleSetId}/>
                </div>
            </div>
            <CustomModal open={openModal} onClose={() => setOpenModal(false)} >
                <div className='bg-purple-700 p-10 rounded-md shadow-2xl'>
                    <form onSubmit={submit}>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
                            onChange={(e) => setData('status', e.target.value)}
                            value={data.status}
                        >
                            <option disabled value=''>pilih status</option>
                            <option value="pending">pending</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                            <button type="submit" className='mt-3 rounded-sm border-2 boreder-gray-300 px-2 py-1 text-sm font-medium bg-green-300'>save</button>
                      
                    </form>
                </div>

            </CustomModal>
        </div>
    </AuthenticatedLayout>
  )
}
