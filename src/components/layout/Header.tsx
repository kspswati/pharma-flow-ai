
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../icons/Logo';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { BarChart3, TrendingUp, LayoutDashboard, Upload, Truck, Ship } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Home
            </Link>
            <Link to="/forecasting" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Forecasting
            </Link>
            <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Pricing
            </Link>
            <Link to="/freight" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Freight
            </Link>
            <Link to="/shipment-mode" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Shipment Mode
            </Link>
            <Link to="/data-import" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Data Import
            </Link>
            <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-pharma-600">
              Dashboard
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {user ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="bg-pharma-600 hover:bg-pharma-700"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
