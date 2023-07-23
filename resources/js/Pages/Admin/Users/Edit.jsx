import GenerateButton from '@/Components/GenerateButton'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'

export default function Edit({ open, setOpen, params }) {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState([])
    const [roles, setRoles] = useState([]);
    const { data: dataUser, setData: setDataUser, errors: errorsUser, processing: processingUser, patch: updateUser, delete: userRemove } = useForm({
        name: '',
        email: ''
    })
    console.log(dataUser);
    useEffect(() => {
        async function fetchData() {
            setLoad(true)
            try {
                const res = await axios.get(route('api.user.show', params));
                if (res.status === 200 && res.data) {
                    setDataUser(prevData => ({
                        ...prevData,
                        name: res.data.user.name,
                        email: res.data.user.email
                    }));
                    setRoles(res.data.roles)
                    setUser(res.data.user)
                }
            } catch (error) {

            } finally {
                setLoad(false)
            }
        }
        fetchData();
    }, []);

    console.log(user);
    async function submit(e) {
        e.preventDefault();
        updateUser(route('profile.update', user.id), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }

    const { data: dataRole, setData: setDataRole, errors: errorsRole, processing: processingRole, post: postRole, } = useForm({
        role: ''
    })

    function assignRole(e) {
        e.preventDefault();
        postRole(route('users.roles', user.id), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }

    function userRoleRemove(id) {
        if (confirm('remove role from this user ?')) userRemove(route('users.roles.remove', id), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }

    return (
        <div className='bg-white w-[60vh] p-3 rounded-lg shadow-2xl min-h-[20vh]'>
            {
                load ? <div className='p-1 rounded-full w-fit mx-auto mt-[5vh] bg-transparent'>
                    <ImSpinner9 color='rgb(168 85 247)' size={30} className='animate-spin' />
                </div> : <>
                    {/* <form onSubmit={submit} className='space-y-2'>
                        <div>
                        <InputLabel htmlFor='name' value='User name' />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={dataUser?.name}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setDataUser(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        <InputError message={errorsUser.name} />
                        </div>
                        <div>
                        <InputLabel htmlFor='email' value='User email' />
                        <TextInput
                            id="email"
                            type="text"
                            name="name"
                            value={dataUser?.email}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) => setDataUser(prev => ({
                                ...prev,
                                email: e.target.value
                            }))}
                        />
                        <InputError message={errorsUser.name} />
                        </div>

                        <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processingUser}>
                            update
                        </GenerateButton>
                    </form> */}
                    <label htmlFor="permission" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mt-2">Role Permissions</label>
                    <div className='flex space-x-1 mb-2'>
                        {
                            user.roles?.map((user_role, index) => (
                                <button type='button' onClick={() => userRoleRemove([user.id, user_role.id])}
                                    className='text-xs p-1 bg-red-500 text-white rounded-md text-center' key={index}>{user_role.name}
                                </button>
                            ))
                        }
                    </div>
                    <form onSubmit={assignRole}>

                        <select
                            id="permission"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                            onChange={(e) => setDataRole('role', e.target.value)}
                        >
                            <option disabled selected value="choose">Choose permission</option>
                            {
                                roles.map((role, index) => (
                                    <option value={role.name} key={index}>{role.name}</option>
                                ))
                            }
                        </select>
                        <GenerateButton type={'submit'} className='bg-cyan-500 mt-2' disabled={processingRole}>
                            assign
                        </GenerateButton>
                    </form>

                </>
            }

        </div>
    )
}
