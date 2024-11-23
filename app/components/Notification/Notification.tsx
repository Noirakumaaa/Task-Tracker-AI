"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeNotif } from "@/lib/features/Notification/notificationSlice";
import React, { useEffect, useState } from "react";
import { selectNotificationData } from "@/lib/features/Notification/notificationSelectors";
import Link from "next/link";

interface Props {
  name: string;
  link: string;
  notification_type: string;
}

const Notification = () => {
  const dispatch = useDispatch();
  const notif = useSelector(selectNotificationData);

  const [notificationData, setNotificationData] = useState<Props | null>(null);

  const handleButton = async () => {
    dispatch(closeNotif());
    setNotificationData(null);
  };

  useEffect(() => {
    if (notif) {
      setNotificationData(notif);

      setTimeout(() => {
        handleButton();
      }, 6000);
    }
  }, [notif]);

  if (!notificationData) {
    return null;
  }

  return (
    <>
      {notificationData.notification_type === "loading" && (
        <div
          role="alert"
          className="fixed bottom-[3%] left-[3%] w-[30%] alert alert-info"
        >
          <span className="loading loading-spinner loading-md"></span>
          <span>{notificationData.name}</span>
        </div>
      )}
      {notificationData.notification_type === "success" && (
        <div
          role="alert"
          className="fixed bottom-[3%] left-[3%] w-[30%] alert alert-success"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>{notificationData.name}</span>
          {notificationData.link === "Close" ? null : (
            <Link
              className="btn btn-outline"
              href={`/u/${notificationData.link}`}
            >
              {notificationData.link}
            </Link>
          )}
        </div>
      )}
      {notificationData.notification_type === "error" && (
        <div
          role="alert"
          className="fixed bottom-[3%] left-[3%] w-[30%] alert alert-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{notificationData.name}</span>
          <button onClick={handleButton}>Close</button>
        </div>
      )}
    </>
  );
};

export default Notification;
