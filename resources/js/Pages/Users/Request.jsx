import React, { useState } from 'react'

import CustomTextInput from '@/Components/CustomTextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { Head, useForm, usePage } from '@inertiajs/react'
import { formatDateTime } from '@/Helper/formatDate'
import AuthLayout from '@/Layouts/AuthLayout'
import CustomModal from '@/Components/CustomModal'
import NoDataDisplay from '@/Components/NoDataDisplay'

export default function Request({ auth, datas }) {

  const { flash } = usePage().props
  const [open, setOpen] = useState(false);
  const { data, setData, processing, post, reset, delete: destroy } = useForm({
    content: '',
    user_id: auth?.user.id,
    status: 'pending'
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('request.store'), {
      onSuccess: () => {
        reset();
        setOpen(false);
      }
    })
  }
  const { web_name } = usePage().props
  return (
    <>
      <AuthLayout user={auth?.user}>
        <Head>
          <title>Request</title>
          <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
          <meta property="og:title" content="Request" />
          <meta property="og:description" content="Halaman Request memungkinkan pengguna untuk berinteraksi lebih langsung dengan platform kami. Mereka dapat mengajukan permintaan untuk film atau acara TV tertentu yang ingin mereka lihat tersedia di situs kami. Tim kami akan berusaha untuk memenuhi permintaan tersebut dan menyediakan konten yang diminati oleh para pengguna." />
          <meta property="og:url" content={window.location.url} />
        </Head>
        <div className=' text-text p-4 space-y-6'>
          <div className='sm:flex block sm:justify-between space-y-2'>
            <h1 className='text-text text-lg font-semibold'>Request page</h1>
            <PrimaryButton type='button' onClick={() => setOpen(true)}>
              Request
            </PrimaryButton>
          </div>
          {
            datas.length === 0 ? <NoDataDisplay>
              no Request make
            </NoDataDisplay> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    <th scope="col" className="px-6 py-3">
                      action
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
                        <td className="px-6 py-4">
                          <button type="button" onClick={() => { if (confirm('delete this request ?')) destroy(route('request.destroy', data.id)) }} className='text-red-500'>delete</button>
                        </td>
                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </div>
          }

        </div>
      </AuthLayout>
      <CustomModal open={open} onClose={() => setOpen(false)}>
        <div className='w-[80vw] sm:w-fit'>
          <form onSubmit={submit}>
            <div className=' flex items-center space-x-2'>
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
      </CustomModal>
    </>
  )
}
