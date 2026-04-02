import Checkbox from '../ui/Checkbox';

interface Props {
  enabledControls: Record<string, boolean>;
  onToggle: (key: string) => void;
}

const controls = [
  { key: 'chipRollMode',   label: 'Chip / Roll Form Mode',      desc: 'Switch between cutting and roll-forming taps' },
  { key: 'commonFilter',   label: 'Common Sizes Filter',         desc: 'Filter the chart to your frequently-used sizes' },
  { key: 'threadPercent',  label: 'Thread Percentage',           desc: '75% / 50% for chip, or 75% / 65% for roll form' },
  { key: 'clearanceFit',   label: 'Clearance Fit',               desc: 'Close or free clearance hole sizing' },
  { key: 'majorDiameter',  label: 'Major Diameter Column (MAJ)', desc: 'Toggle the major Ø column in the chart' },
  { key: 'minorDiameter',  label: 'Minor Diameter Column (MIN)', desc: 'Toggle the minor Ø column in the chart' },
];

export default function ControlsTab({ enabledControls, onToggle }: Props) {
  return (
    <div>
      <p className="text-[#666] text-sm mb-3">
        Toggle which controls are visible in the main view. Disabled controls reset to their default value.
      </p>
      <div className="divide-y divide-[#222]">
        {controls.map(ctrl => (
          <Checkbox
            key={ctrl.key}
            checked={!!enabledControls[ctrl.key]}
            onChange={() => onToggle(ctrl.key)}
            label={ctrl.label}
            sublabel={ctrl.desc}
          />
        ))}
      </div>
    </div>
  );
}
