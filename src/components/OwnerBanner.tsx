import { Sliders, ShieldCheck, LogOut, Tag } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface OwnerBannerProps {
  isOwnerMode: boolean;
  onOpenPriceManager: () => void;
  onExitOwnerMode: () => void;
}

export function OwnerBanner({
  isOwnerMode,
  onOpenPriceManager,
  onExitOwnerMode
}: OwnerBannerProps) {
  if (!isOwnerMode) return null;

  return (
    <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-blue-500/40 text-blue-200 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="font-semibold text-white">Owner Price Control Active:</span>
          <span className="text-slate-300">
            Welcome, {STORE_INFO.owner}. Click <Tag className="w-3 h-3 inline text-blue-400" /> on any item or open Manager to change prices.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPriceManager}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Price Manager</span>
          </button>

          <button
            onClick={onExitOwnerMode}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
