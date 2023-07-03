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

const th = ['id', 'name', 'created', 'actions']
const destroyUrl = 'api.roles.destroy'
export default function Index({ auth, roles }) {
    const { flash } = usePage().props
    const [ open, setOpen ] = useState(false)

    const {data, setData, errors, processing, post, reset } = useForm({
        name: ''
    })

    function submit(e){
        e.preventDefault();
        post(route('api.roles.store', data) ,{
            onSuccess:() => {
                setOpen(false),
                reset()
            },
            onError:() => setOpen(true),
        })
        
    }
    const filteredDatas = roles.map(({ id, name, created_at }) => ({ 
        id, 
        title: name,
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
                    {
                        flash ? flash.message : null
                    }
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                    <GenerateButton className='bg-purple-500' onClick={() => setOpen(true)} >create</GenerateButton>
                        <Table datas={filteredDatas} th={th} destroyUrl={destroyUrl}/>

                    </div>
                </div>
                <CustomModal open={open} onClose={() => setOpen(false)}> 
                    <div className='bg-white w-[40vh] p-3 rounded-lg shadow-2xl'>
                        <form onSubmit={submit}>
                            <InputLabel htmlFor='name' value='Role name'/>
                            <TextInput 
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name}/>

                            <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processing}>
                                Create
                            </GenerateButton>
                        </form>
                    </div>
                </CustomModal>
            </div>
        </AuthenticatedLayout>
    )
}
