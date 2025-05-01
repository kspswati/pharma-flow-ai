
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader, Database } from "lucide-react";

interface SampleDataButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const SampleDataButton: React.FC<SampleDataButtonProps> = ({ isLoading, onClick }) => {
  return (
    <div className="flex justify-end mb-6">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Database className="h-4 w-4" />
        )}
        {isLoading ? "Loading Sample Data..." : "Load Sample Data"}
      </Button>
    </div>
  );
};

export default SampleDataButton;
