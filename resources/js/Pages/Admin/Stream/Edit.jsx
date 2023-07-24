import AsyncSelect from 'react-select/async';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md'
import axios from 'axios';
import { Head, router, useForm } from '@inertiajs/react';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';

export default function Edit({ streams }) {

    const { data, setData, put, errors, processing } = useForm({
        id: streams[0].id,
        streams: streams,
        post_id: streams[0].post_id
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

    const removeStream = (index) => {
        const updatedStream = [...data.streams];
        updatedStream.splice(index, 1);
        setData(prevState => ({
            ...prevState,
            streams: updatedStream
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
        put(route('stream.update', data.post_id), {
            onSuccess: () => {
                console.log('success');
            }
        })
    }
    return (
        <div className='bg-gray-100 min-h-screen' >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 bg-white">

                    <div className='w-full p-2 rounded-md  items-center max-h-[80vh] '>
                        <form onSubmit={submit} className='md:space-y-5 sm:space-y-2 space-y-1'>
                            <div className="flex space-x-2">
                                <button type='button' className='p-1 rounded-sm bg-yellow-400 h-fit text-white m-2 flex space-x-1 items-center' onClick={addStream}>
                                    <MdAdd size={20} color='#ffffff' />
                                    stream
                                </button>
                            </div>
                            <AsyncSelect
                                loadOptions={loadOptions}
                                onChange={handleChange}
                                getOptionLabel={(option) => option.title}
                                placeholder={data.streams[0].post.title}
                            />
                            <InputError message={errors.post_id} />
                            {
                                data.streams.map((stream, index) => (
                                    <div className='flex justify-between items-center w-full' key={index}>
                                        <div>
                                            <InputLabel htmlFor={`url${index}`} value='Url Stream' />
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
                                            <InputLabel htmlFor={`name${index}`} value='Name Stream' />
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
                            <GenerateButton
                                type={'submit'}
                                className='bg-purple-500 py-1 mt-2'
                                disabled={processing}
                            >
                                update
                            </GenerateButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
