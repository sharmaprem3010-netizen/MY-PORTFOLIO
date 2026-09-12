interface SectionLabelProps {
  index: string;
  label: string;
  id: string;
}

export default function SectionLabel({ index, label, id }: SectionLabelProps) {
  return (
    <p data-testid={id} className="section-label">
      <span>{index}</span>
      {label}
    </p>
  );
}
