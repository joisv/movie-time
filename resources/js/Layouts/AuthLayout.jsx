import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react';

import { IoHomeOutline, IoBookmarkOutline, IoNotificationsCircleOutline, IoGitPullRequestOutline } from "react-icons/io5";
import { ImHistory } from "react-icons/im";
import { FiThumbsUp } from "react-icons/fi";
import { FaUserEdit, FaUserCircle } from "react-icons/fa";

import checkScreen from '@/Helper/checkScreen';
import axios from 'axios';

const active = 'bg-secondaryAccent bg-opacity-70 border-r-4 border-secondaryAccent font-semibold '

export default function AuthLayout({ children, user }) {

  const current = route().current()
  const { screen, width } = checkScreen()
  const [ navbar, setNavbar ] = useState(false);
  const [ notifications, setNotifications ] = useState('');

  async function getNotifications () {
    try {
      const response = await axios.get(route('notification'));
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    screen(640)
    if(user)getNotifications()
  },[]);
  return (
    <div className='max-w-screen-2xl relative w-full min-h-screen'>
        {/* desktop */}
        <div className='sm:flex w-full fixed hidden justify-between'>
          <div className=' h-screen px-3 py-1 w-[17%] text-text flex bg-secondaryBtn flex-col items-center space-y-4'>
              <div className='flex items-center w-full p-3 text-lg font-semibold'>
                <h1>Auth Layout</h1>
              </div>
              <nav className='w-full '>
                  <ul className=''>
                    <li>
                      <Link href='/'>
                        <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer ${current === 'home' ? active : ''}`}>
                          <IoHomeOutline color='#f5f5f5' size={22}/>
                          <span>Home</span>
                        </div>
                      </Link>
                    </li>
                    {/* auth nav */}
                    <hr className='my-3 text-text opacity-25'/>
                    <li>
                      <Link href={route('history.index')}>
                        <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer ${current === 'history.index' ? active : ''}`}>
                            <ImHistory color='#f5f5f5' size={22} />
                            <span>History</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href={route('bookmark')}>
                        <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer ${current === 'bookmark' ? active : ''}`}>
                            <IoBookmarkOutline color='#f5f5f5' size={22} />
                            <span>Bookmark</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href={route('like')}>
                        <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer ${current === 'like' ? active : ''}`}>
                            <FiThumbsUp color='#f5f5f5' size={22} />
                            <span>Liked</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href={route('usernotifications.index')}>
                      <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer relative ${current === 'usernotifications.index' ? active : ''}`}>
                        <div>
                          {
                            notifications.notifications >= 1 ? <div className='absolute h-fit w-fit px-2 rounded-full text-sm font-medium top-0 right-0 bg-red-500 '>
                            <span>{notifications.notifications}</span>
                          </div> : null
                          }
                              <IoNotificationsCircleOutline color='#f5f5f5' size={25} />

                        </div>
                          <span>Notifications</span>
                      </div>
                      </Link>
                    </li>
                    <li>
                      <Link href={route('request.index')}>
                        <div className={`p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer ${current === 'request.index' ? active : ''}`}>
                            <IoGitPullRequestOutline color='#f5f5f5' size={22} />
                            <span>Request</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className='p-2 hover:bg-secondaryAccent ease-in duration-150 rounded-sm w-full flex space-x-4 font-medium cursor-pointer'>
                          <FaUserEdit color='#f5f5f5' size={22} />
                          <span>Edit Profile</span>
                      </div>
                    </li>
                  </ul>
              </nav>
          </div>
          <div className='h-10 flex flex-col justify-center items-end p-3 w-[82%] z-50 bg-secondaryBtn'>
            <div className='flex space-x-3 text-text items-center'>
              {
                user ? <> <span>{ user?.name }</span>
                <FaUserCircle color='#f5f5f5' size={30} /> </> :  <>
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
        <main className='sm:w-[83.5%] justify-end sm:absolute sm:right-0 sm:top-10 p-3 min-h-screen'>
            { children }
        </main>
    </div>
  )
}
