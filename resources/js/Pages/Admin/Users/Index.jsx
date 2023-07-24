import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Edit from '../Users/Edit';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, users }) {
    const { flash } = usePage().props
    const [open, setOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null);
    const [searchdata, setSearchData] = useState(users)

    const displayModal = (children) => {
        setModalContent(children);
        setOpen(true);
    };
    const setProps = {
        th: ['name', 'email', 'actions'],
        destroyUrl: 'user.destroy',
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
            const response = await axios.get(route('user.search', searchTerm))
            setSearchData(response.data)
        } catch (error) {
            console.log(error);

        }
    };
    const filteredDatas = users.data.map(({ id, name, email }) => ({
        id,
        title: name,
        email,
    }));
    const filteredDatasSearch = searchdata.data?.map(({ id, name, email }) => ({id, title: name, email }));

    function displayData() {
        const datas = searchTerm.search ? filteredDatasSearch : filteredDatas;
    
        return <Table datas={datas} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setProps={setProps} />;
      }
     
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
            >
                <Head title="Users" />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        {
                            flash ? flash.message : null
                        }
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <GenerateButton className='bg-purple-500' onClick={() => { }} >create</GenerateButton>
                           {displayData()}
                           <Pagination data={users} />
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
