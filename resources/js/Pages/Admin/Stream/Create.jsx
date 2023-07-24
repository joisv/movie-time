import AsyncSelect from 'react-select/async';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md'
import axios from 'axios';
import { router, useForm } from '@inertiajs/react';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';

export default function Create({ open, setOpen }) {

    const { data, setData, errors, processing, post, hasErrors } = useForm({
        streams: [
            {
                name: '',
                url: '',
            }
        ],
        downloads: [
            {
                url_download: '',
                name_download: '',
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
                url_download: ''
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
    const loadOptions = async (searchValue, callback) => {
        try {
            const response = await axios.get(route('getpost'));
            const postData = response.data;

            const filteredOptions = postData.filter(post =>
                post.title.toLowerCase().includes(searchValue.toLowerCase())
            );

            const options = filteredOptions.map(post => ({
                post_id: post.id,
                title: post.title
            }));

            callback(options);
        } catch (error) {
            // Handle error jika diperlukan
        }
    };

    const handleChange = (selectedOption) => {
        setData(prevData => ({
            ...prevData,
            post_id: selectedOption.post_id
        }));
    };

    async function submit(e) {
        e.preventDefault();
        post(route('stream.store'), {
            onSuccess: () => {
                setOpen(false);
            },
        })
    }

    return (
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
                <AsyncSelect
                    loadOptions={loadOptions}
                    onChange={handleChange}
                    getOptionLabel={(option) => option.title}
                    required
                    placeholder='Choose Movie'
                />
                {
                    data.streams.map((stream, index) => (
                        <div className='flex justify-between items-center w-full' key={index}>
                            <div>
                                <InputLabel htmlFor={`url${index}`} value='Url' />
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
                               <p className='text-sm text-red-500 font-medium'>{errors[`streams.${index}.url`]}</p>
                                
                            </div>
                            <div>
                                <InputLabel htmlFor={`name${index}`} value='Name' />
                                <TextInput
                                    id={`name${index}`}
                                    type="text"
                                    name="name"
                                    value={stream.name}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    required
                                    placeholder={`server ${index + 1}`}
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
                                <p className='text-sm text-red-500 font-medium'>{errors[`streams.${index}.name`]}</p>
                            </div>
                            <button type="button" className='px-1 rounded-sm bg-red-400 h-fit text-white' onClick={() => removeStream(index)}>del</button>
                        </div>
                    ))
                }
                {
                    data.downloads.map((download, index) => (
                        <div className='flex justify-between items-center w-full' key={index}>
                            <div>
                                <InputLabel htmlFor={`url_download${index}`} value='url_download' />
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
                                <p className='text-sm text-red-500 font-medium'>{errors[`downloads.${index}.url_download`]}</p>
                            </div>
                            <div>
                                <InputLabel htmlFor={`name_download${index}`} value='Name Download' />
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
                                <p className='text-sm text-red-500 font-medium'>{errors[`downloads.${index}.name_download`]}</p>
                            </div>

                            <button type="button" className='px-1 rounded-sm bg-red-400 h-fit text-white' onClick={() => removeDownload(index)}>del</button>
                        </div>
                    ))
                }
                <GenerateButton
                    type={'submit'}
                    className='bg-purple-500 py-1 mt-2'
                    disabled={processing}
                >
                    create
                </GenerateButton>
            </form>
        </div>
    )
}
