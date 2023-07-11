import GenerateButton from '@/Components/GenerateButton'
import InputError from '@/Components/InputError'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'

const options = [
    {
        option: 'open',
        message: 'The report is open and currently being worked on.'
    },
    {
        option: 'close',
        message: 'The report is closed and no longer being worked on.'
    }
]

export default function Edit({ open, setOpen, params }) {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState([])
    const { data, setData, errors, processing, patch, } = useForm({
        user_id: '',
        message: '',
        status: ''
    })
 
    useEffect(() => {
        async function fetchData() {
            setLoad(true)
            try {
                const res = await axios.get(route('api.report.show', params));
                if (res.status === 200 && res.data) {
                   setUser(res.data.report.user)
                }
            } catch (error) {

            } finally {
                setLoad(false)
            }
        }
        fetchData();
    }, []);

    
    const handleChange = (e) => {
        const selectedOption = e.target.value === 'open' ? options[0] : options[1];
        
        setData({
            message: selectedOption.message,
            status: e.target.value,
            user_id: user.id
        });
    };
    async function submit(e) {
        e.preventDefault();
        patch(route('report.update', params), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
                console.log(errors);
            }
        })
    }
    console.log(data);
    return (
        <div className='bg-white w-[60vh] p-3 rounded-lg shadow-2xl min-h-[20vh]'>
            {
                load ? <div className='p-1 rounded-full w-fit mx-auto mt-[5vh] bg-transparent'>
                    <ImSpinner9 color='rgb(168 85 247)' size={30} className='animate-spin' />
                </div> : <>
                    <form onSubmit={submit} className='space-y-2'>
                        <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an status</label>
                        <select id="report" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  onChange={handleChange}>
                            <option selected disabled>Choose a status</option>
                            {
                                options.map((option, index) => (
                                    <option value={option.option} key={index}>{option.option}</option>
                                ))
                            }
                        </select>
                        <InputError message={errors.status} />

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your notification message here... (optional)" value={data.message} onChange={(e) => setData('message', e.target.value)}></textarea>
                        <InputError message={errors.message} />

                        <GenerateButton type={'submit'} className='bg-purple-500 mt-2' disabled={processing}>
                            update
                        </GenerateButton>
                    </form>


                </>
            }

        </div>
    )
}
