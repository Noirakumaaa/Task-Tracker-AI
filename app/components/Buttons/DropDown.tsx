"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import BurgerMenu from "@/public/burger-bar.png";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@/lib/features/Auth/authThunks";
import { AppDispatch } from "@/lib/store";
import Cookies from "js-cookie";


const DropDown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = Cookies.get("token")


  const LogoutUser = async () => {
    dispatch(Logout());
    redirect("/");
  };




  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 bg-gray-100">
        <Image src={BurgerMenu} alt="Burger Menu" width={30} height={30} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <button onClick={LogoutUser}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
