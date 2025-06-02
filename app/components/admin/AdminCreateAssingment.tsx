"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminCreateAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [filename, setFilename] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit data to backend or API
    console.log({ title, description, requirements, filename, tags });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <span className="font-bold text-lg">
          Launchpad-AI-Review-System (AIRS)
        </span>
        <div className="space-x-6">
          <Link href="/pages/admin/create" className="hover:underline">
            Create Assignment
          </Link>
          <Link href="/pages/admin/manage" className="hover:underline">
            Manage Assignments
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hover:underline"
          >
            Log out
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Create new Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Reverse String"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              placeholder="Brief description of the assignment"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Enter a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Requirements</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              placeholder="All requirements"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Expected Filename</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. reverse_string.py"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            Save Assignment
          </button>
        </form>
      </main>
    </div>
  );
}