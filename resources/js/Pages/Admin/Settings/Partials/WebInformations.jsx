import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput'
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react';
import { FaUserCircle, FaUser, FaQuestion } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const hovered = 'rgb(75 85 99)'
const def = '#000000'

export default function WebInformations({ web }) {

  const [previewIcon, setPreviewIcon] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isMouseEnter, setIsMouseEnter] = useState({
    icon: false,
    logo: false,
  })
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    name: web?.name,
    icon: '',
    logo: ''
  })

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageType = /image.*/;
    const inputName = event.target.name;
    if (!imageFile.type.match(imageType)) {
      alert('File yang diunggah bukan gambar');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (inputName === 'icon') {
        setData('icon', imageFile);
        setPreviewIcon(reader.result);
      } else if (inputName === 'logo') {
        setData('logo', imageFile);
        setPreviewLogo(reader.result);
      }
    };

    reader.readAsDataURL(imageFile);
  };

  function submit(e) {
    e.preventDefault();
    post(route('settings.store'), {
      onSuccess: () => {
        console.log('success');
      }
    })
  }

  const handleMouse = e => {
    if (e.type === 'mouseenter')
      e.target.id === 'logo' ? setIsMouseEnter(p => ({ ...p, logo: true })) : setIsMouseEnter(p => ({ ...p, icon: true }));
    else if (e.type === 'mouseleave')
      setIsMouseEnter(p => ({ ...p, logo: false, icon: false }));
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Youre website name"
                      onChange={(e) => setData('name', e.target.value)}
                      value={data.name}
                    />
                    <InputError message={errors.name} />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <div>
                  <label htmlFor="photo" className="block text-sm font-medium leading-6 ">
                    favicon
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {previewIcon ? (
                      <img
                        src={previewIcon}
                        alt="Preview"
                        className="h-12 w-12 rounded-full object-cover object-top"
                      />
                    ) : (
                      web?.icon ? (
                        <LazyLoadImage
                          effect="blur"
                          src={`/storage/${web?.icon}`}
                          className="h-12 w-12 rounded-full object-cover object-top"
                        />
                      ) : <FaUserCircle size={40} color='#ffffff' />
                    )}
                    <div className="flex">
                      <button
                        type="button"
                        className="rounded-md bg-white w-20 p-2 h-fit text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 relative"
                      >
                        <input type="file" name="icon" id="icon" className='opacity-0 w-full h-full absolute' onChange={handleImageChange} />
                        <InputError message={errors.icon} />
                        Change
                      </button>
                      <div
                        onMouseEnter={(e) => handleMouse(e)}
                        onMouseLeave={(e) => handleMouse(e)}
                        className=''
                      >
                        <div className="flex relative w-full">
                          <div id="icon" className='w-fit h-fit p-2'>
                            <FaQuestion size={10} color={isMouseEnter.icon ? hovered : def} />
                          </div>
                          {
                            isMouseEnter.icon ? <div className={`text-xs font-medium p-1 bg-gray-950 text-gray-300 ml-2 rounded-sm max-w-[26vw] min-w-[20vh] left-8 ease-in-out duration-300 absolute`}>
                              <p>Icon sizes: Favicons 16x16px, 32x32px</p>
                            </div> : null
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="photo" className="block text-sm font-medium leading-6 ">
                    logo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {previewLogo ? (
                      <img
                        src={previewLogo}
                        alt="Preview"
                        className="h-12 w-32 object-contain"
                      />
                    ) : (
                      web?.icon ? (
                        <LazyLoadImage
                          effect="blur"
                          src={`/storage/${web?.logo}`}
                          className="h-12 w-32 object-contain "
                        />
                      ) : <FaUserCircle size={40} color='#ffffff' />
                    )}
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        className="rounded-md bg-white w-20 p-2 h-fit text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 relative"
                      >
                        <input type="file" name="logo" id="logo" className='opacity-0 w-full h-full absolute' onChange={handleImageChange} />
                        <InputError message={errors.logo} />
                        Change
                      </button>
                      <div
                        onMouseEnter={(e) => handleMouse(e)}
                        onMouseLeave={(e) => handleMouse(e)}
                        className=''
                      >
                        <div className="flex relative w-full">
                          <div id="logo" className='w-fit h-fit p-2'>
                            <FaQuestion size={10} color={isMouseEnter.logo ? hovered : def} />
                          </div>
                          {
                            isMouseEnter.logo ? <div className={`text-xs font-medium p-1 bg-gray-950 text-gray-300 ml-2 rounded-sm w-[26vw] left-8 ease-in-out duration-300 absolute`}>
                              <p>Please ensure that the uploaded image for the logo has a width between 150 to 400 pixels and a height of approximately 30 to 100 pixels. This will help us display your logo clearly and balanced in our website's header.</p>
                            </div> : null
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <InputError message={errors.icon} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <PrimaryButton
            type='submit'
            disabled={processing}>
            Save
          </PrimaryButton>

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
    </div>
  )
}
