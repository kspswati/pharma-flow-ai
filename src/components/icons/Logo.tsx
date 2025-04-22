
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-8 h-8 rounded bg-gradient-to-br from-pharma-500 to-secondary flex items-center justify-center text-white mr-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
        </svg>
      </div>
      <div className="font-bold text-xl">
        <span className="text-pharma-600">Pharma</span>
        <span className="text-secondary">Flow</span>
        <span className="text-xs align-top text-pharma-600 ml-0.5">AI</span>
      </div>
    </div>
  );
};

export default Logo;
