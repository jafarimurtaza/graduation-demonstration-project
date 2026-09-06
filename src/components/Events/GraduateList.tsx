// components/GraduateLists.tsx
import React from 'react';

interface Graduate {
  id: string;
  documentId: string;
  name: string; // Restored to the clean singular name format from Task 2
}

interface GraduateListsProps {
  graduates: Graduate[];
  error: boolean;
  selectedId: string;
  onSelect: (documentId: string) => void;
}

export default function GraduateLists({ graduates, error, selectedId, onSelect }: GraduateListsProps) {
  // Enhanced Error State (Improved high-contrast alert colors)
  if (error) return (
    <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/30 text-red-200 rounded-2xl max-w-xl mx-auto shadow-lg backdrop-blur-md">
      <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
      <span className="text-sm font-medium">Failed to fetch graduates data. Please reload the page.</span>
    </div>
  );

  // Enhanced Empty State (Deep balanced neutral amber tones)
  if (!graduates || graduates.length === 0) return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-amber-900/30 bg-[#261c14]/40 backdrop-blur-md text-amber-200/50 rounded-2xl max-w-xl mx-auto text-center space-y-2">
      <div className="text-2xl opacity-70">🎓</div>
      <p className="text-sm font-medium">The graduate list is empty. No records found.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
      {graduates.map((grad) => {
        const isSelected = selectedId === grad.documentId;
        
        return (
          <button
            key={grad.id}
            type="button"
            onClick={() => onSelect(grad.documentId)}
            // Explicitly added cursor-pointer and enhanced high-contrast amber theme colors
            className={`group relative flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 transform active:scale-[0.98] backdrop-blur-sm cursor-pointer outline-none ${
              isSelected
                ? 'bg-gradient-to-bl from-amber-500/20 to-amber-950/80 border-amber-500 text-amber-50 font-bold shadow-md shadow-amber-500/10 translate-y-[-2px] ring-1 ring-amber-500/30'
                : 'bg-[#2a1e15] border-amber-950/80 hover:border-amber-700/50 text-amber-100/80 hover:text-amber-50 shadow-sm'
            }`}
          >
            {/* Core Info Block */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Vibrant high-contrast monogram badge */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-sm transition-all duration-300 shrink-0 ${
                isSelected 
                  ? 'bg-amber-500 text-[#1c140e] shadow-sm shadow-amber-500/30' 
                  : 'bg-amber-950 text-amber-400 group-hover:bg-amber-900 group-hover:text-amber-300'
              }`}>
                {grad.name.trim().charAt(0)}
              </div>

              {/* Graduate Name */}
              <span className="text-sm tracking-wide truncate">
                {grad.name}
              </span>
            </div>

            {/* Right Meta Block (Live Indicator Pin / Minimal ID Tag) */}
            <div className="flex items-center shrink-0 ml-2">
              {isSelected ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-amber-950/60 text-amber-600/80 transition-colors group-hover:text-amber-500/60">
                  #{grad.id}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
