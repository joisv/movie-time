import { formatDateTime } from '@/Helper/formatDate'
import React from 'react'

export default function CustomTale({ datas, setOpenModal, setId }) {
    
    const handleClick = (id, user_id) => {
        setOpenModal(true)
        setId(id, user_id)
    }
    
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Request table
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
        </caption>
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
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
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
                    <td className="px-6 py-4 text-right">
                        <button type="button"  onClick={() => handleClick(data.id, data.user_id)} >
                            <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                        </button>
                    </td>
                </tr>

                ))
            }
        </tbody>
    </table>
    </div>
  )
}
