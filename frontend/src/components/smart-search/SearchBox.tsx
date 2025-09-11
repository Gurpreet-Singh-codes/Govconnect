'use client';
import { Mic, Brain } from 'lucide-react';
import { useState } from 'react';
import Card from '../dashboard/Card';
import Button from '../layout/Button';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    alert(`Searching for: ${query}`);
  };

  return (
    <Card className="space-y-4">
      {/* Input */}
      <div className="relative rounded-md border border-stone-300 p-3 pr-10 focus-within:ring-2 focus-within:ring-purple-400 focus-within:outline-none">
        <textarea
          rows={5}
          className="w-full resize-none rounded-md placeholder:text-sm"
          placeholder={`Ask naturally, for example:\n• Find all computer science students with high AI scores\n• Show me applications for data analyst positions from top universities\n...or click the microphone to speak`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Mic className="absolute top-3 right-3 h-5 w-5 cursor-pointer text-gray-400 hover:text-purple-500" />
      </div>

      {/* Button */}
      <Button
        onClick={handleSearch}
        className="w-full justify-center !bg-purple-500 !py-3 text-center hover:!bg-purple-600"
        variant="primary"
      >
        <Brain className="h-5 w-5" />
        Search with AI
      </Button>
    </Card>
  );
}
