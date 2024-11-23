import type { ReactNode } from "react";
import type { Metadata } from 'next'
import { StoreProvider } from "./StoreProvider";
import Notification from "./components/Notification/Notification";
import Head from 'next/head';  // Import Head from next/head

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Task Tracker AI',
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <div className="w-screen h-screen">
            {children}
            <Notification />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
