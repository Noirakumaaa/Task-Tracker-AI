import SideOption from "@/app/components/SideOption";
import UserTopNav from "@/app/components/Nav/UserTopNav";
import { ReactNode } from "react";

export default function HomePage({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <UserTopNav />

      <div className="col-span-3 ">
      {children}
      </div>


    </div>
  );
}
