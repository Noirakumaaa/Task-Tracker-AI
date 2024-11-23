import type { RootState } from "@/lib/store";

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectError = (state: RootState) => state.auth.error;
export const selectRole = (state: RootState) => state.auth.role;
export const selectId = (state: RootState) => state.auth.id;
