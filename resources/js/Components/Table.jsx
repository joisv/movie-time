import { formatDateTime } from '@/Helper/formatDate';
import { Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import GenerateButton from './GenerateButton';
import React, { useState } from 'react';
import useHooks from '@/hooks/useHooks';

const open = 'bg-red-500 text-black'
const completed = 'bg-blue-400 text-text'
const pending = 'bg-yelloww-400 text-black'

export default function Table({ datas, handleSearchChange, searchTerm, setProps, base_url }) {

    const { destroy: deleteById, loading, data: response, err } = useHooks();
    const { data, setData, delete: bulkDelete, errors } = useForm({
        postId: []
    })
    const [action, setAction] = useState(false);

    const destroy = (id) => {
        console.log(setProps.destroyUrl);
        if (confirm('sure')) bulkDelete(route(setProps?.destroyUrl, id));
    }
    const handleCheckboxChange = (e, id) => {
        if (e.target.checked) {
            setData('postId', [...data.postId, id]);
        } else {
            setData('postId', data.postId.filter(postId => postId !== id));
        }
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center justify-between pb-4 w-full mt-1">
                    <div className="flex space-x-2 items-center">
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" value={searchTerm?.search}
                            onChange={handleSearchChange} />
                    </div>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        {
                            setProps?.th.map((t, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>
                                    {t}
                                </th>

                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        datas?.map((post, index) => (

                            <tr className="bg-white border-b" key={index}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${index}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            value={data.postId}
                                            onChange={e => handleCheckboxChange(e, post.id)}

                                        />
                                        <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                {Object.entries(post).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        {key === 'status' ? <td className='px-6 py-4'>
                                            <span className={`h-fit p-1 rounded-md ${value === 'open' ? open : value === 'close' ? completed : value === 'completed' ? completed : value === 'pending' ? pending : value === 'release' ? open : 'bg-transparent'}`}>
                                                {value}
                                            </span>
                                        </td> : key === 'banner_img' ? <td className='px-6 py-4'>
                                            <img src={`${base_url}/storage/${value}`} className='w-12 h-12 rounded-full object-cover object-center' />
                                        </td> :
                                            key === 'id' ? <td className="hidden">
                                                {value}
                                            </td> :

                                                key === 'title' ? (
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                                                        {value}
                                                    </th>
                                                ) : key === 'created_at' ? (
                                                    <td className="px-6 py-4">{formatDateTime(value)}</td>
                                                ) : (
                                                    <td className="px-6 py-4">{value}</td>
                                                )}
                                    </React.Fragment>
                                ))}

                                <td className="px-6 py-4 flex space-x-2">
                                    <button type='button' onClick={() => setProps?.handleEdit(post.id)}>edit</button>
                                    <button type="button" onClick={() => destroy(post.id)} className='text-red-500'>delete</button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
