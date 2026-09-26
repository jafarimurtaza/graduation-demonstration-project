// src/components/MessageFormCard.tsx
"use client";

import { Graduate, postGraduates } from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";
import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  sanitizeMessage,
  sanitizeName,
} from "@/lib/sanitize";
import SuccessPanel from "./SuccessPanel";

interface MessageFormCardProps {
  selectedGraduate: Graduate | undefined;
  onClose: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

export default function MessageFormCard({
  selectedGraduate,
  onClose,
}: MessageFormCardProps) {
  const [message, setMessage] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isSuccess = status === "success";

  // On small screens the card renders below a long grid, so bring it (and
  // later the success panel) into view.
  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [isSuccess]);

  const submitMessage = async () => {
    if (!selectedGraduate) return;

    // The API route re-sanitizes; this gives the user immediate feedback.
    const cleanMessage = sanitizeMessage(message);
    const cleanName = isAnonymous ? "Anonymous" : sanitizeName(senderName);

    if (!cleanMessage || !cleanName) {
      setError(
        !cleanMessage
          ? "Please write a message (HTML isn't allowed)."
          : "Please enter a valid name.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    const payLoad = {
      message: cleanMessage,
      sender_name: cleanName,
      is_anonymous: isAnonymous,
      graduate: selectedGraduate.slug,
    };

    try {
      await postGraduates({ payload: payLoad });
      setMessage("");
      setSenderName("");
      setIsAnonymous(false);
      setStatus("success");
    } catch (err) {
      console.error("Failed to post graduate message:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.",
      );
      setStatus("error");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  if (!selectedGraduate) return null;

  const isSending = status === "sending";

  return (
    <div ref={containerRef} className="scroll-mt-4">
      {isSuccess ? (
        <SuccessPanel
          graduateName={selectedGraduate.name}
          onReset={() => setStatus("idle")}
          onClose={onClose}
        />
      ) : (
        <div className="animate-fadeIn bg-[#fffffe] border border-[#c59c45]/30 rounded-[24px] p-5 sm:p-10 shadow-[0_20px_50px_-12px_rgba(197,156,69,0.15)] max-w-2xl mx-auto space-y-6 transition-all duration-300">
          <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2b2670] to-[#1a164d] text-base sm:text-lg font-black text-[#fffffe] shadow-md">
                {selectedGraduate.name.trim().charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-black text-[#2b2670] leading-snug break-words">
                  Congratulate {selectedGraduate.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#c59c45] font-semibold uppercase tracking-widest mt-0.5">
                  Write a graduation message 🎓
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              aria-label="Cancel selection"
              className="shrink-0 flex items-center justify-center gap-1 min-h-10 min-w-10 text-slate-400 hover:text-black font-bold text-sm sm:text-xs p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span aria-hidden>✕</span>
              <span className="hidden sm:inline">Cancel</span>
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="messageInput"
                  className="text-xs font-bold text-[#2b2670] uppercase tracking-wider"
                >
                  Your Message
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    message.length >= MAX_MESSAGE_LENGTH
                      ? "text-red-500"
                      : "text-slate-400"
                  }`}
                >
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
              <textarea
                id="messageInput"
                required
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                value={message}
                disabled={isSending}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write an encouraging graduation card note for ${selectedGraduate.name}...`}
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2b2670] focus:ring-4 focus:ring-[#2b2670]/10 bg-[#f7f6ee]/30 focus:bg-white text-base sm:text-sm text-slate-800 outline-none transition-all resize-none disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <label
                  htmlFor="senderNameInput"
                  className="text-xs font-bold text-[#2b2670] uppercase tracking-wider"
                >
                  Sender Name
                </label>
                <input
                  id="senderNameInput"
                  type="text"
                  required={!isAnonymous}
                  maxLength={MAX_NAME_LENGTH}
                  autoComplete="name"
                  disabled={isAnonymous || isSending}
                  value={isAnonymous ? "" : senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={
                    isAnonymous ? "Sending anonymously" : "Enter your name"
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#2b2670] focus:ring-4 focus:ring-[#2b2670]/10 bg-[#f7f6ee]/30 disabled:bg-slate-50 disabled:text-slate-400 text-base sm:text-sm text-slate-800 outline-none transition-all"
                />
              </div>
              <label
                htmlFor="anonymousToggle"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#2b2670]/30 cursor-pointer select-none transition-colors has-[:checked]:border-[#2b2670]/40 has-[:checked]:bg-[#2b2670]/5"
              >
                <input
                  type="checkbox"
                  id="anonymousToggle"
                  checked={isAnonymous}
                  disabled={isSending}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 accent-[#2b2670] cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Send anonymously
                </span>
              </label>
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="animate-fadeIn flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <p className="text-sm text-red-600">
                  {error || "Failed to send message. Please try again."}
                </p>
                <button
                  type="button"
                  onClick={submitMessage}
                  className="shrink-0 text-sm font-bold text-red-700 underline cursor-pointer"
                >
                  Retry
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full mt-2 p-3.5 rounded-xl bg-[#2b2670] text-[#fffffe] hover:bg-[#1a164d] border border-[#c59c45]/20 font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#c59c45]/40 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-[#fffffe]/40 border-t-[#fffffe] animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span aria-hidden>→</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
