interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  activeColor: string;
}

export default function SegmentedControl({ options, value, onChange, activeColor }: Props) {
  return (
    <div className="flex bg-[#1a1a1a] rounded-md p-0.5 gap-0.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`flex-1 py-1.5 px-2 rounded text-[11px] font-bold tracking-wide transition-colors ${
            value === opt.value
              ? 'text-black'
              : 'text-[#666] hover:text-[#999]'
          }`}
          style={value === opt.value ? { backgroundColor: activeColor } : {}}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
