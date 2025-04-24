
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare, Zap, Loader } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const defaultResponses: Record<string, string[]> = {
  "manufacturing": [
    "Our current manufacturing capacity utilization is at 87%. The Berlin facility is operating at full capacity, while the New Jersey facility has 15% spare capacity.",
    "Manufacturing lead times have increased by 8% in the last quarter due to supply chain disruptions in Asia. We're implementing contingency plans to address this.",
    "Based on our analysis, shifting production of Amoxicillin to the Hyderabad facility could reduce manufacturing costs by approximately 12%."
  ],
  "inventory": [
    "Current inventory levels for key antibiotics are sufficient for the next 45 days based on forecasted demand.",
    "We've identified potential stockout risks for Insulin in the European market in Q3 2025 due to increasing demand trends.",
    "Smart inventory allocation across our distribution centers could reduce overall holding costs by 8% while maintaining service levels."
  ],
  "demand": [
    "The demand for respiratory medications is projected to increase by 15% in the northeastern US region during the upcoming winter season.",
    "Our AI models predict a significant 23% increase in antiviral demand in Southeast Asia over the next 6 months.",
    "Historical data shows seasonal demand patterns for allergy medications, with peaks in spring and early summer. This year's forecast shows a 10% increase over last year."
  ],
  "pricing": [
    "Price sensitivity analysis indicates that a 5% reduction in Lipitor pricing could increase market share by approximately 8% in competitive markets.",
    "Competitor pricing for generic antibiotics has decreased by 7% on average in the last quarter, putting pressure on our margins.",
    "Our price optimization model suggests that a tiered pricing strategy across different regions could increase overall revenue by 11% without impacting demand."
  ],
  "distribution": [
    "Current average delivery time to European markets is 12 days, which is 2 days above our target. The main bottleneck is in customs clearance.",
    "Restructuring our distribution network to include a hub in Singapore could reduce delivery times to Asian markets by up to 40%.",
    "Weather disruptions in the Atlantic are currently affecting shipping routes to North America, with delays of 3-5 days expected for the next two weeks."
  ],
  "vendors": [
    "Vendor performance analysis shows that Supplier X has consistently delivered on time 95% of the time, compared to the industry average of 82%.",
    "We've identified three potential new suppliers for raw materials that could reduce costs by 15% while maintaining quality standards.",
    "The risk assessment of our current vendor network shows medium exposure to geopolitical risks in Eastern Europe and Southeast Asia."
  ]
};

const EnhancedChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your PharmaFlow AI assistant. I can help with supply chain questions, demand forecasting, pricing strategies, and more. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const findRelevantCategory = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const categories = Object.keys(defaultResponses);
    
    for (const category of categories) {
      if (lowerQuery.includes(category)) {
        return category;
      }
    }
    
    // Default fallback
    return "distribution";
  };
  
  const getRandomResponse = (category: string): string => {
    const responses = defaultResponses[category] || defaultResponses["distribution"];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const generateDetailedResponse = (query: string): string => {
    const category = findRelevantCategory(query);
    const baseResponse = getRandomResponse(category);
    
    // Add some personalization based on the query
    if (query.toLowerCase().includes("forecast")) {
      return `${baseResponse} Our forecasting models have 92% accuracy over a 6-month horizon.`;
    } else if (query.toLowerCase().includes("cost")) {
      return `${baseResponse} We estimate potential cost savings of 12-15% by optimizing this area.`;
    } else if (query.toLowerCase().includes("when") || query.toLowerCase().includes("time")) {
      return `${baseResponse} Our current timeline projections indicate improvements within the next 30-45 days.`;
    }
    
    return baseResponse;
  };
  
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
    
    // Simulate AI response with some delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateDetailedResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="flex flex-col h-[600px] w-full border shadow-md">
      <CardHeader className="flex flex-row items-center gap-2 bg-pharma-600 text-white p-3 rounded-t-lg">
        <Zap className="h-5 w-5" />
        <div className="font-medium">PharmaFlow Supply Chain Assistant</div>
      </CardHeader>
      
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
                <Loader className="h-4 w-4 animate-spin text-pharma-500" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <CardContent className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask about inventory, demand forecasting, distribution..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || input.trim() === ''} className="bg-pharma-600 hover:bg-pharma-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedChatInterface;
