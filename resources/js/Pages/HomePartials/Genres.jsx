import useHooks from "@/hooks/useHooks"
import { Tab } from "@headlessui/react"
import { Fragment } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { ImSpinner8 } from "react-icons/im"

export default function Genres() {

    const { data, get, loading, error } = useHooks()
    const [ tabs, setTabs ] = useState([])

    useEffect(() => {
        get(route('get.genre'), {
            onSuccess: () => {
                // setTabs(data.data)
            },
            onError: () => {

            }
        })
    },[])

    if(loading){
        return (
            <div className="w-full h-screen flex justify-center mt-[30vh]">
                <ImSpinner8 size={32} color="#ffffff" className="animate-spin"/>
            </div>
        )
    }
    
    return (
        <div>
            <Tab.Group>
                <Tab.List>
                    <div className="grid grid-cols-4 gap-3">
                        {
                            data?.data?.map((tab, index) => (
                                <Tab as={Fragment} key={index}>
                                    {({ selected }) => (
                                        <button
                                            className={`px-3 py-1 focus:border-0 focus:ring-0 border-transparent ring-transparent
                                               ${ selected ? 'bg-secondaryAccent text-gray-200 ' : 'bg-white text-black'}
                                            `}
                                        >
                                            {tab.name}
                                        </button>
                                    )}
                                </Tab>
                            ))
                        }
                    </div>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                       <div className="text-text">halo content</div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
