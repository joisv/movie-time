import CustomModal from '@/Components/CustomModal';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Children, useState } from 'react';
import Create from './Create';
import Edit from './Edit';


export default function Index({ auth, permissions }) {

    const filteredDatas = permissions?.map(({ id, name, created_at,  }) => ({ 
        id, 
        name,
        created_at, 
    }));
    const [ open, setOpen ] = useState(false)
    const [modalContent, setModalContent] = useState(null);

    const setProps = {
        th:[ 'name', 'created at' , 'actions' ],
        destroyUrl: 'permissions.destroy',
        handleEdit: (params) => {
            const createComponent = <Edit open={open} setOpen={setOpen} params={params}/>;
            displayModal(createComponent);
        }
    }
    
    const displayModal = (children) => {
      setModalContent(children);
      setOpen(true);
    };
  
    const handleCreate = () => {
      const createComponent = <Create open={open} setOpen={setOpen} />;
      displayModal(createComponent);
    };
    
  return (
    <AuthenticatedLayout
    user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
    <Head title="Dashboard" />

        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                <GenerateButton className='bg-purple-500' onClick={handleCreate} >create</GenerateButton>
                    <Table datas={filteredDatas} setProps={setProps}/>
                </div>
            </div>
                {open && (
                    <CustomModal open={open} onClose={() => setOpen(false)}>
                        {modalContent}
                    </CustomModal>
                )}
        </div>
    </AuthenticatedLayout>
  )
}
