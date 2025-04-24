
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatInterface from '@/components/ui/chatbot/ChatInterface';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-background">
          <div className="absolute inset-0 bg-pharma-pattern"></div>
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">Data-Driven</span> Pharmaceutical Optimization
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  PharmaFlow AI connects manufacturers and customers with powerful insights about products, distribution efficiency, pricing, and demand.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-pharma-600 hover:bg-pharma-700"
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      const element = document.getElementById('learn-more');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pharma-600/20 to-secondary/20 rounded-lg blur-lg"></div>
                  <Card className="relative overflow-hidden border-2 shadow-xl">
                    <CardContent className="p-1">
                      <img 
                        src="https://placehold.co/600x400/EEE/31343C?text=Dashboard+Preview" 
                        alt="Dashboard Preview" 
                        className="rounded w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="learn-more" className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powered by Advanced Analytics</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform leverages AI and machine learning to provide actionable insights for pharmaceutical manufacturing and distribution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "AI-Powered Chatbot",
                  description: "Get instant answers about products, availability, pricing, and operational questions.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Demand Forecasting",
                  description: "Visual representation of predicted demand for various pharmaceutical products.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21H3V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 9L13 13L9 7L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Data Visualization",
                  description: "Interactive graphs showing vendor performance, distribution trends, and supply chain bottlenecks.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Price Prediction",
                  description: "Predict future prices of medicines based on current trends, market demand, and supply.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 bg-pharma-100 rounded-lg flex items-center justify-center text-pharma-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* ChatBot Demo Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Try Our AI Assistant</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered assistant can answer questions about pharmaceutical products, pricing, distribution, and more.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ChatInterface />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pharma-600 to-secondary text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Pharmaceutical Operations?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join leading pharmaceutical companies already using PharmaFlow AI to transform their manufacturing and distribution processes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Explore Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/register')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
