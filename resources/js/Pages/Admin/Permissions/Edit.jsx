import GenerateButton from '@/Components/GenerateButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'

export default function Edit({ open, setOpen, params }) {
    const [load, setLoad] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [roles, setRoles] = useState([]);
    const { data: dataPermission, setData: setDataPermission, errors: errorsPermission, processing: processingPermission, put: updatePermission, delete: permissionRemove } = useForm({
        name: ''
    })
    useEffect(() => {
        async function fetchData() {
            setLoad(true)
            try {
                const res = await axios.get(route('api.permission.show', params));
                if (res.status === 200 && res.data) {
                    setDataPermission(prevData => ({
                        ...prevData,
                        name: res.data.permissions.name
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
        updatePermission(route('permissions.update', params), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }

    const { data: dataRole, setData: setDataRole, errors: errorsRole, processing: processingRole, post: postRole } = useForm({
        role: ''
    })

    function assignRole(e) {
        e.preventDefault();
        postRole(route('permissions.role', permissions.id), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }

    function permissionRoleRemove(id) {
        if (confirm('remove role ?')) permissionRemove(route('permissions.role.remove', id), {
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
                        <InputLabel htmlFor='name' value='Permission name' />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={dataPermission?.name}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setDataPermission(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        <InputError message={errorsPermission.name} />

                        <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processingPermission}>
                            update
                        </GenerateButton>
                    </form>
                    <label htmlFor="permission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role Permissions</label>
                    <div className='flex space-x-1 mb-2 '>
                        {
                            permissions.roles?.map((permission_role, index) => (
                                <button type='button' onClick={() => permissionRoleRemove([permissions.id, permission_role.id])}
                                    className='text-xs p-1 bg-red-500 text-white rounded-md text-center' key={index}>{permission_role.name}
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
