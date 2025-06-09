"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { signIn, SignInResponse } from "next-auth/react"; // Import SignInResponse from next-auth
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const res: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok && !res.error) {
      setError("");
      router.push("/pages/admin/manage");
    } else {
      setError(res?.error ?? "Invalid credentials");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ minHeight: "100vh", backgroundColor: "#eeeeee", color: "#000000" }}
    >
      <nav className="w-full max-w-md flex items-center justify-between px-4 py-2 mb-4">
        <span className="font-bold text-lg">Launchpad-AI-Review-System (AIRS)</span>
        <button
          type="button"
          className="text-sm hover:underline"
          onClick={() => router.push("/pages/dashboard")}
          style={{ color: "#0faec9" }}
        >
          &larr; Back to Dashboard
        </button>
      </nav>

      <div
        className="w-full max-w-md p-6 rounded border shadow-sm"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h1 className="text-xl font-semibold mb-6 text-center">Log in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="admin@example.com"
              style={{ color: "#000000" }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="••••••••"
              style={{ color: "#000000" }}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full font-semibold px-4 py-2 rounded"
            style={{ backgroundColor: "#0faec9", color: "#ffffff" }}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
