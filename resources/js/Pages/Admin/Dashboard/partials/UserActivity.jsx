import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaUsers } from 'react-icons/fa'

export default function UserActivity() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {

      try {
        const response = await axios.get(route('usercount'));
        setUsers(response.data)
      } catch (error) {
        console.log(error);
      }

    }
    getUser();
  }, [])

  return (
    <div className='w-full rounded-md '>
      <div className='h-full space-y-2'>
        <div className=' w-full h-1/2 flex flex-col items-center justify-center rounded-md'>
          <h1>Total Users</h1>
          <h3>{users.total_users}</h3>
        </div>
        <div className=' w-full h-1/2 flex flex-col items-center justify-center rounded-md'>
          <h1>Users Online</h1>
          <h3>{users.online_users}</h3>
        </div>
      </div>
    </div>
  )
}
