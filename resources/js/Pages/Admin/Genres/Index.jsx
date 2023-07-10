import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Create from './Create';
import Edit from '../Genres/Edit';
import Pagination from '@/Components/Pagination';


export default function Index({ auth, genres }) {
    const [postdata, setPosData] = useState(genres)
    const filteredDatas = genres.data.map(({ id, name, created_at, }) => ({
        id,
        title: name,
        created_at,
    }));

    const filteredDatasSearch = postdata.data.map(({ id, name, created_at, }) => ({
        id,
        title: name,
        created_at,
    }));

    const { flash } = usePage().props
    const [open, setOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null);
    const [ searchTerm, setSearchTerm ] = useState({
        search : ''
      })

    const setProps = {
        th: ['name', 'created at', 'actions'],
        destroyUrl: 'genres.destroy',
        handleEdit: (params) => {
            const createComponent = <Edit open={open} setOpen={setOpen} params={params} />;
            displayModal(createComponent);
        }
    }

    const displayModal = (children) => {
        setModalContent(children);
        setOpen(true);
    };

    const handleCreate = () => {
        const createComponent = <Create setOpen={setOpen} />;
        displayModal(createComponent);
    };

    const handleSearchChange = async (e) => {
        setSearchTerm(prev => ({ ...prev, search: e.target.value }));
        try {
            const response = await axios.get(route('search.genres', searchTerm))
            setPosData(response.data)
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
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Genres" />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        {
                            flash ? flash.message : null
                        }
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <GenerateButton className='bg-purple-500' onClick={handleCreate} >create</GenerateButton>
                            {displayData()}
                        </div>
                        <Pagination data={genres} />
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
