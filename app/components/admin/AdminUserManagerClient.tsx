"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminUserManagerClient() {
  // Change Password form state
  const [changePassword, setChangePassword] = useState("");
  const [changeConfirmPassword, setChangeConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Use a proper type for adminUsers
  type AdminUser = { id: string; email: string };
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showConfirm, setShowConfirm] = useState<{ email: string | null }>({ email: null });
  const [showEdit, setShowEdit] = useState<{ email: string | null }>({ email: null });

  // Fetch all admin users on mount
  useEffect(() => {
    fetch("/api/admin-users")
      .then((res) => res.json())
      .then((data) => setAdminUsers(Array.isArray(data) ? data : data.users ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <span className="font-bold text-lg">Launchpad-AI-Review-System (AIRS)</span>
        <div className="space-x-6">
          <Link href="/pages/admin/create" className="hover:underline">Create Assignment</Link>
          <Link href="/pages/admin/manage" className="hover:underline">Manage Assignments</Link>
          <Link href="/pages/admin/user" className="hover:underline font-semibold text-blue-700">Admin Users</Link>
          <button
            onClick={async () => {
              await signOut({ callbackUrl: "/pages/login" });
            }}
            className="hover:underline"
          >
            Log out
          </button>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Admin User Management</h2>
        {message && <div className="mb-4 text-center text-red-600">{message}</div>}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Existing Admin Users</h3>
          <ul className="mb-4 divide-y border rounded bg-white">
            {adminUsers.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">No admin users found.</li>
            ) : (
              adminUsers.map((user) => (
                <li key={user.email} className="flex items-center justify-between px-4 py-2">
                  <span>{user.email}</span>
                  <div className="space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowEdit({ email: user.email })}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => setShowConfirm({ email: user.email })}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mb-4"
            onClick={() => window.location.assign('/pages/admin/createuser')}
          >
            Create New Admin
          </button>
        </section>
        {/* Edit Password Modal */}
        {showEdit.email && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold mb-2">Edit Admin Password</h3>
              <div className="mb-2">Editing: <span className="font-mono text-blue-700">{showEdit.email}</span></div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setMessage("");
                  if (changePassword !== changeConfirmPassword) {
                    setMessage("Passwords do not match.");
                    return;
                  }
                  setLoading(true);
                  const res = await fetch("/api/admin-users/password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: showEdit.email, password: changePassword }),
                  });
                  if (res.ok) {
                    setMessage("Password changed successfully.");
                    setChangePassword("");
                    setChangeConfirmPassword("");
                    setTimeout(() => {
                      setShowEdit({ email: null });
                      setMessage("");
                    }, 1200);
                  } else {
                    const data = await res.json();
                    setMessage(data.error ?? "Failed to change password.");
                  }
                  setLoading(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="edit-password" className="block font-medium mb-1">New Password</label>
                  <input
                    id="edit-password"
                    type="password"
                    value={changePassword}
                    onChange={(e) => setChangePassword(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label htmlFor="edit-confirm-password" className="block font-medium mb-1">Confirm New Password</label>
                  <input
                    id="edit-confirm-password"
                    type="password"
                    value={changeConfirmPassword}
                    onChange={(e) => setChangeConfirmPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                    placeholder="Confirm new password"
                  />
                </div>
                {message && <div className="text-center text-red-600">{message}</div>}
                <div className="flex space-x-2 justify-end">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded"
                    onClick={() => {
                      setShowEdit({ email: null });
                      setMessage("");
                      setChangePassword("");
                      setChangeConfirmPassword("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Confirmation Modal */}
        {showConfirm.email && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h4 className="text-lg font-bold mb-2">Are you sure?</h4>
              <p className="mb-4">Delete admin <span className="font-mono text-red-700">{showConfirm.email}</span>? This cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => setShowConfirm({ email: null })}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                  onClick={async () => {
                    setLoading(true);
                    setMessage("");
                    const res = await fetch("/api/admin-users", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: showConfirm.email }),
                    });
                    if (res.ok) {
                      setAdminUsers((prev) => prev.filter((u) => u.email !== showConfirm.email));
                      setMessage("Admin deleted successfully.");
                    } else {
                      const data = await res.json();
                      setMessage(data.error ?? "Failed to delete admin user.");
                    }
                    setShowConfirm({ email: null });
                    setLoading(false);
                  }}
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
