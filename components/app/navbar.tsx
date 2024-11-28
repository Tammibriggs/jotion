"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "./mode.toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "../ui/button";
import { Spinner } from "./spinner";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";

function Navbar() {
  const scrolled = useScrollTop();
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 dark:bg-[#1F1F1F] flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => void signIn("github")}
            >
              Log in
            </Button> */}

            <Button onClick={() => void signIn("github")} size="sm">
              Log in with GitHub
            </Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
