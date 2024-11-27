import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen dark:bg-[#1F1F1F]">{children}</div>
  );
}