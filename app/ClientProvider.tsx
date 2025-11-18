'use client';
import { SessionProvider } from "next-auth/react";
import { Theme } from "@radix-ui/themes";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Theme accentColor="violet" grayColor="gray" radius="large">
        {children}
      </Theme>
    </SessionProvider>
  );
}
