"use client";

interface SuccessPanelProps {
  onReset: () => void;
}

export default function SuccessPanel({ onReset }: SuccessPanelProps) {
  return (
    <div className="animate-fadeIn bg-[#fffffe] border border-[#c59c45]/30 rounded-[24px] p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(197,156,69,0.15)] max-w-2xl mx-auto text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl">✓</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-[#2b2670]">
          Message Sent Successfully!
        </h2>

        <p className="text-sm text-slate-600">
          Your graduation message has been submitted successfully.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full p-3.5 rounded-xl bg-[#2b2670] text-[#fffffe] hover:bg-[#1a164d] font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
      >
        Send Another Message
      </button>
    </div>
  );
}
