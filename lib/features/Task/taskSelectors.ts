import type { RootState } from "@/lib/store";

export const selectTaskList = (state: RootState) => state.tasks.TaskList;
export const selectSelectedTaskList = (state: RootState) => state.tasks.SelectedTask;
export const selectEditMode = (state: RootState) => state.tasks.EditMode;
export const selectTaskStatus = (state: RootState) => state.tasks.status;
export const selectTaskError = (state: RootState) => state.tasks.error;
