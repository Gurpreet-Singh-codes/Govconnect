import Card from '@/components/dashboard/Card';
import { Lightbulb } from 'lucide-react';
import React from 'react';

const suggestions = [
  'Find all computer science students with high AI scores.',
  'Show me students from top universities.',
  'List students with experience in government projects.',
  'Get students who have completed internships in the public sector.',
];

export default function Suggestions() {
  return (
    <Card>
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Lightbulb size={24} strokeWidth={2} className="text-pink-600" />
          <h3 className="text-lg font-medium">Chat with AI</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 pt-2 md:gap-6 lg:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-md border border-stone-200 p-3 text-sm font-medium transition duration-300 hover:bg-stone-100"
          >
            {suggestion}
          </div>
        ))}
      </div>
    </Card>
  );
}
