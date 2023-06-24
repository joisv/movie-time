import React from 'react'
import UserLayouts from './Layouts/UserLayouts'

import CustomTextInput from '@/Components/CustomTextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import { formatDateTime } from '@/Helper/formatDate'

export default function Request({ auth, datas }) {

  const { data, setData, processing, post, reset } = useForm({
    content: '',
    user_id: auth?.user.id,
    status: 'pending'
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('request.store'), {
      onSuccess: () => {
        reset();
      }
    })
  }
  return (
    <UserLayouts user={auth?.user}>
        <div className='h-screen  bg-secondaryBtn text-text p-4 space-y-6'>
          <div className='flex justify-between'>
            <h1 className='text-text text-lg font-semibold'>Request page</h1>
            <div className='w-[70%]'>
            <form onSubmit={submit}>
                <div className='text-secondaryBtn flex items-center space-x-2'>
                  <CustomTextInput 
                    id="request"
                    type="text"
                    name="Request"
                    value={data.content}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('content', e.target.value)}
                    />
                    <PrimaryButton disabled={processing}>
                        req
                    </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
          <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
       
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Requester
                </th>
                <th scope="col" className="px-6 py-3">
                    Content
                </th>
                <th scope="col" className="px-6 py-3">
                    Created_at
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            {
                datas.map((data, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.user.name}
                    </th>
                    <td className="px-6 py-4">
                        {data.content}
                    </td>
                    <td className="px-6 py-4">
                        {formatDateTime(data.created_at)}
                    </td>
                    <td className="px-6 py-4">
                        <div className={`px-1 w-fit ${data.status == 'pending' ? 'bg-yellow-300 text-black' : data.status == 'completed' ? 'bg-green-400 text-text' : 'bg-red-400 text-text'}`}>
                            {data.status}
                        </div>
                    </td>
                </tr>

                ))
            }
        </tbody>
    </table>
    </div>
          </div>
        </div>
    </UserLayouts>
  )
}
