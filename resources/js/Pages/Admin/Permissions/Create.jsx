import GenerateButton from '@/Components/GenerateButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React from 'react'

export default function Create({ open, setOpen }) {
   
    const {data, setData, errors, processing, post, reset } = useForm({
        name: ''
    })

    function submit(e){
        e.preventDefault();
        post(route('permissions.store', data) ,{
            onSuccess:() => {
                setOpen(false),
                reset()
            },
            onError:() => setOpen(true),
        })
        
    }
  return (
    <div className='bg-white w-[40vh] p-3 rounded-lg shadow-2xl'>
        <form onSubmit={submit}>
            <InputLabel htmlFor='name' value='Permission name'/>
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
            <InputError message={errors.name}/>

            <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processing}>
                Create
            </GenerateButton>
        </form>
    </div>
  )
}
