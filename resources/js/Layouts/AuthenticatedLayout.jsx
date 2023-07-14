import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { IoHomeOutline, IoGitPullRequestOutline, IoFingerPrintSharp } from "react-icons/io5";
import { MdPostAdd, MdMovieEdit, MdOutlineReportGmailerrorred } from 'react-icons/md'
import { FaUsers, FaUserLock } from 'react-icons/fa'
import useHook from '@/hooks/useHook';
import axios from 'axios';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [requestCount, setRequestCount] = useState('');

    useEffect(() => {
        const getRequestCount = async () => {
            try {
                const response = await axios.get(route('api.request.count'))
                if (response.status === 200) {
                    setRequestCount(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getRequestCount();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('admin')} active={route().current('admin')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('post.index')} active={route().current('post.index')}>
                            Post
                        </ResponsiveNavLink>
                        <div className='relative'>
                            <ResponsiveNavLink href={route('adminrequest.index')} active={route().current('adminrequest.index')}>
                                Request
                            </ResponsiveNavLink>
                            {
                                requestCount > 0 ? <div className='absolute right-0 w-5 h-5 top-0 rounded-full bg-red-500 text-sm flex justify-center items-center text-white'>
                                    <span className='sm:hidden md:block'>{requestCount}</span>
                                </div> : null
                            }
                        </div>
                        <ResponsiveNavLink href={route('streamdownload')} active={route().current('streamdownload')}>
                            Episode
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                            Permission
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('roles.index')} active={route().current('roles.index')}>
                            Role
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('user.index')} active={route().current('user.index')}>
                            Users
                        </ResponsiveNavLink>
                        
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <div className="flex space-x-1 w-full ">
                <div className="hidden sm:flex flex-col md:w-[25vw] sm:w-fit min-h-screen space-y-1 bg-white p-3">
                    <NavLink href={route('admin')} active={route().current('admin')}>
                        <IoHomeOutline color='#000000' size={22} />
                        <span className='sm:hidden md:block'>
                            Dashboard
                        </span>
                    </NavLink>
                    <hr className='opacity-80 mt-1' />
                    <NavLink href={route('post.index')} active={route().current('post.index')}>
                        <MdPostAdd size={25} color='#000000' />
                        <span className='sm:hidden md:block'>Post</span>
                    </NavLink>
                    <NavLink href={route('genres.index')} active={route().current('genres.index')}>
                        <MdPostAdd size={25} color='#000000' />
                        <span className='sm:hidden md:block'>Genres</span>
                    </NavLink>
                    <div className='relative'>
                        <NavLink href={route('adminrequest.index')} active={route().current('adminrequest.index')}>
                            <IoGitPullRequestOutline size={23} color='#000000' />
                            <span className='sm:hidden md:block'> Request</span>
                        </NavLink>
                        {
                            requestCount > 0 ? <div className='absolute right-0 w-5 h-5 top-0 rounded-full bg-red-500 text-sm flex justify-center items-center text-white'>
                                <span className='sm:hidden md:block'>{requestCount}</span>
                            </div> : null
                        }

                    </div>

                    <NavLink href={route('streamdownload')} active={route().current('streamdownload')}>
                        <MdMovieEdit size={23} color='#000000' />
                        <span className='sm:hidden md:block'>Episdoe</span>
                    </NavLink>
                    <NavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                        <IoFingerPrintSharp size={23} color='#000000' />
                        <span className='sm:hidden md:block'>Permissions</span>
                    </NavLink>
                    <NavLink href={route('roles.index')} active={route().current('roles.index')}>
                        <FaUserLock color='#000000' size={22} />
                        <span className='sm:hidden md:block'>Roles</span>
                    </NavLink>
                    <NavLink href={route('user.index')} active={route().current('user.index')}>
                        <FaUsers size={23} color='#000000' />
                        <span className='sm:hidden md:block'>Users</span>
                    </NavLink>
                    <NavLink href={route('report.index')} active={route().current('report.index')}>
                        <MdOutlineReportGmailerrorred size={23} color='#000000' />
                        <span className='sm:hidden md:block'>Report</span>
                    </NavLink>
                </div>
                <main className='w-[100vw]'>{children}</main>
            </div>
        </div>
    );
}
