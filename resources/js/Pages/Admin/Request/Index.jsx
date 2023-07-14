import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import CustomModal from '@/Components/CustomModal';
import Table from '@/Components/Table';

const Edit = ({ id, onClose }) => {

    const { data, setData, errors, reset, patch } = useForm({
        status: '',
        user_id: ''
    })
    
    function submit(e) {
        e.preventDefault();
        patch(route('adminrequest.update', id), {
            onSuccess: () => {
               onClose()
            }
        })
    }
    
    return (
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
    )
}

export default function Index({ auth, datas }) {

    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const filteredDatas = datas.map(({ id, user, content, created_at, status }) =>
        ({ id, title: user.name, content, created_at, status }));


    const displayModal = (children) => {
        setModalContent(children);
        setOpen(true);
    };

    const setProps = {
        th: ['requester ', 'content', 'created_at', 'status', 'actions'],
        destroyUrl: 'adminrequest.destroy',
        handleEdit: (params) => {
            const createComponent = <Edit id={params} onClose={() => setOpen(false)}/>;
            displayModal(createComponent);
        },
    }

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request</h2>}
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <Table datas={filteredDatas} setProps={setProps} />
                        </div>
                    </div>

                </div>
            </AuthenticatedLayout>
            {open && (
                <CustomModal open={open} onClose={() => setOpen(false)}>
                    {modalContent}
                </CustomModal>
            )}
        </>
    )
}
