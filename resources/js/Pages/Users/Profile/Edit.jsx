import AuthLayout from '@/Layouts/AuthLayout'
import UpdateProfileInformation from './partials/UpdateProfileInformation'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import UpdatePasswordForm from './partials/UpdatePasswordForm'

const tabs = [
  'Profile Information',
  'Password'
]

export default function Edit({ auth }) {
  return (
    <AuthLayout user={auth.user}>
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
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </AuthLayout>
  )
}
