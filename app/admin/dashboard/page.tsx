'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Assignment, Submission } from '@prisma/client';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Array<Submission & { assignment: Assignment }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/admin/submissions');
        const data = await response.json();
        setSubmissions(data.submissions);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-[#111418]">
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#293038]">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
              fill="currentColor"
            />
          </svg>
          <span className="font-bold text-lg text-white">LARS Admin</span>
        </div>
        <Link 
          href="/api/auth/signout" 
          className="text-gray-300 hover:text-white hover:underline"
        >
          Sign Out
        </Link>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Submissions Dashboard</h1>
          <p className="text-gray-400">Review and manage student code submissions</p>
        </div>

        {loading ? (
          <div className="text-white">Loading submissions...</div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="p-6 rounded-lg border border-[#293038] bg-[#1c2126]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-medium">
                      {submission.assignment.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Submitted: {new Date(submission.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400">
                    Python
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-white text-sm font-medium mb-2">Code:</h4>
                  <pre className="p-4 rounded bg-[#111418] text-gray-300 text-sm overflow-x-auto">
                    {submission.code}
                  </pre>
                </div>

                <div>
                  <h4 className="text-white text-sm font-medium mb-2">Feedback:</h4>
                  <div className="p-4 rounded bg-[#293038] text-gray-300 text-sm">
                    {submission.feedback || "No feedback provided yet"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
