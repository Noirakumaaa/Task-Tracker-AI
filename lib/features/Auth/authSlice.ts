import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import Cookies from "js-cookie";
import { login, register } from "./authThunks";
import { selectCurrentUser } from "./authSelectors";

interface AuthState {
  currentUser: null | { id: string; role: string; token: string };
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
  role: string | null;
  id: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  status: "idle",
  error: null,
  role: null,
  id: null,
};

interface CurrentUser {
  token: string
  role : string
  id : string
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.role = null;
      state.id = null;
      state.status = "idle";
      state.error = null;
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },

});

export const { logout, setCurrentUser,setError } = authSlice.actions;
export default authSlice.reducer;
