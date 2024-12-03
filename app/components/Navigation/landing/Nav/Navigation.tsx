'use client'
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
  //Redux 
  const currentUser = useSelector((state: any)=> state.User) 

  return (
    <>
    {/* Not User */}
    {currentUser.role === null && (
    <div className='border border-black w-[100%] fixed top-0 text-black grid grid-cols-[15%,70%,15%] h-[10%]' >
        <div className='flex justify-center items-center border'>logo</div>
        <div className='flex justify-center items-center border'>options</div>
        <div className='flex justify-center items-center border'>
            <Link href="/Register">Start Now</Link>
        </div>
    </div>
    )}

    {/* User */}
    {currentUser.role === "User" && (
    <div className='border border-black w-[100%] fixed top-0 text-black grid grid-cols-[15%,70%,15%] h-[10%]' >
        <div className='flex justify-center items-center border'>logo</div>
        <div className='flex justify-center items-center border'>options</div>
        <div className='flex justify-center items-center border'>menu</div>
    </div>
    )}
    {/* Admin */}
    {currentUser.role === "Admin" && (
    <div className='border border-black w-[100%] fixed top-0 text-black grid grid-cols-[15%,70%,15%] h-[10%]' >
        <div className='flex justify-center items-center border'>logo</div>
        <div className='flex justify-center items-center border'>options</div>
        <div className='flex justify-center items-center border'>menu</div>
    </div>
    )}
      </>
  )

}

export default Navigation