import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: "Launchpad-AI-Review-System (AIRS)",
  description: "AI-powered code review and assignment management for Launchpad.",
};

export default function Home() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#eeeeee', color: '#000000' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header
          className="flex items-center justify-between px-10 py-4 border-b"
          style={{ backgroundColor: '#f0f2f5', borderBottomColor: '#0a6377' }}
        >
          <div className="flex items-center gap-4">
            <div className="size-4 text-[#0faec9]">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: '#000000' }}>
              Launchpad-AI-Review-System (L-AIRS)
            </h2>
          </div>
          <nav className="flex items-center gap-8">
            <Link href="/pages/dashboard" className="text-sm font-semibold hover:underline" style={{ color: '#000000' }}>
              Dashboard
            </Link>
            <Link href="/pages/login" className="text-sm font-semibold hover:underline" style={{ color: '#0faec9' }}>
              Admin login
            </Link>
          </nav>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <section
            className="w-full max-w-4xl rounded-lg p-10"
            style={{ backgroundColor: '#d2e5ea', backgroundImage: 'none' }}
          >
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#0a6377' }}>
              Welcome to Launchpad-AIRS
            </h1>
            <p className="text-base mb-6" style={{ color: '#444444' }}>
              AI-powered feedback for Python code submissions
            </p>
            <Link
              href="/pages/dashboard"
              className="inline-block rounded-md px-5 py-3 text-white font-semibold"
              style={{ backgroundColor: '#e26b2d' }}
            >
              Get started!
            </Link>
          </section>

          <section className="w-full max-w-4xl mt-16 px-4">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a6377' }}>
              Features
            </h2>
            <p className="text-base" style={{ color: '#444444' }}>
              Upload your Python code and receive an AI-generated review in minutes.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
