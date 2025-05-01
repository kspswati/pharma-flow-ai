
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Ship, Truck, UploadCloud, Database } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { loadSampleData } from '@/utils/loadSampleData';

const Index = () => {
  const navigate = useNavigate();
  const [isLoadingSampleData, setIsLoadingSampleData] = React.useState(false);

  const handleLoadSampleData = async () => {
    try {
      setIsLoadingSampleData(true);
      await loadSampleData();
    } catch (error) {
      console.error("Error loading sample data:", error);
      toast({
        title: "Error",
        description: "Failed to load sample data",
        variant: "destructive"
      });
    } finally {
      setIsLoadingSampleData(false);
    }
  };

  return (
    <MainLayout
      title="PharmaFlow.AI"
      description="Advanced pharma supply chain analytics and optimization"
    >
      <div className="flex justify-end mb-6">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleLoadSampleData}
          disabled={isLoadingSampleData}
        >
          {isLoadingSampleData ? (
            <>
              <span className="animate-spin">⟳</span>
              Loading Sample Data...
            </>
          ) : (
            <>
              <Database className="h-4 w-4" />
              Load Sample Dataset
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:border-pharma-500 transition-colors">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-pharma-600" />
            <CardTitle className="mt-2">Demand Forecasting</CardTitle>
            <CardDescription>Predict future product demand</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use machine learning-driven forecasting to optimize inventory planning.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-pharma-600 hover:bg-pharma-700" 
              onClick={() => navigate('/forecasting')}
            >
              Explore
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-pharma-500 transition-colors">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-pharma-600" />
            <CardTitle className="mt-2">Price Prediction</CardTitle>
            <CardDescription>Optimize pricing strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analyze pricing trends to improve procurement decisions.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-pharma-600 hover:bg-pharma-700" 
              onClick={() => navigate('/pricing')}
            >
              Explore
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-pharma-500 transition-colors">
          <CardHeader>
            <Ship className="h-8 w-8 text-pharma-600" />
            <CardTitle className="mt-2">Shipment Mode Analysis</CardTitle>
            <CardDescription>Optimize transport methods</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Compare shipment modes to minimize costs and delivery times.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-pharma-600 hover:bg-pharma-700" 
              onClick={() => navigate('/shipment-mode')}
            >
              Explore
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-pharma-500 transition-colors">
          <CardHeader>
            <Truck className="h-8 w-8 text-pharma-600" />
            <CardTitle className="mt-2">Freight Cost Analysis</CardTitle>
            <CardDescription>Optimize logistical expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track and analyze freight costs across vendors and regions.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-pharma-600 hover:bg-pharma-700" 
              onClick={() => navigate('/freight')}
            >
              Explore
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Import, export, and manage your supply chain data</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <p className="text-muted-foreground mb-4">
                Use our data management tools to import your existing supply chain data, 
                export analytics results, or input new data points for analysis.
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-pharma-100 text-pharma-800 p-1 rounded-full mr-2">✓</span>
                  Support for CSV, Excel, and JSON formats
                </li>
                <li className="flex items-center">
                  <span className="bg-pharma-100 text-pharma-800 p-1 rounded-full mr-2">✓</span>
                  Data validation and cleansing tools
                </li>
                <li className="flex items-center">
                  <span className="bg-pharma-100 text-pharma-800 p-1 rounded-full mr-2">✓</span>
                  Secure cloud storage for your datasets
                </li>
                <li className="flex items-center">
                  <span className="bg-pharma-100 text-pharma-800 p-1 rounded-full mr-2">✓</span>
                  Schedule automated data imports
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <Button 
                className="bg-pharma-600 hover:bg-pharma-700 mb-2 flex items-center gap-2"
                onClick={() => navigate('/data-import')}
              >
                <UploadCloud className="h-4 w-4" />
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
