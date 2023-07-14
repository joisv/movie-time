import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { ImSpinner8 } from "react-icons/im";
import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthInput from '@/Components/AuthInput';
import { MdAlternateEmail, MdOutlineLockPerson } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <header className='max-w-screen-sm w-full h-fit flex items-center space-x-4'>
                <div className='w-full'>
                    <h1 className='text-3xl font-semibold text-white my-8'>Register ?</h1>
                </div>
                <div className="w-2/3 ">
                    <h1 className='text-3xl font-semibold text-white my-8'>Already registered ?</h1>
                </div>
            </header>
            <div className="flex space-x-4">
                <div className='w-full'>
                    <form onSubmit={submit}>
                        <div className="space-y-2 mb-5">
                            <AuthInput
                                placeholder='Name'
                                type='text'
                                id='name'
                                icon={<FaUser size={'80%'} color='rgb(156 163 175)' />}
                                autoComplete="name"
                                value={data.name}
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                            <AuthInput
                                placeholder='User'
                                type='email'
                                id='email'
                                value={data.email}
                                icon={<MdAlternateEmail size={'100%'} color='rgb(156 163 175)' />}
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                            <AuthInput
                                placeholder='Password'
                                type='password'
                                icon={<MdOutlineLockPerson size={'100%'} color='rgb(156 163 175)' />}
                                id="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                            <AuthInput
                                placeholder='Confirm Password'
                                type='password'
                                icon={<MdOutlineLockPerson size={'100%'} color='rgb(156 163 175)' />}
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="password_confirmation"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                        <div className="space-y-5">
                            <div className="flex">
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className=" text-white bg-secondaryAccent  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-base px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center gap-1 items-center min-w-[13vw]"
                                >
                                    {
                                        processing ? <ImSpinner8 size={24} color='#ffffff' className='animate-spin' /> : 'Register now'
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='w-2/3 h-32 '>
                    <div className="flex h-fit">
                        <button type="button" className=" text-white bg-secondaryAccent  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-base px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => router.visit('login')}>Login Now</button>
                    </div>
                </div>
            </div>

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
