import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Create from './Create';
import Edit from './Edit';


export default function Index({ auth, banners, base_url }) {

    const { flash } = usePage().props
    const [open, setOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null);

    const filteredDatas = banners?.map(({ id, name, banner_img, redirect_to, created_at }) => ({
        id,
        title: name,
        poster: banner_img,
        redirect_to,
        created_at,
    }));


    const displayModal = (children) => {
        setModalContent(children);
        setOpen(true);
    };
    const setProps = {
        th: ['name', 'banner_img', 'redirect_to', 'created at', 'actions'],
        destroyUrl: 'banner.destroy',
        handleEdit: (params) => {
            const createComponent = <Edit onClose={() => setOpen(false)} params={params} base_url={base_url} />;
            displayModal(createComponent);
        }
    }

    const handleCreate = () => {
        const createComponent = <Create setOpen={setOpen} />;
        displayModal(createComponent);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        {
                            flash ? flash.message : null
                        }
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <GenerateButton className='bg-purple-500' onClick={() => handleCreate()} >create</GenerateButton>
                            <Table datas={filteredDatas} setProps={setProps} base_url={base_url}/>

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
