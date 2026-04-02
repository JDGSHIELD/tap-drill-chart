import Checkbox from '../ui/Checkbox';

interface SizeOption { size: string; tpi: number; key: string; }

interface Props {
  options: SizeOption[];
  commonSizes: string[];
  onToggle: (key: string) => void;
}

export default function CommonSizesTab({ options, commonSizes, onToggle }: Props) {
  return (
    <div>
      <p className="text-[#666] text-sm mb-3">Select which sizes appear when &quot;Common&quot; filter is active:</p>
      <div className="divide-y divide-[#222]">
        {options.map(opt => (
          <Checkbox
            key={opt.key}
            checked={commonSizes.includes(opt.key)}
            onChange={() => onToggle(opt.key)}
            label={`${opt.size}-${opt.tpi}`}
          />
        ))}
      </div>
    </div>
  );
}
