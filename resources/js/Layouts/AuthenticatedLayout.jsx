import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { IoHomeOutline, IoGitPullRequestOutline, IoFingerPrintSharp } from "react-icons/io5";
import { MdPostAdd, MdMovieEdit, MdOutlineReportGmailerrorred, MdSettings } from 'react-icons/md'
import { FaUsers, FaUserLock } from 'react-icons/fa'
import axios from 'axios';
import { BiMoneyWithdraw } from 'react-icons/bi';

const act = 'rgb(255 255 255)'
const def = ''

const getRequestCount = async (param) => {
    try {
        const response = await axios.get(param);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        // console.log(error);
    }
};

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [requestCount, setRequestCount] = useState(null);
    const [reportCount, setReportCount] = useState(null);
    const [iconActive, setIconActive] = useState(route().current());

    useEffect(() => {
        
        (async () => {
            const [requestCount, reportCount] = await Promise.all([
                getRequestCount(route('api.request.count')),
                getRequestCount(route('api.usereport.count')),
            ]);

            setRequestCount(requestCount);
            setReportCount(reportCount);
        })();
    }, [])
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 sm:relative">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 sm:fixed top-0 z-50 right-0 w-full sm:bg-white">
                    <div className="flex justify-between h-16">
                        <div className="flex h-16">
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

            <div className="flex space-x-1 w-full sm:space-y-10 sm:relative">
                <div className=" md:w-[23vw] sm:w-[10vw] bg-red-500">
                    <div className="hidden sm:flex flex-col md:w-[20vw] sm:w-fit min-h-screen space-y-1 bg-gray-950 p-4 text-gray-400 sm:fixed top-16">
                        <NavLink href={route('admin')} active={route().current('admin')}>
                            <IoHomeOutline color={iconActive === 'admin' ? act : def} size={22} />
                            <span className='sm:hidden md:block'>
                                Dashboard
                            </span>
                        </NavLink>
                        <NavLink href={route('post.index')} active={route().current('post.index')}>
                            <MdPostAdd size={25} color={iconActive === 'post.index' ? act : def} />
                            <span className='sm:hidden md:block'>Post</span>
                        </NavLink>
                        <NavLink href={route('genres.index')} active={route().current('genres.index')}>
                            <MdPostAdd size={25} color={iconActive === 'genres.index' ? act : def} />
                            <span className='sm:hidden md:block'>Genres</span>
                        </NavLink>
                        <div className='relative'>
                            <NavLink href={route('adminrequest.index')} active={route().current('adminrequest.index')}>
                                <IoGitPullRequestOutline size={23} color={iconActive === 'adminrequest.index' ? act : def} />
                                <span className='sm:hidden md:block'> Request</span>
                            </NavLink>
                            {
                                requestCount > 0 ? <div className='absolute right-0 w-5 h-5 top-0 rounded-full bg-red-500 text-sm flex justify-center items-center text-white'>
                                    <span className='sm:hidden md:block'>{requestCount}</span>
                                </div> : null
                            }

                        </div>

                        <NavLink href={route('streamdownload')} active={route().current('streamdownload')}>
                            <MdMovieEdit size={23} color={iconActive === 'streamdownload' ? act : def} />
                            <span className='sm:hidden md:block'>Episdoe</span>
                        </NavLink>
                        <NavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                            <IoFingerPrintSharp size={23} color={iconActive === 'permissions.index' ? act : def} />
                            <span className='sm:hidden md:block'>Permissions</span>
                        </NavLink>
                        <NavLink href={route('roles.index')} active={route().current('roles.index')}>
                            <FaUserLock color={iconActive === 'roles.index' ? act : def} size={22} />
                            <span className='sm:hidden md:block'>Roles</span>
                        </NavLink>
                        <NavLink href={route('banner.index')} active={route().current('banner.index')}>
                            <BiMoneyWithdraw color={iconActive === 'banner.index' ? act : def} size={22} />
                            <span className='sm:hidden md:block'>Banner</span>
                        </NavLink>
                        <NavLink href={route('user.index')} active={route().current('user.index')}>
                            <FaUsers size={23} color={iconActive === 'user.index' ? act : def} />
                            <span className='sm:hidden md:block'>Users</span>
                        </NavLink>
                        <div className='relative'>
                            <NavLink href={route('report.index')} active={route().current('report.index')}>
                                <MdOutlineReportGmailerrorred size={23} color={iconActive === 'report.index' ? act : def} />
                                <span className='sm:hidden md:block'>Report</span>
                            </NavLink>
                            {
                                reportCount > 0 ? <div className='absolute right-0 w-5 h-5 top-0 rounded-full bg-red-500 text-sm flex justify-center items-center text-white'>
                                    <span className='sm:hidden md:block'>{reportCount}</span>
                                </div> : null
                            }
                        </div>
                        <NavLink href={route('settings.index')} active={route().current('settings.index')}>
                            <MdSettings size={23} color={iconActive === 'settings.index' ? act : def} />
                            <span className='sm:hidden md:block'>Settings</span>
                        </NavLink>
                    </div>
                </div>
                <main className='w-[100vw]'>{children}</main>
            </div>
        </div>
    );
}
