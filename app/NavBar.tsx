"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { FaBug } from "react-icons/fa";
import * as Label from "@radix-ui/react-label";
import { Button } from "./components/ui/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { label: "Home", href: "/" },
    { label: "Issues", href: "/issues", authOnly: true },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0">
      <Link href="/">
        <div className="flex items-center space-x-1">
          <FaBug className="text-blue-600" />
          <Label.Root className="text-[15px] font-bold leading-[35px] cursor-pointer">
            BT
          </Label.Root>
        </div>
      </Link>

      <ul className="flex space-x-6 items-center">
        {links
          .filter((link) => !link.authOnly || session)
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classnames({
                "text-zinc-950": pathname === link.href,
                "text-zinc-500": pathname !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          ))}

        {status === "authenticated" ? (
          <Button variant="secondary" onClick={() => signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button variant="primary" onClick={() => router.push("/auth/signin")}>
            Sign In
          </Button>
        )}
      </ul>
    </nav>
  );
}
