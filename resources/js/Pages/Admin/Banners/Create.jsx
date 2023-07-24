import GenerateButton from '@/Components/GenerateButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'

export default function Create({ setOpen }) {

    const [ prevBanner, setPrevBanner ] = useState(null);
    const { data, setData, errors, processing, post, reset } = useForm({
        name: '',
        banner_img: '',
        redirect_to: ''
    })

    function submit(e) {
        e.preventDefault();
        post(route('banner.store', data), {
            onSuccess: () => {
                setOpen(false),
                    reset()
            },
            onError: () => setOpen(true),
        })

    }
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageType = /image.*/;
        const inputName = event.target.name;
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
    return (
        <div className='bg-white w-[50vh] p-3 rounded-lg shadow-2xl'>
            <form onSubmit={submit}>
                <div className="space-y-2">
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
                    </div>
                    {
                        prevBanner ? <img src={prevBanner} alt="" className='w-full h-32 object-contain object-center' /> : null
                    }
                </div>



                <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processing}>
                    Create
                </GenerateButton>
            </form>
        </div>
    )
}
