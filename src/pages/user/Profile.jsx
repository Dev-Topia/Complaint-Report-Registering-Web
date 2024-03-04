import React from 'react'
import Button from '../../ui/shared/Button'
import { MdMailOutline } from "react-icons/md";
import ReportCard from "../../ui/admin/ReportCard";

function Profile() {
  return (
    <div className='max-w-7xl flex p-10 gap-10'>
      <div className='w-1/2 bg-white flex flex-col gap-4 rounded-xl p-4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Profile</h1>
          <Button customClass='bg-red-500 '>Logout</Button>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='rounded-[100%] w-[100px] h-[100px] bg-black'></div>
          <h1 className='font-bold text-2xl'>Sea MengSrun</h1>
        </div>
        <div className='flex gap-4 border-2 py-1 px-2 rounded-xl'>
        <MdMailOutline className='w-[30px] h-[30px]'/>
        <h1 className='text-xl'>seamengsrun@gmail.com</h1>
        </div>
        <div className='flex gap-4 border-2 py-1 px-2 rounded-xl'>
        <MdMailOutline className='w-[30px] h-[30px]'/>
        <h1 className='text-xl'>070776079</h1>
        </div>
        <div className='flex gap-4 border-2 py-1 px-2 rounded-xl'>
        <MdMailOutline className='w-[30px] h-[30px]'/>
        <h1 className='text-xl'>30/09/2003</h1>
        </div>
        <div className='flex gap-4 w-full'>
          <Button customClass={'md:w-full'}>Update Profile</Button>
          <Button customClass={'bg-red-500 md:w-full'}>Delete Account</Button>
        </div>
      </div>
      <div className='w-1/2 p-4 flex flex-col gap-4 bg-white rounded-xl'>
        <h1 className='text-2xl font-bold'>Reporting History</h1>
        <ReportCard/>
      </div>
    </div>
  )
}

export default Profile