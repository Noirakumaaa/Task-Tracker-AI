"use client";
import React from "react";
import Image from "next/image";
import BurgerMenu from "@/public/burger-bar.png";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { Logout } from "@/lib/features/Auth/authThunks";
import { AppDispatch } from "@/lib/store";
import UserNavButton from "../Buttons/UserNavButton";
import Cookies from "js-cookie";

const DropDown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = Cookies.get("token");

  const LogoutUser = async () => {
    dispatch(Logout());
    redirect("/");
  };

  return (
    <details className="dropdown">
      <summary className="btn m-1 bg-white w-[40%] sm:w-[40%] md:w-[65%] lg:w-[60%] xl:w-[50%] h-auto">
        <Image src={BurgerMenu} alt="Burger Menu" width={100} height={100} />
      </summary>

      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
          <button onClick={LogoutUser}>Logout</button>
        </li>
        <div className="block md:hidden">
          <li className="m-3">
            <UserNavButton name="Home" link="" />
          </li>
          <li className="m-3">
            <UserNavButton name="Task" link="task" />
          </li>
          <li className="m-3">
            <UserNavButton name="Calendar" link="calendar" />
          </li>
          <li className="m-3">
            <UserNavButton name="Scheduler" link="scheduler" />
          </li>
          <li className="m-3">
            <UserNavButton name="Chatbot" link="chatbot" />
          </li>
        </div>
      </ul>
    </details>
  );
};

export default DropDown;
