"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

interface props {
  name: string;
  link: string;
}

const UserNavButton = ({ name, link }: props) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    if (user_id) {
      setUserId(user_id);
    }
  }, []);

  if (!userId) {
    return null; 
  }

  return (
    <Link
      className=" sm:min-w-[120px] sm:w-30 md:btn-outline md:btn"
      href={`/v1/${userId}/${link}`}
    >
      {name}
    </Link>
  );
};

export default UserNavButton;
