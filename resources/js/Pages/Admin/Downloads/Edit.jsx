import AsyncSelect from 'react-select/async';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md'
import axios from 'axios';
import { Head, router, useForm } from '@inertiajs/react';
import GenerateButton from '@/Components/GenerateButton';
import InputError from '@/Components/InputError';

export default function Edit({ downloads }) {

    const { data, setData, put, errors, processing } = useForm({
        downloads: downloads,
        post_id: downloads[0].post_id
    })

    const addDownload = () => {
        setData(prevState => ({
          ...prevState,
          downloads: [
            ...prevState.downloads,
            {
              name_download: '',
              url_download: ''
            }
          ]
        }));
      };

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
        put(route('download.update', data.post_id), {
            onSuccess: () => {
                console.log('success');
            }
        })
    }
    console.log(data);
    return (
        <div className='bg-gray-100 min-h-screen' >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 bg-white">

                    <div className='w-full p-2 rounded-md  items-center max-h-[80vh] '>
                        <form onSubmit={submit} className='md:space-y-5 sm:space-y-2 space-y-1'>
                            <div className="flex space-x-2">
                                <button type='button' className='p-1 rounded-sm bg-green-400 h-fit text-white m-2 flex space-x-1 items-center' onClick={addDownload}>
                                    <MdAdd size={20} color='#ffffff' />
                                    download
                                </button>
                            </div>
                            <AsyncSelect
                                loadOptions={loadOptions}
                                onChange={handleChange}
                                getOptionLabel={(option) => option.title}
                                placeholder={downloads[0].post.title}
                                defaultValue={downloads.title}
                            />
                            <InputError message={errors.post_id} />
                           
                            {
                               data.downloads.map((download, index) => (
                                    <div className='flex justify-between items-center w-full' key={index}>
                                        <div>
                                            <InputLabel htmlFor={`url_download${index}`} value='Url Download' />
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
                                update
                            </GenerateButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
