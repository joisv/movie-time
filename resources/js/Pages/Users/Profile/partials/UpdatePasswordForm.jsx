import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthInput from '@/Components/AuthInput';
import { MdAlternateEmail, MdOutlineLockPerson } from 'react-icons/md'

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };
    return (
        <section className={`p-8 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-secondaryAccent">Update Password</h2>

                <p className="mt-1 text-sm text-text">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div className='sm:w-[65%] w-full'>
                    <label htmlFor="current_password" className="block text-sm font-medium leading-6 text-gray-200">
                        Current Password
                    </label>
                    <AuthInput
                        placeholder='Password'
                        type='password'
                        icon={<MdOutlineLockPerson size={'100%'} color='rgb(156 163 175)' />}
                        id="current_password"
                        name="current_password"
                        value={data.current_password}
                        autoComplete="off"
                        onChange={(e) => setData('current_password', e.target.value)}
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div className='sm:w-[65%] w-full'>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                        New Password
                    </label>
                    <AuthInput
                        placeholder='Password'
                        type='password'
                        icon={<MdOutlineLockPerson size={'100%'} color='rgb(156 163 175)' />}
                        id="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className='sm:w-[65%] w-full'>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-200">
                        Confirm Password
                    </label>
                    <AuthInput
                        placeholder='Confirm password'
                        type='password'
                        icon={<MdOutlineLockPerson size={'100%'} color='rgb(156 163 175)' />}
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password_confirmation"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
