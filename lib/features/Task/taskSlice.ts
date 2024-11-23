import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Task {
  id: string
  user_id: string;
  name: string;
  description: string;
  status: string;
  start_date: string;
  deadline: string;
}

interface TaskItem {
  TaskList: Task[];
  SelectedTask: Task[];
  EditMode : boolean,
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskItem = {
  TaskList: [],
  SelectedTask: [],
  EditMode: false,
  status: "idle",
  error: null,
};



export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskList(state, action: PayloadAction<Task[]>) {
      state.TaskList = action.payload;
      state.status = "succeeded";
    },
    setSelectedTaskList(state, action: PayloadAction<Task[]>) {
      state.SelectedTask = action.payload;
      state.status = "succeeded";

    },
    setEditMode(state, action: PayloadAction<boolean>) {
      if (action.payload === false) {
        state.SelectedTask = [];
      }
      state.EditMode = action.payload;
      state.status = "succeeded";
    },    
    setStatus(
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">
    ) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const { setTaskList,setEditMode, setSelectedTaskList, setStatus, setError } =
  taskSlice.actions;    
export default taskSlice.reducer;

