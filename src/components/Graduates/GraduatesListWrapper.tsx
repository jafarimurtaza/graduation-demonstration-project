// src/components/Graduates/GraduatesListWrapper.tsx
'use client';

import React, { useState } from 'react';
import GraduatesList from "./GraduatesList";
import MessageFormCard from "./MessageFormCard";
import { Graduate } from "@/lib/api";

interface GraduatesListWrapperProps {
  graduates: Graduate[];
  error: boolean;
}

export default function GraduatesListWrapper({ graduates, error }: GraduatesListWrapperProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const selectedGraduate = graduates.find((g) => g.slug === selectedSlug);

  return (
    <div className="space-y-12">
      {/* 1. The Interactive Matrix Grid */}
      <GraduatesList
        graduates={graduates}
        error={error}
        selectedId={selectedSlug}
        onSelect={(slug) => setSelectedSlug(slug)}
      />

      {/* 2. The Pop-Up Message Card Form */}
      {selectedSlug && (
        <MessageFormCard
          selectedGraduate={selectedGraduate}
          message={message}
          senderName={senderName}
          isAnonymous={isAnonymous}
          onMessageChange={setMessage}
          onSenderNameChange={setSenderName}
          onAnonymousChange={setIsAnonymous}
          onClose={() => setSelectedSlug('')}
        />
      )}
    </div>
  );
}
