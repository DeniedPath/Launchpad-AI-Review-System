"use client";

import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";


const assignments = [
  {
    id: "assignment-1",
    title: "Assignment 1",
    requirements: "SUCCESSFULLY PRINT HELLO WORLD",
    description:
      "Write a Python function that takes a string as input and returns the string in reverse order. For example, if the input is 'hello', the function should return 'olleh'.",
  },
];

export default function StudentDashboard() {
  const [selectedId, setSelectedId] = useState(assignments[0].id);
  const [code, setCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const selected = assignments.find((a) => a.id === selectedId);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setCode(ev.target?.result as string);
      reader.readAsText(f);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setFeedback("");

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        assignment: selected?.description || "",
      }),
    });

    const data = await res.json();
    setFeedback(data.feedback);
  } catch (error) {
    console.error("Error:", error);
    setFeedback("Something went wrong fetching feedback.");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <span className="font-bold text-lg">
          Launchpad-AI-Review-System (AIRS)
        </span>
        <div className="space-x-6">
          <Link href="/pages/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/pages/login" className="hover:underline">
            Admin login
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Review and improve your code</h2>
          <div className="text-gray-600">Get feedback on your code</div>
        </section>

        <section className="mb-6 border-b pb-4">
          <div className="flex flex-wrap items-center mb-2">
            <label className="font-medium mr-4">Select an Assignment</label>
            <Select.Root value={selectedId} onValueChange={setSelectedId}>
              <Select.Trigger className="inline-flex items-center justify-between px-3 py-2 rounded border bg-white text-sm text-black">
                <Select.Value placeholder="Select an Assignment" />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="rounded shadow bg-white border z-50 text-black">
                  <Select.Viewport className="p-1">
                    {assignments.map((a) => (
                      <Select.Item
                        key={a.id}
                        value={a.id}
                        className="px-2 py-1 text-sm cursor-pointer hover:bg-blue-100 rounded"
                      >
                        <Select.ItemText>{a.title}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <span className="ml-auto text-sm text-gray-500">
              Requirements: <span className="font-semibold">{selected?.requirements}</span>
            </span>
          </div>
          <div className="text-gray-500 text-sm mb-2">{selected?.description}</div>
        </section>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2 mb-2">
            <textarea
              className="w-full p-2 border rounded font-mono min-h-[120px]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here"
              required={!file}
            />
            <label className="flex flex-col items-center justify-center px-3 py-2 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200">
              <span className="text-xs mb-1">or Upload a .py file</span>
              <input
                type="file"
                accept=".py"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <section>
          <label className="block font-medium mb-1">Feedback</label>
          <div className="min-h-[60px] border rounded p-3 bg-white text-gray-800 whitespace-pre-wrap">
            {loading ? "Loading AI feedback..." : feedback || "AI response will appear here."}
          </div>
        </section>
      </main>
    </div>
  );
}
