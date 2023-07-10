import AuthLayout from '@/Layouts/AuthLayout'
import UpdateProfileInformation from './partials/UpdateProfileInformation'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

const tabs = [
  'Profile Information',
  'Password'
]

export default function Edit({ auth }) {
  return (
    <AuthLayout user={auth.user}>
      <Tab.Group>
        <Tab.List>
       <div className="space-x-2">
       {
          tabs.map((tab, index) => (
            <Tab as={Fragment}  key={index}>
            {({ selected }) => (
              <button
                className={` w-fit h-fit p-1 rounded-sm text-sm ${selected ? 'bg-secondaryAccent text-white' : 'bg-gray-100 text-black'}`}
               
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
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </AuthLayout>
  )
}
