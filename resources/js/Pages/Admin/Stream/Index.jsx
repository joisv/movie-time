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
import Table from '@/Components/Table';
import InputError from '@/Components/InputError';
import { MdAdd } from 'react-icons/md'


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

export default function Index({ auth, datastreams }) {
  const [ postData, setPostData ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ data, setData ] = useState({
    streams: [
        {
            name: '',
            url: '',
            error: ''
        }
    ],
    downloads: [
        {
            url_download: '',
            name_download: '',
            error: ''
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

    const [ err, setErr ] = useState({
        stream: {
            message: ''
        },
        downloads: {
            message: ''
        },
        post_id: {
            message: ''
        }
    })
    
   async function submit(e){
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(route('stream.store', data))
            
        } catch (error) {
            if (error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                
            } else {
                console.log(error.response.status);
                // Lakukan penanganan kesalahan lainnya di sini
            }   
        } finally {
            setLoading(false)
            // setOpen(false);
            
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
                   <GenerateButton onClick={() => setOpen(true)} className='bg-purple-500 disabled:bg-purple-300'>create</GenerateButton>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table datas={filteredDatas}  th={th} destroyUrl={destroyUrl}/>
                </div>
                </div>
            </div>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <div className='md:max-w-[50vw] sm:max-w-[70vw] w-[95vw] p-2 rounded-md  bg-white shadow-2xl items-center max-h-[80vh] overflow-y-scroll'>
                <form onSubmit={submit} className='md:space-y-5 sm:space-y-2 space-y-1'>
                   <div className="flex space-x-2">
                   <button type='button' className='p-1 rounded-sm bg-yellow-400 h-fit text-white m-2 flex space-x-1 items-center' onClick={addStream}>
                        <MdAdd size={20} color='#ffffff' />
                        stream
                    </button>
                    <button type='button' className='p-1 rounded-sm bg-green-400 h-fit text-white m-2 flex space-x-1 items-center' onClick={addDownload}>
                    <MdAdd size={20} color='#ffffff' />
                        download
                    </button>
                   </div>
                <AsyncSelect loadOptions={loadOptions} onChange={handleChange} getOptionLabel={(option) => option.title} required placeholder='Choose Movie'/>
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
                                required
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
                            <InputError message={stream[index]}/>
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
                                required
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
                                required
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
                                required
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
