'use client';

import { Navigation } from './components/Navigation';
import { CodeSubmitForm } from './components/CodeSubmitForm';
import type { Assignment } from './types';

const assignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Assignment 1',
    description: 'Write a Python function that takes a string as input and returns the string in reverse order. For example, if the input is \'hello\', the function should return \'olleh\'.',
    requirements: 'SUCCESSFULLY PRINT HELLO WORLD',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#111418]">
      <Navigation />
      <main className="max-w-4xl mx-auto mt-8 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Review and improve your code</h1>
          <p className="text-gray-400">Get instant feedback on your Python code submissions</p>
        </div>
        <CodeSubmitForm assignments={assignments} />
      </main>
    </div>
  );
}
