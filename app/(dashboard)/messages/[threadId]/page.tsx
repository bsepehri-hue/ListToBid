"use client";

interface ThreadPageProps {
  params: { threadId: string };
}

export default function ThreadPage({ params }: ThreadPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Conversation</h1>

      <p className="text-gray-600 mt-2">
        Thread ID: {params.threadId}
      </p>

      <p className="text-gray-500 mt-4">
        The full messaging UI will be implemented here in the next step.
      </p>
    </div>
  );
}