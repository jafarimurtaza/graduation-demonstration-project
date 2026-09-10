"use client";
import { Graduate, postGraduates } from "@/lib/api";
import React, { useState } from "react";
type SubmitStatus = "idle" | "sending" | "sent" | "error";
interface MessageFormCardProps {
  selectedGraduate: Graduate | undefined;
  onClose: () => void;
  status: SubmitStatus;
  onStatusChange: (status: SubmitStatus) => void;
  error: string;
  onError: (error: string) => void;
  onRetry: () => void;
}
export default function MessageFormCard({
  selectedGraduate,
  onClose,
  status,
  error,
  onStatusChange,
  onError,
  onRetry,
}: MessageFormCardProps) {
  const [message, setMessage] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGraduate || status === "sending") {
      return;
    }
    const payLoad = {
      message: message.trim(),
      sender_name: isAnonymous ? "Anonymous" : senderName.trim(),
      is_anonymous: isAnonymous,
      graduate: selectedGraduate.slug,
    };
    onStatusChange("sending");
    onError("");
    try {
      await postGraduates({ payload: payLoad });
      setMessage("");
      setSenderName("");
      setIsAnonymous(false);
      onStatusChange("sent");
    } catch (error) {
      console.error("Failed to post graduate message:", error);
      onError("Failed to send message. Please try again.");
      onStatusChange("error");
    }
  };

  if (!selectedGraduate) return null;

  return (
    <div className="animate-fadeIn bg-[#fffffe] border border-[#c59c45]/30 rounded-[24px] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(197,156,69,0.15)] max-w-2xl mx-auto space-y-6 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-black text-[#2b2670]">
            Congratulate {selectedGraduate.name}
          </h3>
          <p className="text-xs text-[#c59c45] font-mono mt-0.5">
            Write Message to {selectedGraduate.slug}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={status === "sending"}
          className="text-slate-400 hover:text-black font-bold text-xs p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✕ Cancel Selection
        </button>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#2b2670] uppercase tracking-wider">
            Your Message
          </label>
          <textarea
            required
            rows={4}
            value={message}
            disabled={status === "sending"}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Write an encouraging graduation card note for ${selectedGraduate.name}...`}
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2b2670] bg-[#f7f6ee]/30 focus:bg-white text-sm outline-none transition-all resize-none disabled:opacity-60"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2b2670] uppercase tracking-wider">
              Sender Name
            </label>
            <input
              type="text"
              required={!isAnonymous}
              disabled={isAnonymous || status === "sending"}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={
                isAnonymous ? "Sending anonymously" : "Enter your name"
              }
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#2b2670] bg-[#f7f6ee]/30 disabled:bg-slate-50 text-sm outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3 pt-6 sm:justify-end">
            <input
              type="checkbox"
              id="anonymousToggle"
              checked={isAnonymous}
              disabled={status === "sending"}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4 text-[#2b2670] focus:ring-[#2b2670] border-slate-300 rounded cursor-pointer"
            />
            <label
              htmlFor="anonymousToggle"
              className="text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer select-none"
            >
              Send anonymously
            </label>
          </div>
        </div>
        {status === "error" && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              {error || "Failed to send message. Please try again."}
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-sm font-bold text-red-700 underline cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full mt-4 p-3.5 rounded-xl bg-[#2b2670] text-[#fffffe] hover:bg-[#1a164d] border border-[#c59c45]/20 font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer outline-none flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
          <span>{status === "sending" ? "..." : "→"}</span>
        </button>
      </form>
    </div>
  );
}
