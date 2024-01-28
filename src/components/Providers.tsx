"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ThemeProvider } from "./ThemeProvider";

function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default Providers;