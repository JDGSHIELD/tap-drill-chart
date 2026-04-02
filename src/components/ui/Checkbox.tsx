interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
  sublabel?: string;
}

export default function Checkbox({ checked, onChange, label, sublabel }: Props) {
  return (
    <button
      onClick={onChange}
      className="flex items-start gap-3 w-full text-left py-2.5 px-1 hover:bg-[#1a1a1a] rounded transition-colors"
      aria-pressed={checked}
    >
      <div
        className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-[#ff6b00] border-[#ff6b00]' : 'border-[#444] bg-transparent'
        }`}
      >
        {checked && <span className="text-black text-xs font-bold leading-none">✓</span>}
      </div>
      <div className="flex-1">
        <span className="text-[#e5e5e5] text-sm font-medium">{label}</span>
        {sublabel && <p className="text-[#555] text-xs mt-0.5">{sublabel}</p>}
      </div>
    </button>
  );
}
