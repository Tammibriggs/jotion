"use client";

import { SearchCommand } from "@/components/app/search-command";
import { Spinner } from "@/components/app/spinner";
import Navigation from "@/components/main/navigation";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
// import { SearchCommand } from "@/components/search-command";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full min-h-screen flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto no-scrollbar">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
