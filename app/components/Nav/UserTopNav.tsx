import React from "react";
import DropDown from "../Buttons/DropDown";
import UserNavButton from "../Buttons/UserNavButton";
import UserLogoLink from "../UserLogoLink";
import TaskOption from "../Task/TaskOption";

const UserTopNav = () => {
  return (
    <div className="grid grid-cols-2 h-full md:grid-cols-[20%,70%,10%]">
      <div className="flex justify-center items-center border">
        <UserLogoLink />
      </div>
      <div className="hidden md:flex justify-center items-center border">
        <ul className="box w-full h-full flex flex-row justify-center items-center flex-wrap ">
          <li className="m-3">
            <UserNavButton name="Home" link="" />
          </li>
          <li className="m-3">
            <TaskOption />
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
        </ul>
      </div>

      <div className="flex justify-center items-center border">
        <DropDown />
      </div>
    </div>
  );
};

export default UserTopNav;
