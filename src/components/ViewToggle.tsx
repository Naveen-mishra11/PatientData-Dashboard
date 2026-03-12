import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'card' | 'row';
  onViewChange: (view: 'card' | 'row') => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentView === 'card' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('card')}
        className="flex items-center gap-2"
      >
        <LayoutGrid className="w-4 h-4" />
        Card View
      </Button>
      <Button
        variant={currentView === 'row' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('row')}
        className="flex items-center gap-2"
      >
        <List className="w-4 h-4" />
        Row View
      </Button>
    </div>
  );
}