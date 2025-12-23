"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 bg-card rounded-lg border border-border max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Trading Journal</h1>
        <p className="text-muted mb-6">Sign in to access your journal</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          {/* svg */}
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
