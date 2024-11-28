"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useConvexAuth, useQuery } from "convex/react";
import Link from "next/link";
import { Spinner } from "./spinner";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";

function Heading() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const data = useQuery(api.documents.getIndexDocs);

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans, Unifield, Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br /> better, faster work
        happends
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <Button size="sm" onClick={() => void signIn("github")}>
          Get Jotion free <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export default Heading;
