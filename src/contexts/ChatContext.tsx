
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  isLoading: boolean;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock responses for the chatbot
const mockResponses: Record<string, string[]> = {
  default: [
    "냉장고에 있는 재료로 요리할 수 있는 레시피를 찾아볼게요.",
    "오늘은 어떤 요리를 하고 싶으신가요?",
    "냉장고에 어떤 재료가 있는지 알려주시면 레시피를 추천해 드릴게요.",
  ],
  "오늘 저녁 추천해줘": [
    "냉장고에 있는 재료를 확인해봤어요. 오늘 저녁으로는 이런 요리는 어떨까요?\n\n1. 돼지고기 된장찌개\n재료: 돼지고기, 두부, 된장, 고춧가루\n\n2. 당근 계란말이\n재료: 당근, 계란, 소금, 식용유\n\n3. 사과 샐러드\n재료: 사과, 양상추, 올리브 오일, 소금",
  ],
  "뭐 먹을까": [
    "냉장고에 돼지고기, 당근, 사과가 있네요! 다음 요리를 추천합니다:\n\n1. 돼지고기 당근 볶음\n2. 돼지고기 카레\n3. 사과 샐러드\n\n어떤 요리가 좋을까요?",
  ],
  "계란": [
    "계란으로 만들 수 있는 요리를 찾아봤어요:\n\n1. 계란말이\n2. 계란찜\n3. 계란국\n4. 계란 샌드위치\n\n필요한 레시피를 알려드릴까요?",
  ],
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '0',
          content: '안녕하세요! 냉장고에 있는 재료로 어떤 요리를 하고 싶으신가요?',
          sender: 'bot',
          timestamp: Date.now(),
        },
      ]);
    }
  }, [messages.length]);

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Mock response delay
    setTimeout(() => {
      // Find appropriate response or use default
      let responseContent = '';
      
      for (const [key, responses] of Object.entries(mockResponses)) {
        if (content.includes(key)) {
          responseContent = responses[Math.floor(Math.random() * responses.length)];
          break;
        }
      }
      
      if (!responseContent) {
        responseContent = mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)];
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      isLoading, 
      clearMessages 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
