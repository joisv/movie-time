
import { useState } from 'react';
import axios from 'axios';
import GenerateButton from '@/Components/GenerateButton';
import { router } from '@inertiajs/react';
import Table from '@/Components/Table';
import Pagination from '@/Components/Pagination';



const setProps = {
    th: ['name', 'post title', 'created at', 'actions'],
    destroyUrl: 'stream.destroy',
    handleEdit: (params) => {
        console.log(params);
        router.visit(route('stream.edit', params))
    }
}

export default function Index({ auth, datastreams, setOpen }) {

    
    const [streamdata, setStreamData] = useState(datastreams?.data)
    const filteredDatas = datastreams?.data.map(({ id, name, post, created_at, }) => ({
        id,
        title: name,
        post_title: post?.title,
        created_at,
    }));
    const filteredDatasSearch = streamdata.map(({ id, name, post, created_at, }) => ({
        id,
        title: name,
        post_title: post?.title,
        created_at,
    }));

    const [searchTerm, setSearchTerm] = useState({
        search: ''
    })

    const handleSearchChange = async (e) => {
        setSearchTerm(prev => ({ ...prev, search: e.target.value }));
        try {
            const response = await axios.get(route('stream.search', searchTerm))
            setStreamData(response.data.data)
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
            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <Table datas={filteredDatas} setProps={setProps} handleSearchChange={handleSearchChange} />
                            </div> */}
            {displayData()}
            {/* <Pagination data={datastreams} /> */}
          
        </>
    )
}
