"use client";

interface SuccessPanelProps {
  graduateName: string;
  onReset: () => void;
  onClose: () => void;
}

export default function SuccessPanel({
  graduateName,
  onReset,
  onClose,
}: SuccessPanelProps) {
  return (
    <div
      role="status"
      className="animate-fadeIn bg-[#fffffe] border border-[#c59c45]/30 rounded-[24px] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(197,156,69,0.15)] max-w-2xl mx-auto text-center space-y-6"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
        <span className="text-3xl font-black text-emerald-600">✓</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-[#2b2670]">
          Message Sent Successfully!
        </h2>

        <p className="text-sm text-slate-600">
          Your graduation message for{" "}
          <span className="font-bold text-[#2b2670]">{graduateName}</span> has
          been submitted. 🎉
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full p-3.5 rounded-xl bg-[#2b2670] text-[#fffffe] hover:bg-[#1a164d] font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
        >
          Send Another Message
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full p-3.5 rounded-xl border border-[#2b2670]/20 text-[#2b2670] hover:bg-[#2b2670]/5 font-bold text-sm tracking-wide transition-all cursor-pointer"
        >
          Choose Another Graduate
        </button>
      </div>
    </div>
  );
}
