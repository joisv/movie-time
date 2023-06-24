import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import UserLayouts from './Layouts/UserLayouts';

export default function Dashboard({ auth }) {
    return (
        <UserLayouts user={auth?.user}>
            <div className='h-screen bg-accent p-4'>
                <h1>halo dunia</h1>
            </div>
        </UserLayouts>
    );
}
