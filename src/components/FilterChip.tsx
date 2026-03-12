interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <div className="filter-chip">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="remove-chip"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </div>
  );
}