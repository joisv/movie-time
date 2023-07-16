import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { ImSpinner8 } from "react-icons/im";
import { Head, Link, router, useForm } from '@inertiajs/react';
import { MdAlternateEmail, MdOutlineLockPerson, MdErrorOutline } from 'react-icons/md'
import AuthInput from '@/Components/AuthInput';
import Toggle from '@/Components/Toggle';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset, hasErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <header className='max-w-screen-sm w-full h-fit sm:flex items-center sm:space-x-4 p-2'>
                <div className='w-full'>
                    <h1 className='text-3xl font-semibold text-white my-8'>Login ?</h1>
                </div>
                <div className="w-2/3 hidden sm:block">
                    <h1 className='text-3xl font-semibold text-white my-8'>No account yet ?</h1>
                </div>
            </header>
            <div className={`p-3 gap-2 font-medium bg-sky-500 h-10 absolute top-10 flex items-center justify-center ease-in duration-200 ${hasErrors ? 'translate-y-[40%]' : '-translate-y-[200%]'}`}>
                <MdErrorOutline size={20} color='#ffffff' />
                Something went wrong
            </div>
            <div className="sm:flex sm:space-x-4 p-2">
                <div className='w-full'>
                    <form onSubmit={submit}>
                        <div className="space-y-2 mb-5">
                            <AuthInput
                                placeholder='Email'
                                type='email'
                                id='email'
                                value={data.email}
                                icon={<MdAlternateEmail size={'100%'} color='rgb(156 163 175)' />}
                                autoComplete="email"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
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
                        </div>
                        <div className="space-y-5">
                            <Toggle
                                name="remember"
                                setData={setData}
                            />
                            <div className="flex">
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className=" text-white bg-secondaryAccent  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-base px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center gap-1 items-center min-w-[13vw]"
                                >
                                    {
                                        processing ? <ImSpinner8 size={24} color='#ffffff' className='animate-spin' /> : 'Login Now'
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='sm:w-2/3 h-32 w-full'>
                    <div className="w-2/3 sm:hidden block">
                        <h1 className='text-3xl font-semibold text-white my-8'>No account yet ?</h1>
                    </div>
                    <div className="flex h-fit">
                        <button type="button" className=" text-white bg-secondaryAccent  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-base px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => router.visit('register')}>Regiter Now</button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
