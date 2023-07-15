import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import { formatDateTime } from '@/Helper/formatDate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useHook from '@/hooks/useHook';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Edit from '../Users/Edit';

export default function Index({ auth, users }) {
    const { flash } = usePage().props
    const [open, setOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null);

    const filteredDatas = users.map(({ id, name, email }) => ({
        id,
        title: name,
        email,
    }));

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
