"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Assignment {
  id: string;
  title: string;
  createdAt: string;
}

export default function AdminManageAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState<Assignment | null>(null);

  useEffect(() => {
    // Fetch assignments from API
    fetch("/api/assignments")
      .then((res) => res.json())
      .then((data: Assignment[]) => setAssignments(data))
      .catch(() => setAssignments([]));
  }, []);

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!toDelete) return;
    const res = await fetch(`/api/assignments?id=${toDelete.id}`, { method: "DELETE" });
    if (res.ok) {
      setAssignments((prev) => prev.filter((as) => as.id !== toDelete.id));
      setShowConfirm(false);
      setToDelete(null);
    } else {
      alert("Failed to delete assignment.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee", color: "#000000" }}>
      <nav className="flex items-center justify-between px-6 py-3 border-b" style={{ backgroundColor: "#f0f2f5", borderBottomColor: "#0a6377" }}>
        <span className="font-bold text-lg">Launchpad-AI-Review-System (AIRS)</span>
        <div className="space-x-6">
          <Link href="/pages/admin/create" className="hover:underline" style={{ color: "#0faec9" }}>
            Create Assignment
          </Link>
          <Link href="/pages/admin/manage" className="hover:underline" style={{ color: "#0faec9" }}>
            Manage Assignments
          </Link>
          <button
            className="hover:underline"
            style={{ color: "#f27e34" }}
            onClick={async () => {
              await signOut({ callbackUrl: "/pages/login" });
            }}
          >
            Log out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">Manage Assignment</h2>

        <input
          type="text"
          placeholder="Find Assignment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          style={{ color: "#000000" }}
        />

        <table className="w-full border text-sm">
          <thead style={{ backgroundColor: "#d2e5ea", color: "#000000" }}>
            <tr>
              <th className="p-2 border">Assignment</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-2 border font-medium">{a.title}</td>
                <td className="p-2 border">{a.createdAt}</td>
                <td className="p-2 border">
                  <Link href={`/pages/admin/edit?id=${a.id}`} className="hover:underline mr-3" style={{ color: "#0faec9" }}>
                    Edit
                  </Link>
                  <button
                    className="hover:underline"
                    style={{ color: "#e60023" }}
                    onClick={() => {
                      setToDelete(a);
                      setShowConfirm(true);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showConfirm && toDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="rounded shadow-lg p-6 max-w-sm w-full" style={{ backgroundColor: "#ffffff" }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#d7263d" }}>Confirm Delete</h3>
              <p className="mb-4">
                Are you sure you want to delete the assignment <span className="font-bold">&quot;{toDelete.title}&quot;</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded hover:bg-gray-300"
                  style={{ backgroundColor: "#dcdcdc" }}
                  onClick={() => {
                    setShowConfirm(false);
                    setToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded text-white hover:bg-red-700"
                  style={{ backgroundColor: "#e60023" }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
