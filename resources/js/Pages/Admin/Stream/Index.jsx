import CustomModal from '@/Components/CustomModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import GenerateButton from '@/Components/GenerateButton';
import { router } from '@inertiajs/react';
import Table from '@/Components/Table';
import Create from './Create';


const title = {
    className: 'sm:text-3xl font-semibold text-xl ',
    translate: '    -translate-y-5'
}
const defInput = {
    className: 'text-base sm:font-medium font-extralight',
    translate: '-translate-y-5'
}

const th = [ 'name', 'post title', 'created at', 'actions']
const destroyUrl = 'stream.destroy'

const setProps = {
    th : [ 'name', 'post title', 'created at', 'actions'],
    destroyUrl : 'stream.destroy',
    handleEdit: (params) => {
      router.visit(route('streamurl.edit', params ))
    }
  }

export default function Index({ auth, datastreams }) {
   
    const [ open, setOpen ] = useState(false);
    console.log(datastreams);
    const filteredDatas = datastreams.map(({ id, name, post, created_at, }) => ({ 
        id, 
        title: name, 
        post_title: post?.title, 
        created_at, 
    }));

  return (
   <AuthenticatedLayout  user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stream</h2>}>
    <Head title='Stream' />

    <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm sm:rounded-lg p-4">
                <GenerateButton 
                onClick={() => setOpen(true)} 
                className='bg-purple-500 disabled:bg-purple-300'>
                        create
                </GenerateButton>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table datas={filteredDatas} setProps={setProps}/>
            </div>
            </div>
        </div>
        <CustomModal open={open} onClose={() => setOpen(false)}>
            <Create open={open} setOpen={setOpen}/>
        </CustomModal>
        </div>
   </AuthenticatedLayout>
  )
}
