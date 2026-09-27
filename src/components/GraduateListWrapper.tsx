// src/components/Graduates/GraduatesListWrapper.tsx
"use client";

import { Graduate } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import GraduatesList from "./GraduateList";
import MessageFormCard from "./MessageFormCard";

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

  const clearSelection = useCallback(() => setSelectedSlug(""), []);

  // Lock body scroll while the message modal is open so the page
  // doesn't jump or leave the header clipped under the viewport.
  useEffect(() => {
    if (!selectedSlug) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedSlug]);

  return (
    <>
      <GraduatesList
        graduates={graduates}
        error={error}
        selectedId={selectedSlug}
        onSelect={(slug) => setSelectedSlug(slug)}
      />

      {selectedSlug && (
        <MessageFormCard
          key={selectedSlug}
          selectedGraduate={selectedGraduate}
          onClose={clearSelection}
        />
      )}
    </>
  );
}
