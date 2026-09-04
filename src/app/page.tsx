// app/page.tsx
'use client';
import React, { useState } from 'react';
import GraduateLists from '../components/Events/GraduateList';

// Updated Mock Dataset containing localized name objects
const mockGraduates = [
  { id: '1', documentId: 'grad-1', nameEn: 'Humaira', nameDa: 'حمیرا' },
  { id: '2', documentId: 'grad-2', nameEn: 'Afifa Nazari', nameDa: 'عفیفه نظری' },
  { id: '3', documentId: 'grad-3', nameEn: 'Hadia Rauf', nameDa: 'هادیه رئوف' },
  { id: '4', documentId: 'grad-4', nameEn: 'Zahra', nameDa: 'زهرا' },
  { id: '5', documentId: 'grad-5', nameEn: 'Khatera Fayazi', nameDa: 'خاطره فیاضی' },
];

export default function Page() {
  const [selectedId, setSelectedId] = useState<string>('');
  const [locale, setLocale] = useState<'da' | 'en'>('da');

  const direction = locale === 'da' ? 'rtl' : 'ltr';

  return (
    <main className="min-h-screen bg-[#1c140e] p-8 transition-all duration-300" dir={direction}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Language Bar Switcher */}
        <div className="flex justify-end gap-2 border-b border-amber-950/40 pb-4">
          <button
            onClick={() => setLocale('da')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              locale === 'da'
                ? 'bg-amber-500 text-[#1c140e]'
                : 'bg-[#2a1e15] text-amber-200/50 hover:text-amber-100'
            }`}
          >
            دری
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              locale === 'en'
                ? 'bg-amber-500 text-[#1c140e]'
                : 'bg-[#2a1e15] text-amber-200/50 hover:text-amber-100'
            }`}
          >
            English
          </button>
        </div>

        {/* Content Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-amber-50">
            {locale === 'da' ? 'انتخاب فارغ‌التحصیل' : 'Choose a Graduate'}
          </h1>
          <p className="text-xs text-amber-200/40">
            {locale === 'da' ? 'لطفاً نام شخص مورد نظر را از لیست زیر انتخاب کنید.' : 'Please select the person from the list below.'}
          </p>
        </div>
        
        {/* Grid View Component with Live Translating Values */}
        <GraduateLists 
          graduates={mockGraduates}
          error={false}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          locale={locale}
        />

      </div>
    </main>
  );
}
