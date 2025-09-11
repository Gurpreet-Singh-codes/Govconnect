'use client';
import { useState } from 'react';
import { MessageCircle, Mic, Send } from 'lucide-react';
import Card from '../dashboard/Card';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AI assistant for the GovConnect internship platform. I can help you analyze applications, find insights, answer questions about candidates, and much more. What would you like to know?",
      time: 'less than a minute ago',
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      time: 'just now',
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'ai',
          text: 'This is a mock AI response!',
          time: 'just now',
        },
      ]);
    }, 1000);
  };

  return (
    <Card className="rounded-md !p-0 lg:col-span-2">
      <div className="flex w-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-stone-200 p-4">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} strokeWidth={2} className="text-pink-600" />
            <h3 className="text-lg font-medium">Chat with AI</h3>
          </div>
        </header>

        {/* Messages */}
        <div className="h-[400px] space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <div
                className={`max-w-[75%] rounded-xl p-3 text-sm ${
                  msg.sender === 'ai' ? 'self-start bg-purple-100' : 'self-end bg-blue-100'
                }`}
              >
                {msg.text}
              </div>
              <span className="mt-1 text-xs text-gray-500">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center border-t border-stone-200 p-2">
          <div className="flex w-full items-center rounded-lg p-2 focus:outline-none">
            <input
              type="text"
              className="flex-1 placeholder:text-sm"
              placeholder="Ask about applications, candidates, trends..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <div className="flex items-center">
            <button className="ml-2 flex aspect-square size-10 cursor-pointer items-center justify-center rounded-full bg-indigo-500 p-2 text-white transition duration-300 hover:bg-indigo-600">
              <Mic size={20} />
            </button>
            <button
              className="ml-2 flex aspect-square size-10 cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 text-white transition duration-300 hover:bg-green-600"
              onClick={handleSend}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
