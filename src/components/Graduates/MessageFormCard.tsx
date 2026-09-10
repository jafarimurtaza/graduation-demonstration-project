// src/components/Graduates/MessageFormCard.tsx
'use client';

import React, {useState} from 'react';
import { Graduate,  postGraduates} from '@/lib/api';

interface MessageFormCardProps {
  selectedGraduate: Graduate | undefined;
  message: string;
  senderName: string;
  isAnonymous: boolean;
  onMessageChange: (val: string) => void;
  onSenderNameChange: (val: string) => void;
  onAnonymousChange: (val: boolean) => void;
  onClose: () => void;
  
}

export default function MessageFormCard({
  selectedGraduate,
  message,
  senderName,
  isAnonymous,
  onMessageChange,
  onSenderNameChange,
  onAnonymousChange,
  onClose,
  
}: MessageFormCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!selectedGraduate) return null;

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();

    const payload = {
      graduate: selectedGraduate.slug,
      message: message.trim(),
      sender_name: isAnonymous ? 'Anonymous' : senderName.trim(),
      is_anonymous: isAnonymous
    };

    try{
      setIsSubmitting(true);
      await postGraduates({ payLoad: payload });
        
      
      alert("Message sent successfully!");
      onMessageChange("");
      onSenderNameChange("");
      onAnonymousChange(false);
      onClose();

    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animate-fadeIn bg-[#fffffe] border border-[#c59c45]/30 rounded-[24px] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(197,156,69,0.15)] max-w-2xl mx-auto space-y-6 transition-all duration-300">
      
      {/* Form Top Title Context Panel */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-black text-[#2b2670]">
            Congratulate {selectedGraduate.name}
          </h3>
          <p className="text-xs text-[#c59c45] font-mono mt-0.5">
            Write Mesage to {selectedGraduate.slug}
          </p>
        </div>
        <button 
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-black font-bold text-xs p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
        >
          ✕ Cancel Selection
        </button>
      </div>

      {/* Messaging Input Block Grid */}
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {/* Message field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#2b2670] uppercase tracking-wider">Your Message</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder={`Write an encouraging graduation card note for ${selectedGraduate.name}...`}
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2b2670] bg-[#f7f6ee]/30 focus:bg-white text-sm outline-none transition-all resize-none"
          />
        </div>

        {/* Sender Identity Details Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2b2670] uppercase tracking-wider">Sender Name</label>
            <input
              type="text"
              required={!isAnonymous}
              disabled={isAnonymous}
              value={senderName}
              onChange={(e) => onSenderNameChange(e.target.value)}
              placeholder={isAnonymous ? "Sending anonymously" : "Enter your name"}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#2b2670] bg-[#f7f6ee]/30 disabled:bg-slate-50 text-sm outline-none transition-all"
            />
          </div>

          {/* Anonymous Selection checkbox indicator flag */}
          <div className="flex items-center gap-3 pt-6 sm:justify-end">
            <input
              type="checkbox"
              id="anonymousToggle"
              checked={isAnonymous}
              onChange={(e) => onAnonymousChange(e.target.checked)}
              className="h-4 w-4 text-[#2b2670] focus:ring-[#2b2670] border-slate-300 rounded cursor-pointer"
            />
            <label htmlFor="anonymousToggle" className="text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer select-none">
              Send anonymously
            </label>
          </div>
        </div>

        {/* Submitting Dispatch Buttons */}
        <button
          type="submit"
          className="w-full mt-4 p-3.5 rounded-xl bg-[#2b2670] text-[#fffffe] hover:bg-[#1a164d] border border-[#c59c45]/20 font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer outline-none flex items-center justify-center gap-2"
        >
          <span> {isSubmitting ? "Sending..." : "Send Message"} </span>
          {!isSubmitting && <span>→</span>}
        </button>
      </form>
    </div>
  );
}
