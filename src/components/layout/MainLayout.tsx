
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, BarChart3, TrendingUp, Globe, Database } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description }) => {
  const location = useLocation();
  
  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Demand Forecasting", url: "/forecasting", icon: BarChart3 },
    { title: "Price Prediction", url: "/pricing", icon: TrendingUp },
    { title: "Country Analysis", url: "/country-analysis", icon: Globe },
    { title: "Data Management", url: "/data-management", icon: Database },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={location.pathname === item.url ? "bg-accent" : ""}>
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 py-8 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
