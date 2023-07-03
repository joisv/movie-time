import GenerateButton from '@/Components/GenerateButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const th = ['id', 'name', 'created at' , 'actions']

export default function Index({ auth, permissions }) {

    const filteredDatas = permissions?.map(({ id, name, created_at,  }) => ({ 
        id, 
        name,
        created_at, 
    }));
    
  return (
    <AuthenticatedLayout
    user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
    <Head title="Dashboard" />

        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                    <Table datas={filteredDatas} destroyUrl={''} th={th}/>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
