import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const plans = [
    {
        name: 'Startup',
        ram: '12GB',
        cpus: '6 CPUs',
        disk: '160 GB SSD disk',
    },
    {
        name: 'Business',
        ram: '16GB',
        cpus: '8 CPUs',
        disk: '512 GB SSD disk',
    },
    {
        name: 'Enterprise',
        ram: '32GB',
        cpus: '12 CPUs',
        disk: '1024 GB SSD disk',
    },
]

export default function Download({ onClose, setOpen, datas }) {

    const [selected, setSelected] = useState(datas[0])

    const handleDownload = () => {
        window.open(selected.url_download, '_blank')
    }

    return (
        <div className="min-w-[40vw] bg-[#1d1d1c] rounded-md p-5">
            <h1 className="text-secondaryAccent font-medium text-base">Quality Download</h1>
            <div className="w-full py-5">
                <div className="mx-auto w-full max-w-md">
                    <RadioGroup value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-2">
                            {datas.map((download, index) => (
                                <RadioGroup.Option
                                    key={index}
                                    value={download}
                                    className={({ active, checked }) =>
                                        `${active
                                            ? 'ring-0 ring-white ring-opacity-60 ring-offset-0 ring-offset-sky-300'
                                            : ''
                                        }
                                            ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-transparent'
                                        }
                                                relative flex cursor-pointer rounded-md px-3 py-2 shadow-md focus:outline-none`
                                    }
                                >
                                    {({ active, checked }) => (
                                        <>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-400'
                                                                }`}
                                                        >
                                                            {download.name_download}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                                }`}
                                                        >
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                                {checked && (
                                                    <div className="shrink-0 text-white">
                                                        <CheckIcon className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="flex justify-between gap-2 text-white font-medium">
                <button
                    type='button'
                    className='w-full p-2 bg-transparent border border-secondaryAccent rounded-sm '
                    onClick={onClose}
                >
                    cancle
                </button>
                <button className='w-full p-2 bg-secondaryAccent rounded-sm' onClick={() => handleDownload()}>download</button>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}