"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTaskList, selectEditMode} from "@/lib/features/Task/taskSelectors";
import { AppDispatch } from "@/lib/store";
import { fetchTodo, addSelectedTask } from "@/lib/features/Task/taskThunks";

interface taskForm {
  id: string;
  user_id: string;
  name: string;
  description: string;
  status: string;
  deadline: string;
  start_date: string;
}

const TaskComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Redux state
  const taskList = useSelector(selectTaskList);
  const selectEdit = useSelector(selectEditMode);
  // Component state
  const [taskItems, setTaskItems] = useState<taskForm[]>([]); // all user task rendered to the table
  const [taskDetails, setTaskDetails] = useState<taskForm>(); // for the button details this is where i store the item data
  const [selectedItems, setSelectedItems] = useState<taskForm[]>([]); // selected items for edit mode
  const [editMode, setEditMode] = useState(false); // edit mode status
  const today = new Date().toISOString().split("T")[0]; // date today
  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Store selected items in Redux
  useEffect(() => {
    dispatch(addSelectedTask({ task: selectedItems }));
  }, [selectedItems]);

  // Update task items and reset selected items when not in edit mode
  useEffect(() => {
    if (!editMode) {
      setTaskItems([]);
      setSelectedItems([]);
    }
    setTaskItems(taskList);
  }, [taskList, editMode]);

  // Set edit mode based on Redux state
  useEffect(() => {
    setEditMode(selectEdit);
  }, [selectEdit]);

    const handleCheckboxChange = (task: taskForm, checked: boolean) => {
      if (checked) {
        setSelectedItems((prev) => [...prev, task]);
      } else {
        setSelectedItems((prev) =>
          prev.filter((item) => item.id !== task.id) 
        );
      }
    };
    

  // Handle details button click
  const handleDetails = (taskID: string) => {
    const TaskDetail = taskItems.find((task) => task.id === taskID);
    setTaskDetails(TaskDetail);
  };

  // Save the edited task
  const handleSave = () => {
    console.log("new Task details : ", taskDetails);
  };

  return (
    <div className="overflow-x-auto w-[80%] h-full p-10 ">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskItems.length > 0 ? (
            taskItems.map((element, index) => (
              <tr key={index}>
                <th>
                  <label>
                    {editMode && (
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) =>
                          handleCheckboxChange(element, e.target.checked)
                        }
                      />
                    )}
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">
                        {element.name || "Task Name"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{element.description || "Description"}</td>
                <td>
                  {element.deadline
                    ? new Date(element.deadline).toLocaleDateString()
                    : "Deadline"}
                </td>
                <td>{element.status || "Description"}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      const modal = document.getElementById(
                        "my_modal_3"
                      ) as HTMLDialogElement;
                      modal?.showModal();
                      handleDetails(element.id);
                    }}
                  >
                    details
                  </button>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSave}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            {taskDetails && (
              <>
                <h3 className="font-bold text-lg">{taskDetails?.name}</h3>

                <div className="py-4">
                  <label className="block text-sm font-medium">
                    Description:
                  </label>
                  <input
                    type="text"
                    value={taskDetails?.description}
                    onChange={(e) =>
                      setTaskDetails({
                        ...taskDetails,
                        description: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="py-4">
                  <label className="block text-sm font-medium">Status:</label>
                  <select
                    className="select select-bordered w-full max-w-xl"
                    value={taskDetails?.status || ""} 
                    onChange={(e) =>
                      setTaskDetails({ ...taskDetails, status: e.target.value })
                    }
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Hold">Hold</option>
                    <option value="Finish">Finish</option>
                  </select>
                </div>

                <div className="py-4">
                  <label className="block text-sm font-medium">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    value={new Date(taskDetails?.start_date).toLocaleDateString(
                      "en-CA"
                    )} // ISO format for date input
                    onChange={(e) =>
                      setTaskDetails({
                        ...taskDetails,
                        start_date: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                    min={today}
                  />
                </div>

                <div className="py-4">
                  <label className="block text-sm font-medium">Deadline:</label>
                  <input
                    type="date"
                    value={new Date(taskDetails?.deadline).toLocaleDateString(
                      "en-CA"
                    )} // ISO format for date input
                    onChange={(e) =>
                      setTaskDetails({
                        ...taskDetails,
                        deadline: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                    min={today}
                  />
                </div>

                <div className="py-4">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TaskComponent;
