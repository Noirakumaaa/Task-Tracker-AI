import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationData {
  data: null | { name: string; link: string; notification_type: string };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationData = {
  data: null,
  status: "idle",
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<{ name: string; link: string; notification_type: string }>) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
    closeNotif: (state) => {
      console.log("close close")
      state.data = null;
      state.status = "idle";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setNotification, closeNotif, setError } = notificationSlice.actions;
export default notificationSlice.reducer;

