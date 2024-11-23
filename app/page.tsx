import type { Metadata } from "next";
import TopNav from "./components/Nav/TopNav";


export default function IndexPage() {
  return (
    <>
    <TopNav />
      <div className=" flex justify-center items-center h-[90%]">
      <h1>Landing Page</h1>
    </div>
    </>
  )
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
