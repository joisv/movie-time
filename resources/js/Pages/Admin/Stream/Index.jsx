import CustomModal from '@/Components/CustomModal';
import AsyncSelect from 'react-select/async';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import GenerateButton from '@/Components/GenerateButton';
import { formatDateTime } from '@/Helper/formatDate';
import { router } from '@inertiajs/react';


const title = {
    className: 'sm:text-3xl font-semibold text-xl ',
    translate: '    -translate-y-5'
}
const defInput = {
    className: 'text-base sm:font-medium font-extralight',
    translate: '-translate-y-5'
}

export default function Index({ auth, datastreams }) {

  const [ postData, setPostData ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ data, setData ] = useState({
    streams: [
        {
            name: '',
            url: ''
        }
    ],
    downloads: [
        {
            url_download: '',
            name_download: ''
        }
    ],
    post_id: ''
  })    
    const addStream = () => {
        setData(prevState => ({
        ...prevState,
        streams: [...prevState.streams, { 
            name: '',
            url: ''
        }]
        }));
    };
    const addDownload = () => {
        setData(prevState => ({
        ...prevState,
        downloads: [...prevState.downloads, { 
            name_download: '',
            download_url: ''
        }]
        }));
    };

    const removeStream = (index) => {
        const updatedStream = [...data.streams];
        updatedStream.splice(index, 1);
        setData(prevState => ({
            ...prevState,
            streams: updatedStream
        }));
    }
    const removeDownload = (index) => {
        const updatedDownload = [...data.downloads];
        updatedDownload.splice(index, 1);
        setData(prevState => ({
            ...prevState,
            downloads: updatedDownload
        }));
    }
    const getPost = async () => {
        const response = await axios.get(route('getpost'))
        setPostData(response.data)
        
    }
    
    const handleChange = (selectOptions) => {
        setData(prev => ({
            ...prev,
            post_id: selectOptions.id
        }))
    }

    const loadOptions = ( searhValue, callback) => {
        getPost();
        const filteredOptions = postData.filter(posts => posts.title.toLowerCase().includes(searhValue.toLowerCase()))
        callback(filteredOptions);
    }

   async function submit(e){
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(route('stream.store', data), {
                
            })
            console.log(response);
        } catch (error) {
            console.log(error);   
        } finally {
            setLoading(false)
            setOpen(false);
            
        }

    }

    async function destroy(id){
        setLoading(false)
        try {
            if(confirm('sure?')) {
                const response = await axios.delete(route('stream.destroy', id))
            }
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(true)
            router.reload()
        }
    }
  return (
   <AuthenticatedLayout  user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stream</h2>}>
    <Head title='Stream' />

    <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                    <button type="button" onClick={() => setOpen(true)}>create</button>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    post_title
                </th>
                <th scope="col" className="px-6 py-3">
                    Created
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
            datastreams.map((s, index) => (
                <tr className="bg-white border-b" key={index}>
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {s.name}
                    </th>
                    <td className="px-6 py-4">
                        { s.post.title }
                    </td>
                    <td className="px-6 py-4">
                        { formatDateTime(s.created_at) }
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                        <Link href={route('post.edit',s.id )}>edit</Link>
                        <button type="button" className='text-red-500' onClick={() => destroy(s.id)} disabled={loading}>
                           delete
                        </button>
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
</div>
                </div>
            </div>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <div className='md:max-w-[50vw] sm:max-w-[70vw] w-[95vw] p-2 rounded-md mt-[15vh] bg-white items-center '>
                <form onSubmit={submit}>
                <AsyncSelect loadOptions={loadOptions} onChange={handleChange} getOptionLabel={(option) => option.title} />
                    <button type='button' className='px-1 rounded-sm bg-yellow-400 h-fit text-white m-2' onClick={addStream}>add Stream</button>
                    <button type='button' className='px-1 rounded-sm bg-green-400 h-fit text-white m-2' onClick={addDownload}>add download</button>
                    {
                    data.streams.map((stream, index) => (
                        <div className='flex justify-between items-center w-full' key={index}>
                        <div>
                            <InputLabel htmlFor={`url${index}`} value='Url'/>
                            <TextInput 
                                id={`url${index}`}
                                type="text"
                                name="url"
                                value={stream.url}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                placeholder='https://youtube.com'
                                onChange={(e) => {
                                    const updateStream = [...data.streams];
                                    updateStream[index] = { 
                                        ...updateStream[index], 
                                        url: e.target.value,
                                     };
                                    setData(prevState => ({
                                        ...prevState,
                                        streams: updateStream
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor={`name${index}`} value='Name'/>
                            <TextInput 
                                id={`name${index}`}
                                type="text"
                                name="name"
                                value={stream.name}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                placeholder={`server ${index+1}`}
                                onChange={(e) => {
                                    const updateStream = [...data.streams];
                                    updateStream[index] = { 
                                        ...updateStream[index], 
                                        name: e.target.value,
                                     };
                                    setData(prevState => ({
                                        ...prevState,
                                        streams: updateStream
                                    }));
                                }}
                            />
                        </div>
                        <button type="button" className='px-1 rounded-sm bg-red-400 h-fit text-white' onClick={() => removeStream(index)}>del</button>
                    </div>
                    ))
                   }
                   {
                    data.downloads.map((download, index) => (
                        <div className='flex justify-between items-center w-full' key={index}>
                        <div>
                            <InputLabel htmlFor={`url_download${index}`} value='url_download'/>
                            <TextInput 
                                id={`url_download${index}`}
                                type="text"
                                name="url_download"
                                value={download.url_download}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                placeholder='https://download.com'
                                onChange={(e) => {
                                    const updatedDownload = [...data.downloads];
                                    updatedDownload[index] = { 
                                        ...updatedDownload[index], 
                                        url_download: e.target.value,
                                     };
                                    setData(prevState => ({
                                        ...prevState,
                                        downloads: updatedDownload
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor={`name_download${index}`} value='Name Download'/>
                            <TextInput 
                                id={`name_download${index}`}
                                type="text"
                                name="name_download"
                                value={download.name_download}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                placeholder='Google drive'
                                onChange={(e) => {
                                    const updatedDownload = [...data.downloads];
                                    updatedDownload[index] = { 
                                        ...updatedDownload[index], 
                                        name_download: e.target.value,
                                     };
                                    setData(prevState => ({
                                        ...prevState,
                                        downloads: updatedDownload
                                    }));
                                }}
                            />
                        </div>
                        
                        <button type="button" className='px-1 rounded-sm bg-red-400 h-fit text-white' onClick={() => removeDownload(index)}>del</button>
                    </div>
                    ))
                   }
                   <GenerateButton 
                    type={'submit'}
                    className='bg-purple-500 py-1 mt-2'
                    disabled={loading}
                   >
                    create
                   </GenerateButton>
                    </form>
                </div>
            </CustomModal>
    </div>
   </AuthenticatedLayout>
  )
}
