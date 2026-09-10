import React from "react";

type Graduate = {
  name: string;
  slug: string;
};
type HeroSectionProps = {
  graduates: Graduate[];
};

export default function HeroSection({ graduates }: HeroSectionProps) {
  return (
    <div>
      {/* Decorative Elegant Soft Palette Lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#c59c45]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#2b2670]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Premium Bento Header Container */}
        <div className="bg-[#fffffe] border border-[#2b2670]/10 rounded-[28px] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(43,38,112,0.03)] grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#c59c45]/10 text-[#c59c45] text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-[#c59c45]/20 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c59c45] animate-pulse"></span>
              Cohort Celebration • Active Registry
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#2b2670] leading-[1.05]">
              Honor Our Graduates
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Choose a graduate below to write a message and celebrate their
              incredible tech journey on our community wall.
            </p>
          </div>

          {/* Custom Royal Blue & Gold Visual Counter Block */}
          <div className="bg-[#2b2670] text-[#fffffe] rounded-[22px] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[160px] border border-[#c59c45]/30">
            <div className="absolute -right-6 -bottom-6 text-9xl text-white/5 font-black font-sans pointer-events-none select-none">
              {graduates.length}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-[#c59c45] font-bold">
              Total Verified Records
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#fffffe]">
                {graduates.length}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Profiles Active & Live Online
              </div>
            </div>
          </div>
        </div>

        {/* Section Headline Divider */}
        <div className="flex items-center justify-between px-2">
          <h2 className="text-[#2b2670] text-[11px] font-black uppercase tracking-widest opacity-80">
            Alumni Interactive Grid Array
          </h2>
          <div className="h-[1px] flex-1 bg-[#2b2670]/10 mx-4 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
