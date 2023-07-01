import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import useHook from '@/hooks/useHook';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';

import axios from 'axios';
import Table from '@/Components/Table';

export default function Index({ auth, posts, filters }) {
  const [ tmdbId, setTmdbId ] = useState();
  const [ postdata, setPosData ] = useState(posts)
  const { generateMovie, err, result, loading } = useHook();
  function handleGenerate() {
    generateMovie(tmdbId)
  }

  const [ searchTerm, setSearchTerm ] = useState({
    search : ''
  })

  const handleSearchChange = async (e) => {
    setSearchTerm(prev => ({ ...prev, search: e.target.value }));
    try {
        const response = await axios.get(route('search',searchTerm))
        setPosData(response.data)
    } catch (error) {
        console.log(error);
        
    }
};
    function displayData () {
        switch (searchTerm.search) {
            case '':
              return <Table datas={posts} handleSearchChange={handleSearchChange} searchTerm={searchTerm} />;
            default:
              return <Table datas={postdata} handleSearchChange={handleSearchChange} searchTerm={searchTerm} />;
          }
    }
  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />

        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                    <div className='flex justify-between'>
                      <Link href={route('post.create')}>Create</Link>
                      <div className='flex items-center space-x-3 h-fit'>
                        <div className='flex flex-col justify-center'>
                          <input type="text" id="default-input" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 ${ err ? 'border-2 border-red-400' : 'border-gray-300' }`} autoComplete='off' placeholder='tmdb id'
                              onChange={(e) => setTmdbId(e.target.value)}
                            />
                            { err && <InputError message={err}/>}
                        </div>
                        <GenerateButton children='generate' disabled={loading} handleButton={handleGenerate} className='bg-purple-700 h-fit' type={'button'}/>
                      </div>
                    </div>
                   {displayData()}
                </div>
            </div>
            {/* {
              err ? err : result.data
            } */}
        </div>
    </AuthenticatedLayout>
  )
}
