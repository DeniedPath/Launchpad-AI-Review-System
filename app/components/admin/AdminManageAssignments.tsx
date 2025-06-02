"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  createdAt: string;
}

export default function AdminManageAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // TODO: Replace with real API call to fetch assignments
    setAssignments([
      { id: "1", title: "Assignment 1", createdAt: "2024-01-20" },
      { id: "2", title: "Assignment 2", createdAt: "2024-01-21" },
    ]);
  }, []);

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <span className="font-bold text-lg">Launchpad-AI-Review-System (AIRS)</span>
        <div className="space-x-6">
          <Link href="/admin/create" className="hover:underline">
            Create Assignment
          </Link>
          <Link href="/admin/manage" className="hover:underline">
            Manage Assignments
          </Link>
          <button className="hover:underline">Log out</button>
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
        />

        <table className="w-full border text-sm">
          <thead className="bg-gray-200 text-left">
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
                  <Link href={`/admin/edit?id=${a.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
