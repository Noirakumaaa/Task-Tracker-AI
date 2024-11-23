"use client";
import React from "react";
import TaskOption from "./Task/TaskOption";

const SideOption = () => {


  return (
    <div className="border w-[20%] h-[100%] flex justify-center items-center">
      <ul>
        <li><TaskOption /></li>
        <li><TaskOption /></li>
        <li><TaskOption /></li>
      </ul>
    </div>
  );
};

export default SideOption;
