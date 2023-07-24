import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';
// import Create from './Create';

import axios from 'axios';
import Table from '@/Components/Table';
import CustomModal from '@/Components/CustomModal';
import Pagination from '@/Components/Pagination';
import Edit from '../Reports/Edit';



export default function Index({ auth, reports }) {

    const { flash } = usePage().props
    const [postdata, setPosData] = useState(reports)
    const [modalContent, setModalContent] = useState(null);
    const [open, setOpen] = useState(false)

    const setProps = {
        th: ['post title', 'user', 'status', 'created_at', 'actions'],
        destroyUrl: 'api.report.destroy',
        bulkDeleteUrl: '',
        handleEdit: (params) => {
            const createComponent = <Edit open={open} setOpen={setOpen} params={params} />;
            displayModal(createComponent);
        }
    }

    const [searchTerm, setSearchTerm] = useState({
        search: ''
    })


    const handleSearchChange = async (e) => {
        setSearchTerm(prev => ({ ...prev, search: e.target.value }));
        try {
            const response = await axios.get(route('report.search', searchTerm))
            console.log(response);
            setPosData(response.data.data)
        } catch (error) {
            console.log(error);

        }
    };

    const displayModal = (children) => {
        setModalContent(children);
        setOpen(true);
    };

    const filteredDatas = reports.map(({ id, post, user, status, created_at }) => ({
        id,
        title: post.title,
        user: user.name,
        status,
        created_at,
    }));
    const filteredDatasSearch = postdata?.map(({ id, post, user, status, created_at }) => ({
        id,
        title: post.title,
        user: user.name,
        status,
        created_at,
    }));

    function displayData() {
        const datas = searchTerm.search ? filteredDatasSearch : filteredDatas;

        return <Table datas={datas} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setProps={setProps} />;
    }

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    {
                        flash ? flash.message : null
                    }
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className='flex justify-between'>

                            </div>
                            {displayData()}
                            {/*<Pagination data={posts} /> */}
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
