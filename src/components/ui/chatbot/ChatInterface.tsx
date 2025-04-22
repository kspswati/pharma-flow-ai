
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your PharmaFlow AI assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses: {[key: string]: string} = {
        "pricing": "Based on current market analysis, we predict a 5-8% increase in antibiotic pricing over the next quarter due to supply constraints.",
        "demand": "Our forecasting models show an expected 12% increase in demand for respiratory medications in the northeast region this winter.",
        "distribution": "Current distribution efficiency is at 87%. We've identified potential bottlenecks in the midwest distribution centers.",
        "inventory": "Your current inventory levels are optimal for most products. However, we recommend increasing stock of Product XYZ by 15% based on trending demand patterns.",
        "forecast": "Our AI models predict increased demand for antivirals in the southern region over the next 3 months. Consider adjusting production schedules accordingly."
      };
      
      // Determine which response to use based on user input keywords
      let responseText = "I'm not sure I understand that query. Could you try rephrasing it? You can ask me about pricing trends, demand forecasts, distribution efficiency, or inventory recommendations.";
      
      const lowercaseInput = userMessage.text.toLowerCase();
      
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (lowercaseInput.includes(keyword)) {
          responseText = response;
          break;
        }
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-[500px] md:h-[600px] w-full border shadow-md">
      <div className="bg-pharma-600 text-white p-3 text-sm font-medium rounded-t-lg">
        PharmaFlow AI Assistant
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 border-2 border-pharma-200">
                  <div className="bg-gradient-to-br from-pharma-500 to-secondary text-white flex items-center justify-center h-full text-xs font-bold">
                    AI
                  </div>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-pharma-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 border bg-secondary text-secondary-foreground">
                  <div className="flex items-center justify-center h-full text-xs font-bold">
                    You
                  </div>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <Avatar className="h-8 w-8 border-2 border-pharma-200">
                <div className="bg-gradient-to-br from-pharma-500 to-secondary text-white flex items-center justify-center h-full text-xs font-bold">
                  AI
                </div>
              </Avatar>
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-pharma-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-pharma-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-pharma-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask about pricing, demand forecasts, distribution..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || input.trim() === ''}>
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChatInterface;
