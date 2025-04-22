
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// This is a simplified distribution map component
// In a real application, this would use a mapping library like Leaflet or Google Maps
const DistributionMap: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution Network</CardTitle>
        <CardDescription>Real-time view of distribution centers and efficiency metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-gradient-to-br from-pharma-50 to-secondary/10 rounded-md border border-border flex items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-pharma-pattern"></div>
          
          {/* Map points */}
          <div className="absolute h-4 w-4 rounded-full bg-pharma-600 top-[30%] left-[20%] animate-pulse-subtle shadow-lg shadow-pharma-500/20"></div>
          <div className="absolute h-3 w-3 rounded-full bg-pharma-500 top-[40%] left-[35%] animate-pulse-subtle shadow-lg shadow-pharma-500/20"></div>
          <div className="absolute h-5 w-5 rounded-full bg-pharma-700 top-[60%] left-[45%] animate-pulse-subtle shadow-lg shadow-pharma-500/20"></div>
          <div className="absolute h-3 w-3 rounded-full bg-pharma-500 top-[50%] left-[70%] animate-pulse-subtle shadow-lg shadow-pharma-500/20"></div>
          <div className="absolute h-4 w-4 rounded-full bg-pharma-600 top-[25%] left-[85%] animate-pulse-subtle shadow-lg shadow-pharma-500/20"></div>
          <div className="absolute h-3 w-3 rounded-full bg-pharma-500 top-[70%] left-[15%] animate-pulse-subtle shadow-lg shadow-pharma-500/20"></div>
          
          {/* Center and connections */}
          <div className="absolute h-6 w-6 rounded-full bg-secondary top-[45%] left-[50%] animate-pulse z-10 shadow-lg shadow-secondary/20"></div>
          
          {/* Connection lines */}
          <div className="absolute h-[1px] bg-pharma-300/50 w-[30%] top-[32%] left-[21%] transform rotate-12"></div>
          <div className="absolute h-[1px] bg-pharma-300/50 w-[15%] top-[43%] left-[36%] transform rotate-6"></div>
          <div className="absolute h-[1px] bg-pharma-300/50 w-[15%] top-[50%] left-[51%] transform rotate-45"></div>
          <div className="absolute h-[1px] bg-pharma-300/50 w-[20%] top-[47%] left-[51%] transform -rotate-6"></div>
          <div className="absolute h-[1px] bg-pharma-300/50 w-[35%] top-[35%] left-[51%] transform -rotate-12"></div>
          <div className="absolute h-[1px] bg-pharma-300/50 w-[35%] top-[60%] left-[20%] transform rotate-3"></div>
          
          <div className="text-center z-10">
            <p className="text-sm text-pharma-800 font-medium">Interactive Distribution Map</p>
            <p className="text-xs text-muted-foreground">Showing 6 distribution centers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionMap;
