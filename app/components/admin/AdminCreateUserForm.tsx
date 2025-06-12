"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/admin-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setMessage("Admin user created successfully.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/pages/admin/user"), 1200);
    } else {
      const data = await res.json();
      setMessage(data.error ?? "Failed to create admin user.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Admin User</h2>
      {message && <div className="mb-4 text-center text-red-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block font-medium mb-1">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Confirm password"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded"
            onClick={() => router.push("/pages/admin/user")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
