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
    const [role, setRole] = useState([]);
    const { data: roleData, setData: setDataRole, processing: processingRole, errors: errorsRole, put: submitRole, delete:destroyRole } = useForm({
        name: ''
    })
    console.log(role);
    const { data: permissionData, setData: setDataPermission, processing: processingPermission, errors: errorPermisson, post: postPermission } = useForm({
        permission: ''
    })
    useEffect(() => {
        async function fetchData() {
            setLoad(true)
            try {
                const res = await axios.get(route('api.roles.show', params));
                if (res.status === 200 && res.data) {
                    setDataRole(prevData => ({
                        ...prevData,
                        name: res.data.role.name
                    }));
                    setRole(res.data.role);
                    setPermissions(res.data.permissions)
                }
            } catch (error) {

            } finally {
                setLoad(false)
            }
        }
        fetchData();
    }, [params]);


    async function submit(e) {
        e.preventDefault();
        submitRole(route('roles.update', params), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        })
    }
    function submitPermission(e) {
        e.preventDefault();
        postPermission(route('givepermission', role.id), {
            onSuccess: () => {
                setOpen(false)
            },
            onError: () => {
                setOpen(true)
            }
        })
    }

    function roleDestroy(id){
       if(confirm('remove permission ?')){
        destroyRole(route('roles.permission.revoke', id), {
            onSuccess: () => {
                setOpen(false)
            },
            onError: () => {
                setOpen(true)
            }
        })
       }
    }
    return (
        <div className='bg-white w-[50vh] p-3 rounded-lg shadow-2xl min-h-[20vh]'>
            {
                load ? <div className='p-1 rounded-full w-fit mx-auto mt-[5vh] bg-transparent'>
                    <ImSpinner9 color='rgb(168 85 247)' size={30} className='animate-spin' />
                </div> : <>

                    <form onSubmit={submit}>
                        <InputLabel htmlFor='name' value='Roles name' />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={roleData?.name}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setDataRole(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        <InputError message={errorsRole.name} />

                        <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processingRole}>
                            update
                        </GenerateButton>
                    </form>
                    <label htmlFor="permission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role Permissions</label>
                    <div className='flex space-x-1 mb-2 '>
                        {
                            role.permissions?.map((role_permission, index) => (
                                <button type='button' onClick={() => roleDestroy([role.id, role_permission.id]) }
                                    className='text-xs p-1 bg-red-500 text-white rounded-md text-center' key={index}>{role_permission.name}
                                </button>
                            ))
                        }
                    </div>
                    <form onSubmit={submitPermission}>
                       
                        <select
                            id="permission"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                            onChange={(e) => setDataPermission('permission', e.target.value)}
                        >
                            <option disabled selected value="choose">Choose permission</option>
                            {
                                permissions.map((permission, index) => (
                                    <option value={permission.name} key={index}>{permission.name}</option>
                                ))
                            }
                        </select>
                        <GenerateButton type={'submit'} className='bg-cyan-500 mt-2' disabled={processingPermission}>
                            assign
                        </GenerateButton>
                    </form>
                </>
            }
        </div>
    )
}
