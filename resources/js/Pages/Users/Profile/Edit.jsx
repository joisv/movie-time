import AuthLayout from '@/Layouts/AuthLayout'
import UpdateProfileInformation from './partials/UpdateProfileInformation'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import UpdatePasswordForm from './partials/UpdatePasswordForm'
import { Head, usePage } from '@inertiajs/react'

const tabs = [
  'Profile Information',
  'Password'
]

export default function Edit({ auth }) {
  const { web_name } = usePage().props
  return (
    <AuthLayout user={auth.user}>
      <Head>
        <title>{`${auth.user.name}`}</title>
        <link rel="shortcut icon" href={`storage/${web_name.name.icon}`} type="image/x-icon" />
        <meta property="og:title" content="Profile" />
        <meta property="og:description" content="Halaman Edit Profile memungkinkan pengguna untuk mengelola informasi pribadi mereka di situs kami. Di sini, pengguna dapat memperbarui foto profil, mengubah nama pengguna, dan mengatur preferensi akun. Selain itu, mereka dapat mengelola langganan newsletter, notifikasi, dan preferensi pengaturan lainnya. Halaman Edit Profile memberikan kemudahan dan fleksibilitas bagi pengguna untuk mengontrol pengalaman mereka di platform kami." />
        <meta property="og:url" content={window.location.url} />
      </Head>
      <Tab.Group>
        <Tab.List>
          <div className="space-x-2 px-5 py-3">
            {
              tabs.map((tab, index) => (
                <Tab as={Fragment} key={index}>
                  {({ selected }) => (
                    <button
                      className={` w-fit h-fit p-1 rounded-sm text-sm focus:ring-0 focus:border-0 border-0 ${selected ? 'bg-secondaryAccent text-white' : 'bg-gray-100 text-black'}`}

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
          <Tab.Panel>
            <UpdateProfileInformation auth={auth} />
          </Tab.Panel>
          <Tab.Panel>
            <UpdatePasswordForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </AuthLayout>
  )
}
