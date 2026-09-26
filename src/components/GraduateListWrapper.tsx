// src/components/Graduates/GraduatesListWrapper.tsx
"use client";

import { Graduate } from "@/lib/api";
import { useState } from "react";
import GraduatesList from "../components/GraduateList";
import MessageFormCard from "../components/MessageFormCard";

interface GraduatesListWrapperProps {
  graduates: Graduate[];
  error: boolean;
}

export default function GraduatesListWrapper({
  graduates,
  error,
}: GraduatesListWrapperProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
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
          key={selectedSlug}
          selectedGraduate={selectedGraduate}
          onClose={() => setSelectedSlug("")}
        />
      )}
    </div>
  );
}
