
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from '@/components/ui/chatbot/ChatInterface';
import EnhancedChatInterface from '@/components/ui/chatbot/EnhancedChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChatbotPage = () => {
  return (
    <MainLayout 
      title="AI Assistant" 
      description="Interact with our AI to get answers about pharmaceutical products, pricing, and logistics"
    >
      <Tabs defaultValue="chat" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="chat">Standard Chat</TabsTrigger>
          <TabsTrigger value="enhanced">Enhanced Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Chat with PharmaFlow AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Ask questions about products, pricing, shipping, or any other pharmaceutical supply chain information.
              </p>
              <div className="bg-muted/30 rounded-lg p-6">
                <ChatInterface />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">What is the current lead time for Amoxicillin?</h3>
                  <p className="text-sm text-muted-foreground">Get information about current lead times for specific medications.</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Which shipping method is most cost-effective for vaccines?</h3>
                  <p className="text-sm text-muted-foreground">Compare shipping costs and methods for temperature-sensitive products.</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">What is the forecast for insulin prices next quarter?</h3>
                  <p className="text-sm text-muted-foreground">Get pricing forecasts based on historical data and market trends.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="enhanced">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Analytics Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                This enhanced version can analyze data, generate visualizations, and provide more detailed insights.
              </p>
              <div className="bg-muted/30 rounded-lg p-6">
                <EnhancedChatInterface />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ChatbotPage;
