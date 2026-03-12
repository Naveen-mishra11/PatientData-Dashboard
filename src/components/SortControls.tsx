import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {ArrowUp, ArrowDown } from 'lucide-react';

interface SortControlsProps {
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  currentSortBy: string;
  currentSortOrder: 'asc' | 'desc';
}

export function SortControls({ onSort, currentSortBy, currentSortOrder }: SortControlsProps) {
  return (
    <div className="flex gap-4 items-center">
      <span className="text-sm font-bold text-blue-500">Sort by:</span>
      <Select value={currentSortBy} onValueChange={(value) => onSort(value, currentSortOrder)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="patient_id">Patient ID</SelectItem>
          <SelectItem value="patient_name">Patient Name</SelectItem>
          <SelectItem value="age">Age</SelectItem>
          <SelectItem value="medical_issue">Medical Issue</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentSortOrder} onValueChange={(value: 'asc' | 'desc') => onSort(currentSortBy, value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Order">
            <div className="flex items-center">
              {currentSortOrder === 'asc' ? (
                <ArrowUp className="w-4 h-4 mr-2" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-2" />
              )}
              {currentSortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">
            <div className="flex items-center">
              <ArrowUp className="w-4 h-4 mr-2" />
              Ascending
            </div>
          </SelectItem>
          <SelectItem value="desc">
            <div className="flex items-center">
              <ArrowDown className="w-4 h-4 mr-2" />
              Descending
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}