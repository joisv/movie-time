import { BarChart } from '@/Components/Chart';
import { Tab } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';

const tabs = ['last 7 days', 'last 2 weeks', 'last 12 month']

export function MostWatchedMovie() {

    return (
        <div className='w-full '>
            <Tab.Group>
                <Tab.List>
                    <div className="space-x-2 py-3">
                        {
                            tabs.map((tab, index) => (
                                <Tab as={Fragment} key={index}>
                                    {({ selected }) => (
                                        <button
                                            className={` w-fit h-fit p-2 rounded-md text-base focus:ring-0 focus:border-0 border-0 ring-0 font-medium ${selected ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
                                        >
                                            {tab}
                                        </button>
                                    )}
                                </Tab>
                            ))
                        }
                    </div>
                </Tab.List>
                <Tab.Panels >
                    <Tab.Panel>
                        <BarChart route={route('post.bydays')} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <BarChart route={route('post.byweeks')} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <BarChart route={route('post.bymonth')} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

        </div>
    );
}
