import ChatBox from '@/components/assistant/ChatBox';
import QuickQuestions from '@/components/assistant/QuickQuestions';
import PageHeading from '@/components/PageHeading';
import React from 'react';

export default function AiAssistantPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Get intelligent insights about your internship programmes.">
          AI Powered Assistant
        </PageHeading>

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* <Card className="!p-0 lg:col-span-2">
            <header className="flex items-center justify-between border-b border-stone-200 p-4">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} strokeWidth={2} className="text-pink-600" />
                <h3 className="text-lg font-medium">Chat with AI</h3>
              </div>
            </header>

            <div className="p-4"></div>
          </Card> */}

          <ChatBox />

          <QuickQuestions />
        </div>
      </div>
    </section>
  );
}
