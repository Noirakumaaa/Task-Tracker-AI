import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { addTask } from "@/lib/features/Task/taskThunks";
interface Task {
  user_id: string;
  name: string;
  description: string;
  status: string;
  start_date: Date ;
  deadline: Date;
}

interface PostTask {
  user_id: string;
  name: string;
  description: string;
  status: string;
  start_date: string ;
  deadline: string;
}

const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user_id = Cookies.get("user_id") || "";

  const [initialForm, setInitialForm] = useState<Task>({
    user_id,
    name: "",
    description: "",
    status: "PENDING",
    start_date: new Date(),
    deadline: new Date(),
  });
  
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!user_id) {
      return;
    }
    setInitialForm({
      ...initialForm,
      user_id: user_id || "",
    });
  }, [user_id]);

  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.showModal();
  };

  const CloseModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.table(formData);

    const dataToSend: PostTask = {
      ...formData,
      start_date: formData.start_date.toISOString(),
      deadline: formData.deadline.toISOString(),
    };
    dataToSend

    dispatch(addTask(dataToSend));
    CloseModal()
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "start_date" || id === "deadline") {
      const newDate = new Date(value);
      setFormData({
        ...formData,
        [id]: newDate, 
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const today = new Date().toISOString().split('T')[0]; 

  return (
    <>
      <button className="btn" onClick={openModal}>
        Add Task
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center m-5">Add New Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="name" className="block mb-3">Task Name</label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="py-2">
              <label htmlFor="description" className="block mb-3">Description</label>
              <textarea
                id="description"
                className="input input-bordered w-full"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="py-2">
              <label htmlFor="start_date" className="block mb-3">Start Date</label>
              <input
                type="date"
                id="start_date"
                className="input input-bordered w-full"
                value={formData.start_date.toISOString().split('T')[0]}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
            <div className="py-2">
              <label htmlFor="deadline" className="block mb-3">Deadline</label>
              <input
                type="date"
                id="deadline"
                className="input input-bordered w-full"
                value={formData.deadline.toISOString().split('T')[0]}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">Save Task</button>
              <button
                type="button"
                className="btn"
                onClick={CloseModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddTask;
