"use client";

import { Graduate } from "@/lib/api";
import { useState } from "react";
import GraduatesList from "../components/GraduateList";
import MessageFormCard from "../components/MessageFormCard";
import SuccessPanel from "../components/SuccessPanel";

interface GraduatesListWrapperProps {
  graduates: Graduate[];
  error: boolean;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function GraduatesListWrapper({
  graduates,
  error,
}: GraduatesListWrapperProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const selectedGraduate = graduates.find((g) => g.slug === selectedSlug);

  const handleRetry = () => {
    setStatus("idle");
    setSubmitError("");
  };

  const handleReset = () => {
    setStatus("idle");
    setSubmitError("");
    setSelectedSlug("");
  };

  return (
    <div className="space-y-12">
      {/* 1. The Interactive Matrix Grid */}
      <GraduatesList
        graduates={graduates}
        error={error}
        selectedId={selectedSlug}
        onSelect={(slug) => {
          setSelectedSlug(slug);
          setStatus("idle");
          setSubmitError("");
        }}
      />

      {/* 2. Success Panel */}
      {status === "sent" ? (
        <SuccessPanel onReset={handleReset} />
      ) : (
        /* 3. Message Form */
        selectedSlug && (
          <MessageFormCard
            selectedGraduate={selectedGraduate}
            onClose={() => setSelectedSlug("")}
            status={status}
            onStatusChange={setStatus}
            error={submitError}
            onError={setSubmitError}
            onRetry={handleRetry}
          />
        )
      )}
    </div>
  );
}
