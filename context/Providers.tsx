"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
//import { Provider as ReduxProvider } from "react-redux";
//import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./ReactQueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <Toaster position="top-center" reverseOrder={false} />
          
      
         <TooltipProvider delayDuration={0}>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </TooltipProvider>
      
    </ThemeProvider>
  );
}

