'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const TopNav = () => {
  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (user_id) {
      redirect(`/v1/${user_id}`);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[20%,60%,20%] items-center h-auto md:h-[10%] p-2 md:p-0 gap-4 md:gap-0 border-b">
      <div className="flex justify-center md:justify-start items-center  p-3">
        <Link href="/" className="text-xl font-bold">
          Logo
        </Link>
      </div>
      <div className="flex justify-center items-center  p-3">
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
          <Link className="btn btn-outline cursor-pointer hover:text-blue-500" href="/">
            Home
          </Link>
          <Link className="btn btn-outline cursor-pointer hover:text-blue-500" href="/u/about">
            About
          </Link>
          <Link className="btn btn-outline cursor-pointer hover:text-blue-500" href="/u/contact">
            Contact
          </Link>
        </div>
      </div>
      <div className="flex justify-center md:justify-end items-center  p-3 space-x-4">
        <Link className="btn btn-outline" href="/u/login">
          Login
        </Link>
        <Link className="btn btn-outline" href="/u/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
