// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import GraduateLists from '@/components/Events/GraduateList';

const dummyGraduatesResponse = [
  { id: '1', documentId: 'grad-1', name: 'Humaira' },
  { id: '2', documentId: 'grad-2', name: 'Afifa Nazari' },
  { id: '3', documentId: 'grad-3', name: 'Hadia Rauf' },
  { id: '4', documentId: 'grad-4', name: 'Zahra' },
  { id: '5', documentId: 'grad-5', name: 'Khatera Fayazi' },
  { id: '6', documentId: 'grad-6', name: 'Samira Qoraishi' },
];

export default function Page() {
  const [selectedId, setSelectedId] = useState<string>('');
  const graduates = dummyGraduatesResponse || [];
  const hasError = false; 

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden flex items-center justify-center p-4 sm:p-8 antialiased" dir="ltr">
      {/* Decorative Ambient Mesh Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-sky-200/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glass Workspace Console Container */}
      <div className="relative w-full max-w-5xl bg-white/60 border border-slate-200/80 rounded-[32px] p-6 sm:p-12 shadow-[0_24px_70px_-15px_rgba(15,23,42,0.06)] backdrop-blur-xl space-y-12">
        
        {/* Sleek Minimalist Console Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-8">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Graduation Wall Console
            </h1>
            <p className="text-slate-500 text-sm max-w-md font-normal leading-relaxed">
              Select an accomplished graduate profile below to securely route your congratulatory message thread.
            </p>
          </div>

          {/* Upper Micro Stat Indicator */}
          <div className="self-start md:self-center inline-flex items-center gap-2 bg-white text-slate-800 text-[11px] font-bold tracking-wider uppercase px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live • {graduates.length} Active Profiles
          </div>
        </div>

        {/* Console Subsection Heading */}
        <div className="space-y-1">
          <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Registry Sub-Grid Array
          </h2>
        </div>

        {/* Task 3 Ultra-Premium List View Grid Layout Component */}
        <GraduateLists 
          graduates={graduates}
          error={hasError}
          selectedId={selectedId} 
          onSelect={(id) => setSelectedId(id)}
        />
      </div>
    </main>
  );
}
