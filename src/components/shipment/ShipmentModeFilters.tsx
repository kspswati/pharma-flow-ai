
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShipmentModeFiltersProps {
  selectedYear: string;
  selectedTimeFrame: string;
  setSelectedYear: (year: string) => void;
  setSelectedTimeFrame: (timeFrame: string) => void;
}

const ShipmentModeFilters: React.FC<ShipmentModeFiltersProps> = ({
  selectedYear,
  selectedTimeFrame,
  setSelectedYear,
  setSelectedTimeFrame
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
      <div className="space-y-2 w-full md:w-64">
        <label className="text-sm font-medium">Year</label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 w-full md:w-64">
        <label className="text-sm font-medium">Time Frame</label>
        <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
          <SelectTrigger>
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ShipmentModeFilters;
