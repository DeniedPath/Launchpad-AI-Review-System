import { useState } from 'react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  requirements: string;
}

interface CodeSubmitFormProps {
  assignments: Assignment[];
}

export function CodeSubmitForm({ assignments }: CodeSubmitFormProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<string>(assignments[0]?.id || '');
  const [code, setCode] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const currentAssignment = assignments.find((a) => a.id === selectedAssignment);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setCode(event.target.result);
        }
      };
      reader.readAsText(selectedFile);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Processing...');
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          assignmentId: selectedAssignment,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      setFeedback('Error submitting code. Please try again.');
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section>
        <label className="block mb-2">
          <span className="text-white font-medium">Select Assignment</span>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-[#293038] bg-[#1c2126] text-white p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {assignments.map((assignment) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.title}
              </option>
            ))}
          </select>
        </label>
        
        {currentAssignment && (
          <div className="mt-3 p-4 rounded-lg bg-[#293038] text-gray-300">
            <p className="font-medium text-white mb-1">Requirements:</p>
            <p className="text-sm mb-2">{currentAssignment.requirements}</p>
            <p className="text-sm">{currentAssignment.description}</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-white font-medium mb-2">Submit your code</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <textarea
              placeholder="Paste your Python code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 rounded-lg border border-[#293038] bg-[#1c2126] text-white p-4 font-mono text-sm resize-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col justify-center">
            <input
              type="file"
              accept=".py"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-3 bg-[#293038] text-white text-sm font-medium rounded-lg hover:bg-[#353f4b] transition-colors cursor-pointer text-center"
            >
              Upload .py file
            </label>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit for Review
          </button>
        </div>
      </section>

      {feedback && (
        <section>
          <h2 className="text-white font-medium mb-2">AI Feedback</h2>
          <div className="p-4 rounded-lg border border-[#293038] bg-[#1c2126] text-white">
            {feedback}
          </div>
        </section>
      )}
    </form>
  );
}
