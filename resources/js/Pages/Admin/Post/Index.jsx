import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';

import Table from '@/Components/Table';
import Pagination from '@/Components/Pagination';
import useDebounce from '@/hooks/useDebounce';
import useHooks from '@/hooks/useHooks';

const setProps = {
  th: ['title', 'tmdb_id', 'created_at', 'poster', 'actions'],
  destroyUrl: 'post.destroy',
  bulkDeleteUrl: 'post.bulkdelete',
  handleEdit: (params) => {
    router.visit(route('post.edit', params))
  }
}

export default function Index({ auth, posts, }) {

  const { flash, web_name } = usePage().props
  const [tmdbId, setTmdbId] = useState(null);
  const [postdata, setPosData] = useState(posts)
  const { data, post, loading, err } = useHooks();
  const { data: searchDebouncedValue, get: getData, loading: loadingSearch, err: errorSearch } = useHooks();

  async function handleGenerate() {
    post(route('generate', tmdbId), {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.log(err);
      }
    })
  }
  const [searchTerm, setSearchTerm] = useState({
    search: ''
  });

  const debouncedSearchTerm = useDebounce(searchTerm.search, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getData(route('search', { search: debouncedSearchTerm }), {
        onSuccess: () => {
          setPosData(searchDebouncedValue);
        },
      });
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const filteredDatas = posts.data.map(({ id, title, tmdb_id, created_at, poster_path }) =>
  ({
    id,
    title,
    tmdb_id,
    created_at,
    poster: poster_path
  }));
  const filteredDatasSearch = postdata?.data?.map(({ id, title, tmdb_id, created_at, poster_path }) =>
  ({
    id,
    title,
    tmdb_id,
    created_at,
    poster: poster_path
  }));

  function displayData() {
    const datas = searchTerm.search ? filteredDatasSearch : filteredDatas;

    return <Table datas={datas} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setProps={setProps} base_url={web_name.base_url}/>;
  }

  const [open, setOpen] = useState(false)
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 relative">
            <div className='flex justify-between'>
              <GenerateButton className='bg-purple-500' onClick={() => router.visit(route('post.create'))} >create</GenerateButton>
              <div className='flex items-center space-x-3 h-fit'>
                <div className='flex flex-col justify-center'>
                  <input type="text" id="default-input" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 ${err ? 'border-2 border-red-400' : 'border-gray-300'}`} autoComplete='off' placeholder='tmdb id'
                    onChange={(e) => setTmdbId(e.target.value)}
                  />
                  {err && <InputError message={err} />}
                </div>
                <GenerateButton children='generate' disabled={loading} onClick={() => handleGenerate()} className='bg-purple-700 h-fit' type={'button'} />
              </div>
            </div>
            {displayData()}
            <Pagination data={posts} />
          </div>
        </div>
      </div>
      {/* <CustomModal open={open} onClose={() => setOpen(false)}>
        <Create />
      </CustomModal> */}
    </AuthenticatedLayout>
  )
}
