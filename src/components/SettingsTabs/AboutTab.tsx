export default function AboutTab() {
  return (
    <div className="space-y-6 pb-4">
      <section>
        <h3 className="text-white font-bold mb-2">Tap Mode (Chip Cut / Roll Form)</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          <span className="text-[#3b82f6] font-bold">Chip (Cut)</span> — Standard cutting taps that remove material and produce chips. Works in all materials. Uses 75% or 50% thread engagement drills.
        </p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-2">
          <span className="text-[#3b82f6] font-bold">Roll Form</span> — Chipless forming taps that displace material rather than cutting. Produces stronger threads, no chip removal needed. Requires a larger pre-tap hole than cutting taps. Only for ductile materials (aluminum, copper, mild steel, brass).
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">Thread Percentage (50% / 65% / 75%)</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          <span className="text-[#ff6b00] font-bold">75% Thread</span> — Smaller tap drill for softer materials like aluminum, brass, copper, and plastics. Easier tapping, less tap breakage, adequate thread strength for most applications.
        </p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-2">
          <span className="text-[#ff6b00] font-bold">50% Thread</span> — Larger tap drill for harder materials like steel, stainless steel, cast iron. More thread engagement needed for strength in harder materials. (Chip mode only.)
        </p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-2">
          <span className="text-[#ff6b00] font-bold">65% Thread</span> — Standard roll forming pre-tap hole size. Provides a balance of thread strength and ease of forming. (Roll form mode only.)
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">Clearance Fit (Close / Free)</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          <span className="text-[#22c55e] font-bold">Close Fit</span> — Minimal clearance around the screw. Use when alignment is critical or when you need a snug fit with minimal play.
        </p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-2">
          <span className="text-[#22c55e] font-bold">Free Fit</span> — Standard clearance for easy assembly. Allows for slight misalignment and thermal expansion. Most common choice.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">Major Diameter</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          <span className="text-[#a855f7] font-bold">Major Ø</span> — The largest diameter of the screw thread, measured crest to crest. This is the nominal size of the fastener.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">Minor Diameter</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          <span className="text-[#00d4ff] font-bold">Minor Ø</span> — The smallest diameter of the screw thread, measured root to root. This determines the core strength of the threaded section.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">Common / All Sizes</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          Filter to show only your frequently-used tap sizes. Customize which sizes appear in the &quot;Common Sizes&quot; tab.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">Support This App</h3>
        <p className="text-[#aaa] text-sm leading-relaxed">
          If this chart saves you time in the shop, you can support future updates here.
        </p>
        <a
          href="https://www.buymeacoffee.com/Josephdigiuseppe"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-[10px] border-2 border-black bg-[#FFDD00] px-4 py-2.5 text-[15px] font-bold text-black transition-transform hover:scale-[1.02] hover:brightness-95"
        >
          <span aria-hidden="true" className="text-lg leading-none">☕</span>
          <span>Buy me a coffee</span>
        </a>
      </section>
    </div>
  );
}
