
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';

const RecipePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-6 border-b">
        <h1 className="text-xl font-bold">레시피 추천</h1>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default RecipePage;
