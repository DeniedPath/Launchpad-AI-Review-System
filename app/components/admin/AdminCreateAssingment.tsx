"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface AssignmentPayload {
  title: string;
  description: string;
  requirements: string;
  filename: string;
}
 
export default function AdminCreateAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [filename, setFilename] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: AssignmentPayload = { title, description, requirements, filename };
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create assignment");
      alert("Assignment created successfully!");
      setTitle("");
      setDescription("");
      setRequirements("");
      setFilename("");
    } catch (err) {
      console.error("Error creating assignment:", err);
      alert("Error creating assignment.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee", color: "#000000" }}>
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b" style={{ backgroundColor: "#f0f2f5", borderBottomColor: "#0a6377" }}>
        <span className="font-bold text-lg">Launchpad-AI-Review-System (AIRS)</span>
        <div className="space-x-6">
          <Link href="/pages/admin/create" className="hover:underline" style={{ color: "#0faec9" }}>
            Create Assignment
          </Link>
          <Link href="/pages/admin/manage" className="hover:underline" style={{ color: "#0faec9" }}>
            Manage Assignments
          </Link>
          <Link href="/pages/admin/user" className="hover:underline" style={{ color: "#0faec9" }}>
            Admin Users
          </Link>
          <button
            onClick={async () => {
              await signOut({ callbackUrl: "/pages/login" });
            }}
            className="hover:underline"
            style={{ color: "#f27e34" }}
          >
            Log out
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Create new Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="assignment-title" className="block font-medium mb-1">
              Title
            </label>
            <input
              id="assignment-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Reverse String"
              required
              style={{ color: "#000000" }}
            />
          </div>

          <div>
            <label htmlFor="assignment-description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="assignment-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              placeholder="Brief description of the assignment"
              required
              style={{ color: "#000000" }}
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block font-medium mb-1">
              Requirements
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              placeholder="All requirements"
              required
              style={{ color: "#000000" }}
            />
          </div>

          <div>
            <label htmlFor="expected-filename" className="block font-medium mb-1">
              Expected Filename
            </label>
            <input
              id="expected-filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. reverse_string.py"
              required
              style={{ color: "#000000" }}
            />
          </div>

          <button
            type="submit"
            className="font-semibold px-6 py-2 rounded"
            style={{ backgroundColor: "#0faec9", color: "#ffffff" }}
          >
            Save Assignment
          </button>
        </form>
      </main>
    </div>
  );
}
