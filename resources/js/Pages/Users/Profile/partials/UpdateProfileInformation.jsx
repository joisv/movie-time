import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'

export default function UpdateProfileInformation({ auth }) {

    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        avatar: ''
    });
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageType = /image.*/;
        setData('avatar', imageFile)
        if (!imageFile.type.match(imageType)) {
            alert('File yang diunggah bukan gambar');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPreviewImage(reader.result);
        };

        reader.readAsDataURL(imageFile);
    };


    const submit = (e) => {
        e.preventDefault();

        post(route('userprofile.update'));
    };

    return (
        <div className='bg-gray-900 p-10 rounded-md'>
            <form onSubmit={submit}>
                <div className="">
                    <div className="border-white pb-12">
                        <h2 className="text-base font-semibold leading-7 text-secondaryAccent">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-200">Update your account's profile information and email address.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-200">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm  sm:max-w-md">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="off"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 rounded-sm"
                                            placeholder="janesmith"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-200">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm  sm:max-w-md">
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            autoComplete="off"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 rounded-sm"
                                            placeholder="janesmith"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />

                                    </div>
                                    <InputError message={errors.email} />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-200">
                                    Avatar
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {previewImage ? <img src={previewImage} alt="Preview" className="h-12 w-12 rounded-full object-cover object-top" /> : <FaUserCircle className="h-12 w-12 text-gray-300" aria-hidden="true" />}

                                    <button
                                        type="button"
                                        className="rounded-md bg-white w-20 p-2 h-fit text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 relative"
                                    >
                                        <input type="file" name="" id="" className='opacity-0 w-full h-full absolute' onChange={handleImageChange} />
                                        Change
                                    </button>
                                </div>
                                <InputError message={errors.avatar} />
                            </div>
                        </div>
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
                </div>
            </form>
        </div>
    )
}
