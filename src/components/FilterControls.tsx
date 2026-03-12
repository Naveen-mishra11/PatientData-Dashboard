import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterControlsProps {
  onFilter: (filterBy: string, filterValue: string) => void;
  currentFilterBy: string;
  currentFilterValue: string;
}

export function FilterControls({ onFilter, currentFilterBy, currentFilterValue }: FilterControlsProps) {
  return (
    <div className="flex gap-4">
      <Select value={currentFilterBy} onValueChange={(value) => onFilter(value, currentFilterValue)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="medical_issue">Medical Issue</SelectItem>
          <SelectItem value="age_range">Age Range</SelectItem>
        </SelectContent>
      </Select>

      {currentFilterBy === 'medical_issue' && (
        <Select value={currentFilterValue} onValueChange={(value) => onFilter(currentFilterBy, value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select medical issue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fever">Fever</SelectItem>
            <SelectItem value="headache">Headache</SelectItem>
            <SelectItem value="sore throat">Sore Throat</SelectItem>
            <SelectItem value="sprained ankle">Sprained Ankle</SelectItem>
            <SelectItem value="rash">Rash</SelectItem>
            <SelectItem value="ear infection">Ear Infection</SelectItem>
          </SelectContent>
        </Select>
      )}

      {currentFilterBy === 'age_range' && (
        <Select value={currentFilterValue} onValueChange={(value) => onFilter(currentFilterBy, value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="young">Young (0-29)</SelectItem>
            <SelectItem value="adult">Adult (30-59)</SelectItem>
            <SelectItem value="senior">Senior (60+)</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}