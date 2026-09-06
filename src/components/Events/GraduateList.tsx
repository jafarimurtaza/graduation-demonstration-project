// src/components/Events/GraduateList.tsx
'use client';

import React from 'react';

interface Graduate {
  id: string;
  documentId: string;
  name: string;
}

interface GraduateListsProps {
  graduates: Graduate[];
  error: boolean;
  selectedId: string;
  onSelect: (documentId: string) => void;
}

export default function GraduateLists({ graduates, error, selectedId, onSelect }: GraduateListsProps) {
  // English Error State Interface Layout Block
  if (error) return (
    <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200/80 text-rose-700 rounded-2xl max-w-xl mx-auto shadow-sm">
      <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping shrink-0" />
      <span className="text-xs font-bold tracking-wide">Registry sync interrupted. Real-time metrics loading faulted.</span>
    </div>
  );

  // English Empty State Interface Layout Block
  if (!graduates || graduates.length === 0) return (
    <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 rounded-[24px] max-w-xl mx-auto text-center space-y-3">
      <div className="text-4xl opacity-50 filter saturate-50">📁</div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Database Registry Empty</p>
    </div>
  );

  return (
    /* Grouping the entire wrapper container 'group/grid' allows us to trigger smart layout-wide focus dims */
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 group/grid">
      {graduates.map((grad) => {
        const isSelected = selectedId === grad.documentId;
        
        return (
          <button
            key={grad.id}
            type="button"
            onClick={() => onSelect(grad.documentId)}
            className={`group/card relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 transform active:scale-[0.97] cursor-pointer outline-none ${
              isSelected
                ? 'bg-white border-indigo-600 text-indigo-950 font-bold shadow-[0_12px_30px_-5px_rgba(79,70,229,0.15)] translate-y-[-4px] z-10'
                : 'bg-white/40 border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 hover:shadow-md hover:translate-y-[-2px] group-hover/grid:opacity-60 hover:!opacity-100'
            }`}
          >
            {/* Profile Structural Content Alignment Block */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              
              {/* Premium Geometric Monogram Container */}
              <div className={`flex items-center justify-center w-9 h-9 rounded-xl font-black text-xs tracking-wider transition-all duration-300 shrink-0 ${
                isSelected 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 rotate-45' 
                  : 'bg-slate-100 text-slate-400 group-hover/card:bg-indigo-50 group-hover/card:text-indigo-600 group-hover/card:rotate-12'
              }`}>
                {/* Counter-rotate the text icon inside if card is selected to keep layout straight */}
                <span className={isSelected ? '-rotate-45' : ''}>
                  {grad.name.trim().charAt(0)}
                </span>
              </div>

              {/* Graduate Name Tracking Label */}
              <span className="text-sm font-semibold tracking-wide truncate transition-colors duration-200">
                {grad.name}
              </span>
            </div>

            {/* Micro Interaction Right Hand Segment Slots */}
            <div className="flex items-center shrink-0 ml-3">
              {isSelected ? (
                /* Interactive Ping Anchor Layout Radial Element */
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
              ) : (
                /* Blueprint Style Token Key Index Tag */
                <span className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md font-mono bg-slate-100 border border-slate-200/40 text-slate-400 transition-all group-hover/card:bg-indigo-100/40 group-hover/card:text-indigo-500 group-hover/card:border-indigo-200/30">
                  ID//0{grad.id}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
