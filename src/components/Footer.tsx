// Fixed on purpose: this project was built during the graduation event.
const CREATED_ON = "2026-09-26";
const CREATED_ON_LABEL = "26 September 2026";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#c59c45]/40" />
        <span className="text-xl" aria-hidden>
          🎓
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#c59c45]/40" />
      </div>

      <div className="flex flex-col items-center gap-3 pb-2 text-center">
        <p className="text-[10px] font-bold tracking-widest text-[#c59c45] uppercase sm:text-[11px]">
          Made with love at the graduation celebration
        </p>

        <time
          dateTime={CREATED_ON}
          className="inline-flex items-center gap-2 rounded-full border border-[#2b2670]/10 bg-[#fffffe] px-4 py-2 text-sm font-black text-[#2b2670] shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c59c45]" />
          {CREATED_ON_LABEL}
        </time>

        <p className="max-w-sm text-xs leading-relaxed text-slate-500">
          Built for the graduates of Afghan Geeks Education, to celebrate every
          step of their journey.
        </p>
      </div>
    </footer>
  );
}
