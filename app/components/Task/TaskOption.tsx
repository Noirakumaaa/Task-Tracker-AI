import React from "react";
import AddTask from "../Buttons/AddTask";
import EditButton from "../Buttons/EditButton";
import UserNavButton from "../Buttons/UserNavButton";

const TaskOption = () => {
  return (
<div className="navbar bg-base-100">
  <div className="flex-1">
  <UserNavButton name="Task" link="task" />
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>
        <details>
          <summary></summary>
          <ul className="bg-base-100 rounded-t-none p-3 min-w-10">
            <li><AddTask /></li>
            <li><EditButton /></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
  );
};

export default TaskOption;
