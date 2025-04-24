
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../icons/Logo';
import { ThemeToggle } from '../theme/ThemeToggle';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
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
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-pharma-600">
            Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
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
        </div>
      </div>
    </header>
  );
};

export default Header;
