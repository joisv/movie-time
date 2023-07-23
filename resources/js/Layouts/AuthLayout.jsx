import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react';

import { IoHomeOutline, IoBookmarkOutline, IoNotificationsCircleOutline, IoGitPullRequestOutline } from "react-icons/io5";
import { ImHistory } from "react-icons/im";
import { FiThumbsUp } from "react-icons/fi";
import { FaUserEdit, FaUserCircle } from "react-icons/fa";

import checkScreen from '@/Helper/checkScreen';
import axios from 'axios';
import Dropdown from '@/Components/Dropdown';
import ProfileUser from '@/Components/ProfileUser';
import ResponsiveMenu from '@/Components/ResponsiveMenu';
import { MdMenu, MdOutlineExplore } from 'react-icons/md';
import Search from '@/Components/Search';
import useHooks from '@/hooks/useHooks';

const active = 'bg-secondaryAccent bg-opacity-70 border-r-4 border-secondaryAccent font-semibold '

export default function AuthLayout({ children, user, isDetail, setIsDetail }) {
  const current = route().current()
  const { screen, width } = checkScreen()
  const [navbar, setNavbar] = useState(false);
  const { data: notifications, loading, err, get } = useHooks()

  useEffect(() => {
    screen(640)
    if (user) get(route('notification'),{
      onSuccess: () => {
        console.log('succes');
      }
    })
  }, []);
  return (
    <div className='max-w-screen-2xl relative w-full min-h-screen '>
      {/* desktop */}
      <div className={`sm:flex w-full hidden`}>
        <div className={` h-screen lg:px-3 md:p-1 sm:p-2 fixed py-1 sm:w-fit md:w-[17%] text-text flex flex-col items-center lg:space-y-4 ease-in duration-150 ${isDetail ? '-translate-x-full' : ''}`}>
          <div className='flex items-center w-full p-3 text-lg font-semibold sm:hidden md:block'>
            <h1>Auth Layout</h1>
          </div>
          <nav className='w-full '>
            <ul className='space-y-1'>
              <li>
                <Link href='/'>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'home' ? active : ''}`}>
                    <IoHomeOutline color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={route('explore.index')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'explore.index' ? active : ''}`}>
                    <MdOutlineExplore color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>Explore</span>
                  </div>
                </Link>
              </li>
              {/* auth nav */}
              <hr className='my-3 text-text opacity-25' />
              <li>
                <Link href={route('history.index')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'history.index' ? active : ''}`}>
                    <ImHistory color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>History</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={route('bookmark')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'bookmark' ? active : ''}`}>
                    <IoBookmarkOutline color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>Bookmark</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={route('like')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'like' ? active : ''}`}>
                    <FiThumbsUp color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>Liked</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={route('usernotifications.index')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer relative ${current === 'usernotifications.index' ? active : ''}`}>
                    <div>
                      {
                        notifications.notifications >= 1 ? <div className='absolute h-fit w-fit px-2 rounded-full text-sm font-medium top-0 right-0 bg-red-500 '>
                          <span className='sm:hidden md:block md:text-sm lg:block'>{notifications.notifications}</span>
                        </div> : null
                      }
                      <IoNotificationsCircleOutline color='#f5f5f5' size={25} />

                    </div>
                    <span className='sm:hidden md:block md:text-sm lg:block'>Notifications</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={route('request.index')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'request.index' ? active : ''}`}>
                    <IoGitPullRequestOutline color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>Request</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={route('userprofile.edit')}>
                  <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex sm:space-x-1 md:space-x-2 lg:space-x-4 font-medium cursor-pointer ${current === 'userprofile.edit' ? active : ''}`}>
                    <FaUserEdit color='#f5f5f5' size={22} />
                    <span className='sm:hidden md:block md:text-sm lg:block'>Edit Profile</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`p-3 w-full flex justify-between `}>
          <div className={`w-[36vw] ease-in duration-150 ${ isDetail ? 'ml-10' : 'ml-[20vw]' }`}>
            <Search />
          </div>
          <div className='flex space-x-3 text-text items-center '>
            {
              user ? <>
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  <div className="ml-3 relative">
                    <Dropdown>
                      <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-text bg-secondaryBtn hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                          >
                            {user?.name}

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
                        {/* <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link> */}
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                          Log Out
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                </div>
              </> : <>
                <Link
                  href={route('login')}
                  className="font-semibold text-text hover:text-accent dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Log in
                </Link>

                <Link
                  href={route('register')}
                  className="ml-4 font-semibold text-text hover:text-accent dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Register
                </Link>
              </>
            }
            
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className={`fixed z-40 bg-secondaryBtn w-full h-screen p-3 sm:hidden ease-in duration-150 ${!navbar ? '-translate-x-full' : ''}`}>
        <button type="button" className='fixed bottom-2 right-2'>
          <svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => setNavbar(false)}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier"> <title /> <g id="Complete"> <g id="arrowLeft"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.6 7 2.5 12 7.6 17" className='stroke-text' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /> <line fill="none" className='stroke-text' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21.5" x2="4.8" y1="12" y2="12" /> </g> </g> </g> </g>
          </svg>
        </button>

        {/* profile */}
        <div className={`flex mt-2 ${user ? 'justify-between' : ''}`}>
          {
            user ? <> <ProfileUser user={user} />
              <Link href={route('logout')} className='bg-primaryBtn h-fit px-2 text-sm font-medium'>logout</Link>  </> : <>
              <Link
                href={route('login')}
                className="font-semibold text-text hover:text-accent dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Log in
              </Link>

              <Link
                href={route('register')}
                className="ml-4 font-semibold text-text hover:text-accent dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Register
              </Link>
            </>
          }
        </div>

        <div className='mt-8'>
          <ul className='space-y-3'>
            <li>
              <ResponsiveMenu href={route('history.index')} active={route().current('history.index')}>
                <ImHistory color='#f5f5f5' size={22} />
                History
              </ResponsiveMenu>
            </li>
            <li>
              <ResponsiveMenu href={route('bookmark')} active={route().current('bookmark')}>
                <IoBookmarkOutline color='#f5f5f5' size={22} />
                Bookmark
              </ResponsiveMenu>
            </li>
            <li>
              <ResponsiveMenu href={route('like')} active={route().current('like')}>
                <FiThumbsUp color='#f5f5f5' size={22} />
                Liked
              </ResponsiveMenu>
            </li>
            <li>
              <ResponsiveMenu href={route('usernotifications.index')} active={route().current('usernotifications.index')}>
                <IoNotificationsCircleOutline color='#f5f5f5' size={25} />
                Notifications
              </ResponsiveMenu>
            </li>
            <li>
              <ResponsiveMenu href={route('request.index')} active={route().current('request.index')}>
                <IoGitPullRequestOutline color='#f5f5f5' size={22} />
                Request
              </ResponsiveMenu>
            </li>
            <li>
              <ResponsiveMenu href={route('userprofile.edit')} active={route().current('userprofile.edit')}>
                <FaUserEdit color='#f5f5f5' size={22} />
                Edit Profile
              </ResponsiveMenu>
            </li>
          </ul>
        </div>
      </div>
      <main className={`justify-end sm:absolute sm:right-0 sm:top-12 sm:p-3 min-h-screen ease-in duration-150 ${isDetail ? 'w-full' : 'md:w-[83.6%] sm:w-[91%]'}`}>
        {
          width ? <button type="button" className={`fixed bottom-2 right-2 p-1 z-20`} onClick={() => setNavbar(true)}>
            <MdMenu size={35} color='#ffffff' />
          </button> : null
        }
        {children}
      </main>
    </div>
  )
}
