"use client";

import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Assignment {
  id: string;
  title: string;
  requirements: string;
  description: string;
}

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [code, setCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      setAssignments(data);
      if (data.length > 0) setSelectedId(data[0].id);
    };
    fetchAssignments();
  }, []);

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
          assignment: selected?.description ?? "",
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

  let feedbackContent;
  if (loading) {
    feedbackContent = "Loading AI feedback...";
  } else if (feedback) {
    feedbackContent = <ReactMarkdown>{feedback}</ReactMarkdown>;
  } else {
    feedbackContent = "AI response will appear here.";
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee", color: "#000000" }}>
      <nav
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ backgroundColor: "#f0f2f5", borderBottomColor: "#0a6377" }}
      >
        <span className="font-bold text-lg">
          Launchpad-AI-Review-System (AIRS)
        </span>
        <div className="space-x-6">
          <Link href="/pages/dashboard" className="hover:underline" style={{ color: "#0faec9" }}>
            Dashboard
          </Link>
          <Link href="/pages/login" className="hover:underline" style={{ color: "#f27e34" }}>
            Admin login
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Review and improve your code</h2>
        </section>

        <section className="mb-6 border-b pb-4">
          <div className="flex flex-wrap items-center mb-2">
            <label className="font-medium mr-4" htmlFor="assignment-select">
              Select an Assignment
            </label>
            <Select.Root value={selectedId} onValueChange={setSelectedId}>
              <Select.Trigger
                id="assignment-select"
                className="inline-flex items-center justify-between px-3 py-2 rounded border bg-white text-sm text-black"
              >
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
          </div>
          <div className="text-sm mb-2 pl-1">
            <span className="font-semibold">Requirements:</span> {selected?.requirements}
          </div>
          <div className="text-sm mb-2">{selected?.description}</div>
        </section>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2 mb-2">
            <textarea
              className="w-full p-2 border rounded font-mono min-h-[120px] text-black placeholder-black"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here"
              required={!file}
            />
            <label className="flex flex-col items-center justify-center px-3 py-2 border rounded cursor-pointer bg-white hover:bg-gray-200">
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
            className="font-semibold px-6 py-2 rounded"
            style={{ backgroundColor: "#0faec9", color: "#ffffff" }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <section>
          <label className="block font-medium mb-1" htmlFor="feedback-output">
            Feedback
          </label>
          <div
            id="feedback-output"
            className="min-h-[60px] border rounded p-3 bg-white text-black whitespace-pre-wrap"
          >
            {feedbackContent}
          </div>
        </section>
      </main>
    </div>
  );
}
