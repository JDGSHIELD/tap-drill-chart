interface Props {
  label: string;
  active: boolean;
  onToggle: () => void;
  activeColor?: string;
  activeBg?: string;
}

export default function ToggleButton({ label, active, onToggle, activeColor = '#fbbf24', activeBg = '#fbbf24' }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      className={`w-full py-2 px-3 rounded-md text-[11px] font-bold tracking-wide border transition-colors`}
      style={
        active
          ? { backgroundColor: activeBg, borderColor: activeBg, color: '#000' }
          : { backgroundColor: 'transparent', borderColor: activeColor, color: activeColor }
      }
    >
      {label}
    </button>
  );
}
