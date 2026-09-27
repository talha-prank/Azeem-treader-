import { useState, useEffect, useRef } from 'react';
import { X, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { checkOwnerPin } from '../services/productStorage';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OwnerAuthModal({ isOpen, onClose, onSuccess }: OwnerAuthModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setShowPassword(false);
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
      aria-labelledby="admin-auth-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
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
          <Lock className="w-6 h-6" />
        </div>

        <h3 id="admin-auth-title" className="font-display text-xl font-bold text-white">
          Admin Verification
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Restricted administrative area. Please enter your private owner passcode to manage store prices.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="admin-passcode-input" className="block text-xs font-medium text-slate-300 mb-1.5">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                id="admin-passcode-input"
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                maxLength={16}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passcode"
                className="w-full px-4 py-2.5 pr-11 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-lg tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 animate-shake">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Access Denied: Invalid Passcode</span>
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
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
              Authorize
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
