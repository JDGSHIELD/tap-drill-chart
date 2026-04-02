export default function TapTypesTab() {
  const tapTypes = [
    {
      name: 'Taper Tap',
      art: '▽▽▽▼▼▼███',
      desc: '7–10 threads of gradual taper at the tip. Best for starting threads by hand. Use for through holes where you can tap from both sides, or as the first tap in a set.',
      use: 'Starting threads, through holes, hand tapping',
    },
    {
      name: 'Plug Tap',
      art: '▽▽▼▼████',
      desc: '3–5 threads of taper. The most common general-purpose tap. Good for through holes and blind holes with adequate clearance at the bottom.',
      use: 'General purpose, most common tap style',
    },
    {
      name: 'Bottoming Tap',
      art: '▼███████',
      desc: '1–2 threads of taper. Cuts threads to the very bottom of blind holes. Always start with a taper or plug tap first — bottoming taps can\'t start threads.',
      use: 'Blind holes, after starting with taper/plug',
    },
    {
      name: 'Spiral Point (Gun Tap)',
      art: '↗↗▼▼████',
      desc: 'Angled flutes push chips forward, ahead of the tap. Excellent for through holes in production. Faster than hand taps, works great in CNC and drill presses.',
      use: 'Through holes, CNC, production, power tapping',
    },
    {
      name: 'Spiral Flute Tap',
      art: '↙↙▼▼████',
      desc: 'Helical flutes pull chips up and out of the hole. Essential for blind holes in production. Prevents chip packing at the bottom of the hole.',
      use: 'Blind holes, soft materials, gummy metals',
    },
    {
      name: 'Forming Tap (Roll Tap)',
      art: '◇◇◇◆◆◆◆◆',
      desc: 'No flutes — forms threads by displacing material rather than cutting. Produces stronger threads, no chips. Requires larger tap drill. Only for ductile materials.',
      use: 'Aluminum, copper, mild steel, high production',
    },
  ];

  return (
    <div className="space-y-3 pb-4">
      {tapTypes.map(t => (
        <div key={t.name} className="bg-[#1a1a1a] rounded-lg p-4">
          <h3 className="text-white font-bold text-base mb-2">{t.name}</h3>
          <div className="bg-[#111] rounded px-3 py-2 mb-3 font-mono text-[#ff6b00] text-sm tracking-widest text-center">
            {t.art}
          </div>
          <p className="text-[#aaa] text-sm leading-relaxed mb-2">{t.desc}</p>
          <p className="text-[#555] text-xs">USE: {t.use}</p>
        </div>
      ))}
    </div>
  );
}
