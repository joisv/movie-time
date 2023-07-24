import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle({ setData }) {
    const [enabled, setEnabled] = useState(false)

    function handleChange() {
        setEnabled(prev => !prev)
        setData(prev => ({
            ...prev,
            remember: enabled
        }))
    }

    return (
        <div className='space-y-1'>
            <h3 className='text-white font-extralight'>remember me?</h3>
            <div className="flex space-x-3">
                <Switch
                    checked={enabled}
                    onChange={handleChange}
                    className={`${enabled ? 'bg-secondaryAccent' : 'bg-teal-700'}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
                <p className={`text-sm font-medium ${ enabled ? 'text-secondaryAccent ' : 'text-white' }`}>
                    {
                        enabled ? 'yes' : 'no'
                    }
                </p>
            </div>
        </div>
    )
}
