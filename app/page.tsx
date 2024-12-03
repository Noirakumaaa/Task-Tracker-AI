import type { Metadata } from "next";
import LandingPage from "./components/Navigation/landing/LandingPage";
import Navigation from "./components/Navigation/landing/Nav/Navigation";


export default function IndexPage() {
  return (
    <>
        <Navigation />
        <LandingPage />
    </>

  );
}

export const metadata: Metadata = {
  title: "TaskTracker",
};
