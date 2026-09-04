// components/GraduateLists.tsx
import React from 'react';

interface Graduate {
  id: string;
  documentId: string;
  nameEn: string; // English representation
  nameDa: string; // Dari representation
}

interface GraduateListsProps {
  graduates: Graduate[];
  error: boolean;
  selectedId: string;
  onSelect: (documentId: string) => void;
  locale: 'da' | 'en';
}

const translations = {
  da: {
    error: 'خطا در دریافت اطلاعات فارغ‌التحصیلان. لطفا صفحه را مجدداً بارگذاری کنید.',
    empty: 'لیست فارغ‌التحصیلان خالی است. هیچ کاربری یافت نشد.',
  },
  en: {
    error: 'Failed to fetch graduates data. Please reload the page.',
    empty: 'The graduate list is empty. No records found.',
  }
};

export default function GraduateLists({ graduates, error, selectedId, onSelect, locale }: GraduateListsProps) {
  const t = translations[locale];

  if (error) return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-950/30 to-red-900/10 border border-red-500/20 text-red-300 rounded-2xl max-w-xl mx-auto shadow-lg backdrop-blur-md">
      <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
      <span className="text-sm font-medium">{t.error}</span>
    </div>
  );

  if (!graduates || graduates.length === 0) return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-amber-900/30 bg-[#261c14]/30 backdrop-blur-md text-amber-200/40 rounded-2xl max-w-xl mx-auto text-center space-y-2">
      <div className="text-2xl opacity-60">🎓</div>
      <p className="text-sm font-medium">{t.empty}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
      {graduates.map((grad) => {
        const isSelected = selectedId === grad.documentId;
        // Dynamically choose name based on active locale
        const displayName = locale === 'da' ? grad.nameDa : grad.nameEn;

        return (
          <button
            key={grad.id}
            type="button"
            onClick={() => onSelect(grad.documentId)}
            className={`group relative flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 transform active:scale-[0.98] backdrop-blur-sm outline-none ${
              isSelected
                ? 'bg-gradient-to-bl from-amber-900/30 to-amber-950/60 border-amber-500 text-amber-100 shadow-md shadow-amber-500/10 translate-y-[-2px] ring-1 ring-amber-500/20'
                : 'bg-[#2a1e15]/40 border-amber-950/40 hover:border-amber-900/60 text-amber-200/70 hover:text-amber-100 shadow-sm'
            }`}
          >
            {/* Core Info Block */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-sm transition-all duration-300 shrink-0 ${
                isSelected 
                  ? 'bg-amber-500 text-[#1c140e]' 
                  : 'bg-amber-950/40 text-amber-400 group-hover:bg-amber-950/70'
              }`}>
                {displayName.trim().charAt(0)}
              </div>

              <span className={`text-sm tracking-wide truncate transition-colors duration-200 ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {displayName}
              </span>
            </div>

            {/* Right Meta Block */}
            <div className="flex items-center shrink-0">
              {isSelected ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-amber-950/40 text-amber-600/70 transition-colors group-hover:text-amber-500/60">
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
