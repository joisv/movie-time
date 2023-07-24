import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import React, { useState } from 'react'
import Table from '@/Components/Table';
import { router } from '@inertiajs/react';

const setProps = {
    th: ['name', 'post title', 'created at', 'actions'],
    destroyUrl: 'download.destroy',
    handleEdit: (params) => {
        console.log(params);
        router.visit(route('download.edit', params))
    }
}

export default function Index({ downloads, setOpen }) {
    const [downloaddata, setDownloadData] = useState(downloads?.data)

    const filteredDatas = downloads?.data.map(({ id, name_download, post, created_at, }) => ({
        id,
        title: name_download,
        post_title: post?.title,
        created_at,
    }));
    const filteredDatasSearch = downloaddata.map(({ id, name_download, post, created_at, }) => ({
        id,
        title: name_download,
        post_title: post?.title,
        created_at,
    }));

    const [searchTerm, setSearchTerm] = useState({
        search: ''
    })

    const handleSearchChange = async (e) => {
        setSearchTerm(prev => ({ ...prev, search: e.target.value }));
        try {
            const response = await axios.get(route('download.search', searchTerm))
            setDownloadData(response.data.data)
        } catch (error) {
            console.log(error);

        }
    };

    function displayData() {
        const datas = searchTerm.search ? filteredDatasSearch : filteredDatas;

        return <Table datas={datas} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setProps={setProps} />;
    }
    return (
        <>
            <GenerateButton
                onClick={() => setOpen(true)}
                className='bg-purple-500 disabled:bg-purple-300'>
                create
            </GenerateButton>
            {displayData()}
            {/* <Pagination data={datastreams} /> */}
        </>
    )
}
