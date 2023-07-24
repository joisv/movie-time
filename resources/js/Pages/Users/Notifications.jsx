import React, { useState } from 'react'
import { formatDateTime } from '@/Helper/formatDate'
import CustomModal from '@/Components/CustomModal';
import axios from 'axios';
import AuthLayout from '@/Layouts/AuthLayout';
import NoDataDisplay from '@/Components/NoDataDisplay';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Head, useForm, usePage } from '@inertiajs/react';
import { MdOutlineReportGmailerrorred } from 'react-icons/md'

const issueOpen = 'bg-red-500 text-black'
const completed = 'bg-blue-400 text-text'

export default function Notifications({ auth, datas }) {


    const [open, setOpen] = useState(false);
    const [displayData, setDisplayData] = useState({});
    const [activeIndex, setActiveIndex] = useState(false);
    const [mdl, setMdl] = useState(false);
    const [updateData, setUpdateData] = useState({
        id: '',
    });

    const openNotification = async (id, index) => {
        if (datas[index].is_read === 0) {
            setDisplayData(datas[index]);
            setUpdateData(prevdata => ({
                ...prevdata,
                id: id
            }));
            setOpen(true);
            try {
                const response = await axios.patch(route('notification.update', id));
                console.log(response);
            } catch (error) {
                console.log(error);

            }
        } else {
            setOpen(true);
            setDisplayData(datas[index]);
        }
    }


    function handleButton(index) {
        setActiveIndex(index);
        setMdl(prev => !prev);
    }

    const { data, setData, processing, errors, delete: destroy } = useForm({});
    const { web_name } = usePage().props

    const deleteNotification = (id) => {
        destroy(route('usernotifications.destroy', id), {
            onSuccess: () => {
                console.log('success');
            },
        });
    };

    if (datas.length === 0) {
        return (
            <AuthLayout user={auth?.user}>
                <Head>
                    <title>Notifications</title>
                    <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="Notifications" />
                    <meta property="og:description" content="Pemberitahuan tentang film atau acara TV baru yang dirilis, pembaruan, atau rekomendasi berdasarkan preferensi pengguna." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <h1 className='text-text text-lg font-semibold'>Notifications page</h1>
                <NoDataDisplay>no Notifications</NoDataDisplay>
            </AuthLayout>
        );
    }
    return (
        <>
            <AuthLayout user={auth?.user}>
                <Head>
                    <title>Notifications</title>
                    <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
                    <meta property="og:title" content="Notifications" />
                    <meta property="og:description" content="Pemberitahuan tentang film atau acara TV baru yang dirilis, pembaruan, atau rekomendasi berdasarkan preferensi pengguna." />
                    <meta property="og:url" content={window.location.url} />
                </Head>
                <div className='h-screen bg-secondaryBtn p-4 space-y-2'>
                    <h1 className='text-text text-lg font-semibold'>Notifications page</h1>
                    {
                        datas.map((data, index) => (
                            <div key={index} className='space-y-1'>
                                <div className="w-full flex justify-end relative" >
                                    <button type='button' onClick={() => handleButton(index)}>
                                        <BsThreeDotsVertical size={12} color='#ffffff' />
                                    </button>
                                    {
                                        mdl && index === activeIndex ? <div className={`py-1 px-2 rounded-md bg-secondaryBtn absolute z-50 top-4 hover:bg-gray-500 text-white border border-secondaryAccent `}>
                                            <button type='button' onClick={() => deleteNotification(data.id)}>delete</button>
                                        </div> : null
                                    }
                                </div>
                                <div className={`relative w-full p-4 font-medium rounded-md hover:opacity-75 cursor-pointer ease-in duration-200 ${data.is_read === 0 ? 'bg-yellow-200' : 'bg-gray-300'}`}
                                    onClick={() => openNotification(data.id, index)}>
                                    <div className='absolute top-0 right-2 text-sm font-light text-gray-600'>
                                        <h3>{formatDateTime(data.created_at)}</h3>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <h1>{data.message}</h1>
                                        {
                                            data.report ? <MdOutlineReportGmailerrorred size={25} color='#ff0000' /> : null
                                        }

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </AuthLayout>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <div className={`relative w-full font-medium rounded-md hover:opacity-75 cursor-pointer text-text mt-32`}>
                    <div className='absolute -top-5 -right-5 text-sm font-light text-gray-600'>
                        <h3>{formatDateTime(displayData.created_at)}</h3>
                    </div>
                    <h1 className='font-medium text-lg'> {
                        displayData.request ? `title: ${displayData.request.content} ` : `issue: ${displayData.report?.content}`
                    }</h1>
                    <p className='opacity-95'>{displayData.message}</p>
                    {
                        displayData.report?.post ? <><div className='w-[50vw] font-extralight space-y-2'>
                            <p>{displayData.report.post.title}</p>
                        </div> <span className={`p-1 rounded-md mt-20 ${displayData.report.status == 'open' ? issueOpen : completed}`}>{displayData.report.status}</span> </> : null
                    }
                </div>
            </CustomModal>
        </>
    )
}
