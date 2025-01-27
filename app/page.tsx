"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { signIn } = useAuthActions();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
    </div>
  );
}
