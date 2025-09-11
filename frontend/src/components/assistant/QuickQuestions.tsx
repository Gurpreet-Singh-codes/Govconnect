import React from 'react';
import Card from '../dashboard/Card';
import { Sparkles } from 'lucide-react';

const quickQuestions = [
  'What are the most common skills among the applicants?',
  'Which universities do most applicants come from?',
  'What is the average GPA of the applicants?',
  'How many applicants have prior internship experience?',
  'What are the top majors among the applicants?',
];

export default function QuickQuestions() {
  return (
    <Card className="max-h-90">
      <header className="flex items-center gap-2">
        <div>
          <Sparkles className="text-amber-500" size={20} />
        </div>
        <div className="text-base font-medium">
          <h4>Quick Questions</h4>
        </div>
      </header>
      <div className="mt-4 flex flex-col gap-2 text-left md:mt-6">
        {quickQuestions.map((question) => (
          <button
            key={question}
            className="cursor-pointer rounded-md px-2 py-2 text-left text-sm font-medium transition duration-300 hover:bg-gray-100"
          >
            {question}
          </button>
        ))}
      </div>
    </Card>
  );
}
