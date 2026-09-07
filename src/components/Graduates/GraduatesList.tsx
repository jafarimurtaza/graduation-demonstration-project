// src/components/Graduates/GraduatesList.tsx
'use client';

import React from 'react';
import { Graduate } from '@/lib/api';

interface GraduateListsProps {
  graduates: Graduate[];
  error: boolean;
  selectedId: string;
  onSelect?: (slug: string) => void;
}

export default function GraduateLists({ graduates, error, selectedId, onSelect }: GraduateListsProps) {
  if (error) return (
    <div className="flex items-center gap-4 p-5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl max-w-xl mx-auto shadow-md shadow-rose-100">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-600 shrink-0 font-bold">!</div>
      <div className="text-xs font-bold tracking-wide leading-relaxed">
        System Gateway Offline. Real-time alumni cluster registry fetch failed. Please reload.
      </div>
    </div>
  );

  if (!graduates || graduates.length === 0) return (
    <div className="flex flex-col items-center justify-center p-20 border border-dashed border-[#2b2670]/20 bg-[#fffffe] text-slate-400 rounded-[24px] max-w-xl mx-auto text-center space-y-4 shadow-sm">
      <div className="text-5xl opacity-40 animate-bounce">🎓</div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Registry Core Empty</h3>
        <p className="text-xs text-slate-400">No matching graduate profiles were found inside this cluster partition.</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 group/grid">
      {graduates.map((grad, index) => {
        const isSelected = selectedId === grad.slug;
        const isAlternate = index % 2 === 0;
        
        return (
          <button
            key={grad.slug}
            type="button"
            onClick={() => onSelect?.(grad.slug)}
            className={`group/card relative flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-500 transform active:scale-[0.97] cursor-pointer outline-none ${
              isSelected
                ? 'bg-gradient-to-br from-[#2b2670] to-[#1a164d] border-[#2b2670] text-[#fffffe] font-bold shadow-[0_15px_30px_-8px_rgba(43,38,112,0.25)] translate-y-[-6px] z-10'
                : 'bg-[#fffffe] border-[#2b2670]/10 text-slate-700 hover:text-black hover:border-[#2b2670]/30 shadow-[0_4px_20px_-4px_rgba(43,38,112,0.02)] hover:shadow-[0_15px_30px_-6px_rgba(43,38,112,0.08)] hover:translate-y-[-4px] group-hover/grid:opacity-50 hover:!opacity-100'
            } ${isAlternate && !isSelected ? 'lg:translate-y-2 lg:hover:translate-y-[-2px]' : ''}`}
          >
            {/* Core Card Content Body Layout */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              
              {/* Monogram Shape container shifting between custom layout borders */}
              <div className={`flex items-center justify-center w-10 h-10 font-black text-xs tracking-wider transition-all duration-500 shrink-0 ${
                isSelected 
                  ? 'bg-[#fffffe]/20 text-[#fffffe] shadow-inner scale-110 rounded-xl' 
                  : `text-[#2b2670] shadow-sm ${
                      isAlternate 
                        ? 'bg-[#c59c45]/10 border border-[#c59c45]/30 rounded-2xl group-hover/card:rotate-90' 
                        : 'bg-[#f7f6ee] border border-[#2b2670]/10 rounded-xl group-hover/card:scale-110'
                    }`
              }`}>
                {grad.name.trim().charAt(0)}
              </div>

              {/* Graduate Name Dynamic Core Label */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold tracking-wide truncate transition-colors duration-200 text-black">
                  {grad.name}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 ${isSelected ? 'text-[#c59c45]' : 'text-slate-400 group-hover/card:text-[#c59c45]'}`}>
                  Alumni.Profile
                </span>
              </div>
            </div>

            {/* Interaction State Token Pin */}
            <div className="flex items-center shrink-0 ml-3">
              {isSelected ? (
                /* Crisp custom selection check badge container using your custom Gold accent */
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c59c45] text-[#fffffe] shadow-sm text-[10px] font-black animate-fadeIn scale-110">
                  ✓
                </div>
              ) : (
                /* Premium numeric row markings */
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-lg font-mono bg-[#f7f6ee] border border-[#2b2670]/5 text-slate-400 transition-all group-hover/card:bg-[#2b2670]/10 group-hover/card:text-[#2b2670] group-hover/card:border-[#2b2670]/20">
                  #{index + 1}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
