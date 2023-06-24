import React, { useEffect, useState } from 'react'
import checkScreen from '@/Helper/checkScreen'
import { Link } from '@inertiajs/react'
import ProfileUser from '@/Components/ProfileUser';
import axios from 'axios';

const active = 'bg-accent'

export default function UserLayouts({ user, children, header }) {

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
  const current = route().current()
  useEffect(() => {
    screen(640)
    getNotifications()
  },[]);

  return (
    <div className='relative flex justify-center bg-background'>
        <div className='max-w-5xl w-full flex sm:py-4 sm:space-x-2'>
            <div className='md:p-2 p-1 h-fit bg-secondaryBtn rounded-sm hidden sm:block w-1/5 space-y-4'>
               <ProfileUser user={user}/>
              <ul className='space-y-2'>
                <li>
                  <Link href='/dashboard'>
                    <div className={`text-text md:p-2 p-1 rounded-sm ease-in duration-150 cursor-pointer font-medium hover:bg-primaryBtn ${current === 'dashboard' ? active : ''}`}>
                      <h1>History</h1>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className='text-text md:p-2 p-1 rounded-sm ease-in duration-150 cursor-pointer font-medium hover:bg-primaryBtn'>
                    <h1>Bookmark</h1>
                  </div>
                </li>
                <li>
                  <div className='text-text md:p-2 p-1 rounded-sm ease-in duration-150 cursor-pointer font-medium hover:bg-primaryBtn'>
                    <h1>Liked</h1>
                  </div>
                </li>
                <li>
                 <Link href={route('usernotifications.index')}>
                  <div className={`relative text-text md:p-2 p-1 rounded-sm ease-in duration-150 cursor-pointer font-medium hover:bg-primaryBtn ${current === 'usernotifications.index' ? active : ''}`}>
                      {
                        notifications.notifications >= 1 ? <div className='absolute h-fit w-fit px-2 rounded-full text-sm font-medium bg-red-500 right-0 -top-1'>
                        <span>{notifications.notifications}</span>
                      </div> : null
                      }
                      <h1>Notifications</h1>
                    </div>
                 </Link>
                </li>
                <li>
                  <Link href={route('request.index')}>
                    <div className={`text-text md:p-2 p-1 rounded-sm ease-in duration-150 cursor-pointer font-medium hover:bg-primaryBtn ${current === 'request.index' ? active : ''}`}>
                      <h1>Request</h1>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className='text-text md:p-2 p-1 rounded-sm ease-in duration-150 cursor-pointer font-medium hover:bg-primaryBtn'>
                    <h1>Edit profile</h1>
                  </div>
                </li>
              </ul>
            </div>
          {/* mobile nav */}
          {
            width ? <div className={`fixed z-40 bg-background w-full h-screen p-3 sm:hidden ease-in duration-200 ${ !navbar? '-translate-x-full' : '' }`}>
            <button type="button">
              <svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => setNavbar(false)}>
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                  <g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="arrowLeft"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.6 7 2.5 12 7.6 17" className='stroke-text' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/> <line fill="none" className='stroke-text' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21.5" x2="4.8" y1="12" y2="12"/> </g> </g> </g> </g>
                </svg>
            </button>
  
              {/* profile */}
              <div className='flex justify-between mt-4'>
                <ProfileUser user={user}/>
                <button type="button" className='bg-primaryBtn h-fit px-2 text-sm font-medium'>logout</button>
              </div>
  
              <div className='mt-10'>
                <ul className='space-y-4'>
                  <li>
                    <div className='flex space-x-2 items-center'>
                      {/* <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z" fill="#f5f5f5"/>
                      </svg> */}
                      <span className='text-white font-medium'>History</span>
                    </div>
                  </li>
                  <li>
                    <div className='flex space-x-2 items-center'>
                      {/* <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.75 20.75C17.5974 20.747 17.4487 20.702 17.32 20.62L12 16.91L6.68 20.62C6.56249 20.6915 6.42757 20.7294 6.29 20.7294C6.15243 20.7294 6.01751 20.6915 5.9 20.62C5.78491 20.5607 5.68741 20.4722 5.61722 20.3634C5.54703 20.2546 5.50661 20.1293 5.5 20V6C5.5 5.27065 5.78973 4.57118 6.30546 4.05546C6.82118 3.53973 7.52065 3.25 8.25 3.25H15.75C16.4793 3.25 17.1788 3.53973 17.6945 4.05546C18.2103 4.57118 18.5 5.27065 18.5 6V20C18.5005 20.1362 18.4634 20.2698 18.3929 20.3863C18.3223 20.5027 18.2209 20.5974 18.1 20.66C17.9927 20.7189 17.8724 20.7498 17.75 20.75ZM12 15.25C12.1532 15.2484 12.3033 15.2938 12.43 15.38L17 18.56V6C17 5.66848 16.8683 5.35054 16.6339 5.11612C16.3995 4.8817 16.0815 4.75 15.75 4.75H8.25C7.91848 4.75 7.60054 4.8817 7.36612 5.11612C7.1317 5.35054 7 5.66848 7 6V18.56L11.57 15.38C11.6967 15.2938 11.8468 15.2484 12 15.25Z" fill="#f5f5f5"/>
                      </svg> */}
                      <span className='text-white font-medium'>Bookmark</span>
                    </div>
                  </li>
                  <li>
                    <div className='flex space-x-2 items-center'>
                    {/* <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" fill="#f5f5f5"/></svg> */}
                      <span className='text-white font-medium'>Liked</span>
                    </div>
                  </li>
                  <li>
                    <div className='flex space-x-2 items-center'>
                    {/* <svg fill="#f5f5f5" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment</title> <path d="M2.5 5.438h17.406c1.375 0 2.5 1.125 2.5 2.5v10.563c0 1.375-1.125 2.5-2.5 2.5h-3.313l0.156 4.281c0 1.031-0.563 1.281-1.313 0.563l-4.906-4.844h-8.031c-1.375 0-2.5-1.125-2.5-2.5v-10.563c0-1.375 1.125-2.5 2.5-2.5z"></path> </g></svg> */}
                      <span className='text-white font-medium'>Comment</span>
                    </div>
                  </li>
                  <li>
                    <Link href={route('request.index')}>
                    <div className={`flex space-x-2 items-center py-2 px-1 rounded-md ${current ? active : ''}`}>
                    {/* <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15ZM18 15V8C18 7.46957 17.7893 6.96086 17.4142 6.58579C17.0391 6.21071 16.5304 6 16 6H13M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9ZM6 9V21" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg> */}
                      <span className='text-white font-medium'>Request</span>
                    </div>
                    </Link>
                  </li>
                  <li>
                    <div className='flex space-x-2 items-center'>
                    {/* <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_Line_02"> <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L8 20.0001L4 20.0001Z" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg> */}
                    <span className='text-white font-medium'>Edit Profile</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div> : null
          }
          
          <main className='relative flex-1'>
            {width ? <button className='absolute text-text' onClick={() => setNavbar(true)}>menu</button> : null}
            {children}
          </main>
        </div>
    </div>
  )
}
