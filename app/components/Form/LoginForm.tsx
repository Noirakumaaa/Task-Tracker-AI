"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectError,
} from "@/lib/features/Auth/authSelectors";
import { AppDispatch } from "@/lib/store";
import { login } from "@/lib/features/Auth/authThunks";
import { useRouter } from "next/navigation";


interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  // Redux state
  const currentUser = useSelector(selectCurrentUser);
  const errorRedux = useSelector(selectError);

  // Local state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);



  // Sync Redux state to local state for currentUser
  useEffect(() => {
    if(currentUser){
      router.push(`/v1/${currentUser?.id}`)
    }

  }, [currentUser]);

  // Sync error message from Redux
  useEffect(() => {
    if (errorRedux) {
      setErrorMessage(errorRedux);
    }
  }, [errorRedux]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    dispatch(login(formData))
  };
  

  return (
    <div className="flex justify-center items-center h-[90%]">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col space-y-4 border w-1/3 h-2/3 rounded-2xl"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="w-full max-w-xs">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleFormChange}
            placeholder="Type here"
            value={formData.email}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="w-full max-w-xs">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type here"
            onChange={handleFormChange}
            value={formData.password}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button className="btn btn-outline" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
