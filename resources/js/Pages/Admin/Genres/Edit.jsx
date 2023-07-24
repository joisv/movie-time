import GenerateButton from '@/Components/GenerateButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'

export default function Edit({ open, setOpen, params }) {
    const [load, setLoad] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [roles, setRoles] = useState([]);
    const { data: data, setData, errors, processing, put,  } = useForm({
        name: ''
    })
    useEffect(() => {
        async function fetchData() {
            setLoad(true)
            try {
                const res = await axios.get(route('api.genre.show', params));
                if (res.status === 200 && res.data) {
                    setData(prevData => ({
                        ...prevData,
                        name: res.data.genre?.name
                    }));
                    setPermissions(res.data.permissions)
                    setRoles(res.data.roles)
                }
            } catch (error) {

            } finally {
                setLoad(false)
            }
        }
        fetchData();
    }, []);


    async function submit(e) {
        e.preventDefault();
        put(route('genres.update', params), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }


    return (
        <div className='bg-white w-[50vh] p-3 rounded-lg shadow-2xl min-h-[20vh]'>
            {
                load ? <div className='p-1 rounded-full w-fit mx-auto mt-[5vh] bg-transparent'>
                    <ImSpinner9 color='rgb(168 85 247)' size={30} className='animate-spin' />
                </div> : <>
                    <form onSubmit={submit}>
                        <InputLabel htmlFor='name' value='Genre name' />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data?.name}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        <InputError message={errors.name} />

                        <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processing}>
                            update
                        </GenerateButton>
                    </form>
                   
                </>
            }

        </div>
    )
}
