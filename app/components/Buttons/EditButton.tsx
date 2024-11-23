"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedTaskList } from "@/lib/features/Task/taskSelectors";
import { AppDispatch } from "@/lib/store";
import { setEditMode } from "@/lib/features/Task/taskSlice";
import { deleteTask,updateTask,addSelectedTask } from "@/lib/features/Task/taskThunks";


interface taskForm {
  id: string;
  user_id: string;
  name: string;
  description: string;
  status: string;
  deadline: string;
  start_date: string;
}



const EditButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTask = useSelector(selectSelectedTaskList)
  //state
  const [showEdit, setShowedit] = useState(false);
  const [selectedItems, setSelectedItems] = useState<taskForm[]>([]);


  useEffect(() => {
    setSelectedItems(selectedTask);
  }, [selectedTask]);
  

  

  // To switch to Edit mode
  useEffect(() => {
    dispatch(setEditMode(showEdit));
  }, [showEdit, dispatch]);


  return (
    <>
      <button className="btn" onClick={() => setShowedit(true)}>
        Edit Task
      </button>
      {showEdit && (
        <div
          role="alert"
          className="fixed bottom-[5%] right-[20%] w-[50%] alert alert-info bg-white flex justify-center items-center"
        >
          <span>Edit Task</span>
          <button className="btn btn-outline btn-error mr-1 w-[20%]"
          onClick={()=>dispatch(deleteTask(selectedItems))}
          >
            DELETE
          </button>
          <button className="btn btn-outline btn-success mr-1 w-[20%]"
            onClick={()=>dispatch(updateTask(selectedItems,"DONE"))}
          >
            DONE
          </button>
          <button
            className="btn btn-square"
            onClick={() => {
              setShowedit(false);
              dispatch(setEditMode(false)); 
              dispatch(addSelectedTask([]))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default EditButton;
