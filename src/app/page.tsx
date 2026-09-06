// app/page.tsx
import React from 'react';
import GraduateLists from '../components/Events/GraduateList';
import { getGraduates } from '@/lib/api'; // Imported from Hadia's Task 2 branch

export default async function Page() {
  // 1. Fetch real server data from Hadia's Strapi integration utility
  // We use a try/catch block or fallback handling to accurately determine the error prop boolean flag.
  let graduates = [];
  let hasError = false;

  try {
    const data = await getGraduates();
    // Maps safely depending on whether getGraduates returns an array directly or an object wrapper
    graduates = Array.isArray(data) ? data : data?.graduates || [];
  } catch (err) {
    console.error('Failed to resolve graduate server profiles:', err);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-[#1c140e] text-[#fbf6f0] p-6 sm:p-12" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cohort Branding Header Area */}
        <div className="space-y-2 border-b border-amber-950/40 pb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-950/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-900/40">
            <span>★</span> Cohort 4 • {graduates.length} graduates
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-amber-50 sm:text-4xl">
            Send a graduation message
          </h1>
          <p className="text-amber-200/60 text-sm max-w-xl">
            Pick a graduate and write them a message
          </p>
        </div>

        {/* Section Headline */}
        <div className="space-y-1">
          <h2 className="text-amber-200/80 text-xs font-bold uppercase tracking-wider">
            Choose a graduate
          </h2>
        </div>

        {/* Task 3 Grid Component Connected to Real Pipeline */}
        {/* Note: selectedId and onSelect handling will be wired up by Samira (Task 6) or Zahra (Task 4) */}
        <GraduateLists 
          graduates={graduates}
          error={hasError}
          selectedId="" 
          onSelect={() => {}} 
        />

      </div>
    </main>
  );
}
