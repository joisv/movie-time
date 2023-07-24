import Wysiwyg from '@/Components/Wysiwyg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import WebInformations from './Partials/WebInformations';
import { usePage } from '@inertiajs/react'


export default function Edit({ auth }) {
    const {web_name} = usePage().props
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 min-h-screen">
                        <WebInformations web={web_name.name}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
