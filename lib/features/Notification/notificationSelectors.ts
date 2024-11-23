import type { RootState } from "@/lib/store";



export const selectNotificationData = (state: RootState) => state.notification.data;
export const selectNotificationStatus = (state: RootState) => state.notification.status;
export const selectNotificationError = (state: RootState) => state.notification.error;
