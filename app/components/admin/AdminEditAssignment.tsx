"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  requirements: string;
  filename: string;
}

export default function AdminEditAssignment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/assignments?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        let a = data;
        if (Array.isArray(data.assignments)) {
          a = data.assignments[0];
        } else if (data.assignment) {
          a = data.assignment;
        }
        if (!a) return;
        setAssignment(a);
        setTitle(a.title ?? "");
        setDescription(a.description ?? "");
        setRequirements(a.requirements ?? "");
        setFilename(a.filename ?? "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/assignments?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, requirements, filename }),
      });
      if (!res.ok) throw new Error("Failed to update assignment");
      alert("Assignment updated successfully!");
      router.push("/pages/admin/manage");
    } catch {
      alert("Error updating assignment.");
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!assignment) return <div className="p-8 text-center">Assignment not found.</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee", color: "#000000" }}>
      <nav className="flex items-center justify-between px-6 py-3 border-b" style={{ backgroundColor: "#f0f2f5", borderBottomColor: "#0a6377" }}>
        <span className="font-bold text-lg">Launchpad-AI-Review-System (AIRS)</span>
        <div className="space-x-6">
          <Link href="/pages/admin/create" className="hover:underline" style={{ color: "#0faec9" }}>Create Assignment</Link>
          <Link href="/pages/admin/manage" className="hover:underline" style={{ color: "#0faec9" }}>Manage Assignments</Link>
          <button onClick={async () => { await signOut({ callbackUrl: "/pages/login" }); }} className="hover:underline" style={{ color: "#f27e34" }}>Log out</button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Edit Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="assignment-title" className="block font-medium mb-1">Title</label>
            <input id="assignment-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" required placeholder="e.g. Reverse String" style={{ color: "#000000" }} />
          </div>
          <div>
            <label htmlFor="assignment-description" className="block font-medium mb-1">Description</label>
            <textarea id="assignment-description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 min-h-[100px]" required placeholder="Brief description of the assignment" style={{ color: "#000000" }} />
          </div>
          <div>
            <label htmlFor="requirements" className="block font-medium mb-1">Requirements</label>
            <textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="w-full border rounded px-3 py-2 min-h-[100px]" required placeholder="All requirements" style={{ color: "#000000" }} />
          </div>
          <div>
            <label htmlFor="expected-filename" className="block font-medium mb-1">Expected Filename</label>
            <input id="expected-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} className="w-full border rounded px-3 py-2" required placeholder="e.g. reverse_string.py" style={{ color: "#000000" }} />
          </div>
          <button type="submit" className="font-semibold px-6 py-2 rounded" style={{ backgroundColor: "#0faec9", color: "#ffffff" }} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </main>
    </div>
  );
}
