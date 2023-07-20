import GenerateButton from '@/Components/GenerateButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Edit({ onClose, params, base_url }) {

    const [load, setLoad] = useState(false)
    const [prevBanner, setPrevBanner] = useState(null);
    const { data, setData, errors, processing, post, reset } = useForm({
        name: '',
        banner_img: '',
        redirect_to: ''
    })
    useEffect(() => {
        async function fetchData() {
            setLoad(true)
            try {
                const res = await axios.get(route('api.banner.edit', params));
                if (res.status === 200 && res.data) {
                    setData(prev => ({
                        ...prev,
                        name: res.data.banner.name,
                        redirect_to: res.data.banner.redirect_to,
                        banner_img: res.data.banner.banner_img
                    }))
                }
            } catch (error) {
                console.log('error banner edit');
            } finally {
                setLoad(false)
            }
        }
        fetchData();
    }, [params]);


    async function submit(e) {
        e.preventDefault();
        post(route('banner.update', params), {
            onSuccess: () => {
                reset();
                onClose();
            }
        })

    }

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageType = /image.*/;
        if (!imageFile.type.match(imageType)) {
            alert('File yang diunggah bukan gambar');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setData('banner_img', imageFile)
            setPrevBanner(reader.result);
        };

        reader.readAsDataURL(imageFile);
    };
    console.log(data);
    return (
        <div className='bg-white w-[50vh] p-3 rounded-lg shadow-2xl min-h-[20vh]'>
            {
                load ? <div className='p-1 rounded-full w-fit mx-auto mt-[5vh] bg-transparent'>
                    <ImSpinner9 color='rgb(168 85 247)' size={30} className='animate-spin' />
                </div> : <>

                    <form onSubmit={submit}>
                        <div className="space-y-2 ">
                            <div>
                                <InputLabel htmlFor='name' value='Banner Name' />
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
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <InputLabel htmlFor='name' value='Ridirect' />
                                <TextInput
                                    id="ridirect_to"
                                    type="text"
                                    name="redirect_to"
                                    value={data.redirect_to}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    onChange={(e) => setData('redirect_to', e.target.value)}
                                />
                                <InputError message={errors.redirect_to} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Banner</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleImageChange} />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 2048).</p>

                                <InputError message={errors.banner_img} />
                            </div>
                            {prevBanner ? (
                                <img
                                    src={prevBanner}
                                    alt="Preview"
                                    className="w-full h-32 object-contain object-center"
                                />
                            ) : (
                                data.banner_img ? (
                                   <div className="w-full flex justify-center">
                                     <LazyLoadImage
                                        effect="blur"
                                        src={`${base_url}/storage/${data.banner_img}`}
                                        className="object-contain h-32 object-center"
                                    />
                                   </div>
                                ) : <FaUserCircle size={40} color='#ffffff' />
                            )}
                        </div>



                        <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processing}>
                            update
                        </GenerateButton>
                    </form>

                </>
            }
        </div>
    )
}
