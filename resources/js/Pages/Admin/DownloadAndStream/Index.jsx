import { Tab } from '@headlessui/react'
import { Fragment, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StreamIndex from '../Stream/Index'
import DownloadIndex from '@/Pages/Admin/Downloads/Index'
import CustomModal from '@/Components/CustomModal';
import Create from '../Stream/Create';

const tabs = ['Streams', 'Downloads']

export default function Index({ auth, datastreams, downloads }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AuthenticatedLayout user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stream</h2>}>
                <Head title='Stream' />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <Tab.Group>
                            <Tab.List>
                                <div className="space-x-2 py-3">
                                    {
                                        tabs.map((tab, index) => (
                                            <Tab as={Fragment} key={index}>
                                                {({ selected }) => (
                                                    <button
                                                        className={` w-fit h-fit p-2 rounded-md text-base focus:ring-0 focus:border-0 border-0 ring-0 font-medium ${selected ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}

                                                    >
                                                        {tab}
                                                    </button>
                                                )}
                                            </Tab>
                                        ))
                                    }
                                </div>
                            </Tab.List>
                            <Tab.Panels>
                                <div className="bg-white shadow-sm sm:rounded-lg p-4">
                                    <Tab.Panel>
                                        <StreamIndex datastreams={datastreams} setOpen={setOpen} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <DownloadIndex downloads={downloads} setOpen={setOpen} />
                                    </Tab.Panel>
                                </div>

                            </Tab.Panels>
                        </Tab.Group>

                    </div>
                </div>
            </AuthenticatedLayout>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <Create open={open} setOpen={setOpen} />
            </CustomModal>

        </>


    )
}
