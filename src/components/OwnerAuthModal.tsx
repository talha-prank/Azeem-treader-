import { useState, useEffect, useRef } from 'react';
import { X, Lock, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { checkOwnerPin } from '../services/productStorage';
import { STORE_INFO } from '../data/products';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OwnerAuthModal({ isOpen, onClose, onSuccess }: OwnerAuthModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkOwnerPin(pin)) {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-2xl shadow-black/90 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
          <KeyRound className="w-6 h-6" />
        </div>

        <h3 id="auth-modal-title" className="font-display text-xl font-bold text-white">
          Owner Price Access
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Welcome <strong className="text-slate-200">{STORE_INFO.owner}</strong>. Enter your owner PIN to adjust store prices, change discounts, or add new items.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="owner-pin-input" className="block text-xs font-medium text-slate-300 mb-1.5">
              Enter Owner PIN
            </label>
            <div className="relative">
              <input
                id="owner-pin-input"
                ref={inputRef}
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter PIN (e.g. 1142)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-lg tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {error && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect PIN. (Hint: Try 1142 or 0319)</span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <span className="font-medium text-slate-300 block">Quick Reference for Azeem Ali:</span>
            <p>Default PIN is <strong className="text-blue-400 font-mono">1142</strong> (Last 4 digits of phone 03195411421) or <strong className="text-blue-400 font-mono">0319</strong>.</p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              Unlock Editor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
