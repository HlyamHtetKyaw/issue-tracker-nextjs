"use client";

import * as React from "react";
import { Button } from "./components/ui/Button";
import * as Separator from "@radix-ui/react-separator";
import { FaBug } from "react-icons/fa";

export default function Home() {
  return (
    <div className=" text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
        <h1>
          <FaBug className="text-9xl text-blue-600 mb-4" />
        </h1>
        <h1 className="text-5xl font-extrabold mb-4">
          Buggy <span className="text-blue-600">Track</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Track where your teammates are. Get started today.
        </p>
        <div className="flex gap-4">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </section>

      <Separator.Root className="bg-gray-200 h-px w-full" />

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Buggy Track. All rights reserved.
      </footer>
    </div>
  );
}
