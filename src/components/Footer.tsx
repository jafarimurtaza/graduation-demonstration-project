// Fixed on purpose: this project was built during the graduation event.
const CREATED_ON = "2026-08-30";
const CREATED_ON_LABEL = "30 August 2026";

export default function Footer() {
  return (
    <footer className="relative z-10 max-w-7xl mx-auto mt-16 sm:mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c59c45]/40" />
        <span className="text-xl" aria-hidden>
          🎓
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c59c45]/40" />
      </div>

      <div className="flex flex-col items-center text-center gap-3 pb-6 sm:pb-0">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#c59c45]">
          Made with love at the graduation celebration
        </p>

        <time
          dateTime={CREATED_ON}
          className="inline-flex items-center gap-2 rounded-full border border-[#2b2670]/10 bg-[#fffffe] px-4 py-2 text-sm font-black text-[#2b2670] shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c59c45]" />
          {CREATED_ON_LABEL}
        </time>

        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
          Built for the graduates of Afghan Geeks Education, to celebrate
          every step of their journey.
        </p>
      </div>
    </footer>
  );
}
