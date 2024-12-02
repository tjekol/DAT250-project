"use client";

import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { createAccountAction } from "./create-account.action";
// Assuming you have a Spinner component for the loader

export default function CreateAccount() {
  const { execute, isExecuting, hasSucceeded } = useAction(createAccountAction);

  useEffect(() => {
    execute(); // Automatically call the server action when the component mounts
  }, [execute]);

  if (hasSucceeded) {
    console.log("Account created successfully");
    redirect("/dashboard"); // Redirect after successful account creation
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {isExecuting ? (
        <Loader className="animate-spin" />
      ) : (
        <p>Account creation failed. Please refresh page.</p>
      )}
    </div>
  );
}
