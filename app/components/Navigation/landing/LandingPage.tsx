'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const LandingPage = () => {
  const currentUser = useSelector((state: any)=> state.User)




  return (
    <div>
      {currentUser.role === null && <div>NoneUser</div>}
      {currentUser.role === "User" && <div>User</div>}
      {currentUser.role === "Admin" && <div>Admin</div>}
    </div>
  );


}

export default LandingPage