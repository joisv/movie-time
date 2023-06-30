import React, { useState } from 'react'
import { formatDateTime } from '@/Helper/formatDate'
import CustomModal from '@/Components/CustomModal';
import axios from 'axios';
import AuthLayout from '@/Layouts/AuthLayout';
import NoDataDisplay from '@/Components/NoDataDisplay';

export default function Notifications({ auth, datas }) {
    const [ open, setOpen ] = useState(false);
    const [ displayData, setDisplayData ] = useState({})
    const [ updateData, setUpdateData ] = useState({
        id: '',
        user_id: auth.user.id
    })
    const openNotification = async (id, index) => {
        console.log(id);
        if( datas[index].is_read === 0 ) {
           setDisplayData(datas[index]);
           setUpdateData(prevdata => ({
            ...prevdata,
            id : id
           }));
            setOpen(true);
            try {
                const response = await axios.put(route('notification.update', updateData));
            } catch (error) {
                console.log(error);

            }
       } else {
            setOpen(true);
            setDisplayData(datas[index]);
       }
    }
    
    console.log(updateData.id);
    if (datas.length == 0 ) {
        return(
            <AuthLayout user={auth?.user}>
              <NoDataDisplay message={'No Notifications'}/>
            </AuthLayout>
        )
    }
  return (
   <>
     <AuthLayout user={auth?.user}>
        <div className='h-screen bg-secondaryBtn p-4 space-y-2'>
        <h1 className='text-text text-lg font-semibold'>Notifications page</h1>
           {
            datas.map((data, index) => (
                <div className={`relative w-full p-4 font-medium rounded-md hover:opacity-75 cursor-pointer ease-in duration-200 ${ data.is_read === 0 ? 'bg-yellow-200' : 'bg-gray-300' }`} key={index}
                onClick={() => openNotification(data.id, index)}>
                    <div className='absolute top-0 right-2 text-sm font-light text-gray-600'>
                        <h3>{ formatDateTime(data.created_at) }</h3>
                    </div>
                    <h1>{ data.message }</h1>
                </div>
            ))
           }
        </div>
    </AuthLayout>
           <CustomModal open={open} onClose={()=> setOpen(false)}>
                <div className={`relative w-full font-medium rounded-md hover:opacity-75 cursor-pointer text-text mt-32`}>
                    <div className='absolute -top-5 -right-5 text-sm font-light text-gray-600'>
                        <h3>{ formatDateTime(displayData.created_at) }</h3>
                    </div>
                    <h1 className='font-semibold text-lg'>title: { displayData.request?.content }</h1>
                    <p className='opacity-95'>{ displayData.message }</p>
                </div>
           </CustomModal>
   </>
  )
}
