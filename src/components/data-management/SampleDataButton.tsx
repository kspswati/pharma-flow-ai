
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader, Database } from "lucide-react";

interface SampleDataButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const SampleDataButton: React.FC<SampleDataButtonProps> = ({ isLoading, onClick }) => {
  return (
    <Button 
      variant="default" 
      className="w-full md:w-auto bg-pharma-600 hover:bg-pharma-700 flex items-center gap-2 py-5"
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
  );
};

export default SampleDataButton;
