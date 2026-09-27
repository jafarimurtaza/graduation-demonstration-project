type Graduate = {
  name: string;
  slug: string;
};
type HeroSectionProps = {
  graduates: Graduate[];
};

export default function HeroSection({ graduates }: HeroSectionProps) {
  return (
    <header className="space-y-6 sm:space-y-8">
      {/* Premium Bento Header Container */}
      <div className="grid grid-cols-1 items-center gap-8 rounded-[28px] border border-[#2b2670]/10 bg-[#fffffe] p-6 shadow-[0_20px_40px_-15px_rgba(43,38,112,0.03)] sm:p-8 md:p-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c59c45]/20 bg-[#c59c45]/10 px-3.5 py-1.5 text-[10px] font-bold tracking-wider text-[#c59c45] uppercase shadow-sm sm:text-[11px] sm:tracking-widest">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c59c45]" />
            Cohort Celebration • Active Registry
          </div>
          <h1 className="text-4xl leading-[1.05] font-black tracking-tight text-[#2b2670] sm:text-5xl lg:text-6xl">
            Honor Our Graduates
          </h1>
          <p className="max-w-xl text-sm leading-relaxed font-normal text-slate-600 sm:text-base">
            Choose a graduate below to write a message and celebrate their
            incredible tech journey on our community wall.
          </p>
        </div>

        {/* Custom Royal Blue & Gold Visual Counter Block */}
        <div className="relative flex h-full min-h-[140px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#c59c45]/30 bg-[#2b2670] p-6 text-[#fffffe] shadow-xl">
          <div className="pointer-events-none absolute -right-6 -bottom-6 select-none font-sans text-9xl font-black text-white/5">
            {graduates.length}
          </div>
          <div className="text-[11px] font-bold tracking-widest text-[#c59c45] uppercase">
            Total Verified Records
          </div>
          <div className="mt-auto space-y-1">
            <div className="font-mono text-4xl font-black tracking-tight text-[#fffffe] sm:text-5xl">
              {graduates.length}
            </div>
            <div className="text-xs font-medium text-slate-300">
              Profiles Active & Live Online
            </div>
          </div>
        </div>
      </div>

      {/* Section Headline Divider */}
      <div className="flex items-center gap-4 px-1 sm:px-2">
        <h2 className="shrink-0 text-[11px] font-black tracking-widest text-[#2b2670] uppercase opacity-80">
          Alumni Interactive Grid Array
        </h2>
        <div className="h-px flex-1 bg-[#2b2670]/10" />
      </div>
    </header>
  );
}
