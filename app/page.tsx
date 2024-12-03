import type { Metadata } from "next";
import LandingPage from "./components/Navigation/landing/LandingPage";
import NoneUserNav from "./components/Navigation/landing/Nav/NoneUserNav";


export default function IndexPage() {
  return (
    <>
        <NoneUserNav />
        <LandingPage />
    </>

  );
}

export const metadata: Metadata = {
  title: "TaskTracker",
};
