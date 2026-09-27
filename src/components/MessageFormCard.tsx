// src/components/MessageFormCard.tsx
"use client";

import { Graduate, postGraduates } from "@/lib/api";
import React, { useEffect, useId, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef(status);
  const titleId = useId();
  const isSuccess = status === "success";

  statusRef.current = status;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && statusRef.current !== "sending") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#2b2670]/45 p-4 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="presentation"
            onMouseDown={(event) => {
        if (event.target === event.currentTarget && status !== "sending") {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="animate-fadeIn my-auto w-full max-w-2xl outline-none"
      >
        {isSuccess ? (
          <SuccessPanel
            graduateName={selectedGraduate.name}
            onReset={() => setStatus("idle")}
            onClose={onClose}
          />
        ) : (
          <div className="space-y-6 rounded-[24px] border border-[#c59c45]/30 bg-[#fffffe] p-5 shadow-[0_20px_50px_-12px_rgba(197,156,69,0.15)] transition-all duration-300 sm:p-10">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 sm:gap-4">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2b2670] to-[#1a164d] text-base font-black text-[#fffffe] shadow-md sm:h-12 sm:w-12 sm:text-lg">
                  {selectedGraduate.name.trim().charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3
                    id={titleId}
                    className="text-base leading-snug font-black break-words text-[#2b2670] sm:text-lg"
                  >
                    Congratulate {selectedGraduate.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-semibold tracking-widest text-[#c59c45] uppercase sm:text-xs">
                    Write a graduation message 🎓
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSending}
                aria-label="Cancel selection"
                className="flex min-h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg p-2 text-sm font-bold text-slate-400 transition-colors hover:bg-slate-50 hover:text-black disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
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
                    className="text-xs font-bold tracking-wider text-[#2b2670] uppercase"
                  >
                    Your Message
                  </label>
                  <span
                    className={`font-mono text-[10px] ${
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
                  className="w-full resize-none rounded-xl border border-slate-200 bg-[#f7f6ee]/30 p-4 text-base text-slate-800 outline-none transition-all focus:border-[#2b2670] focus:bg-white focus:ring-4 focus:ring-[#2b2670]/10 disabled:opacity-60 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="senderNameInput"
                    className="text-xs font-bold tracking-wider text-[#2b2670] uppercase"
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
                    className="w-full rounded-xl border border-slate-200 bg-[#f7f6ee]/30 p-3 text-base text-slate-800 outline-none transition-all focus:border-[#2b2670] focus:ring-4 focus:ring-[#2b2670]/10 disabled:bg-slate-50 disabled:text-slate-400 sm:text-sm"
                  />
                </div>
                <label
                  htmlFor="anonymousToggle"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors select-none hover:border-[#2b2670]/30 has-[:checked]:border-[#2b2670]/40 has-[:checked]:bg-[#2b2670]/5"
                >
                  <input
                    type="checkbox"
                    id="anonymousToggle"
                    checked={isAnonymous}
                    disabled={isSending}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-[#2b2670]"
                  />
                  <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
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
                    className="shrink-0 cursor-pointer text-sm font-bold text-red-700 underline"
                  >
                    Retry
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#c59c45]/20 bg-[#2b2670] p-3.5 text-sm font-bold tracking-wide text-[#fffffe] shadow-md transition-all outline-none hover:bg-[#1a164d] hover:shadow-lg focus-visible:ring-4 focus-visible:ring-[#c59c45]/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#fffffe]/40 border-t-[#fffffe]" />
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
    </div>
  );
}
