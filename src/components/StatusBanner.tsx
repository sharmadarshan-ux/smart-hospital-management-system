import React from 'react';
import { WifiOff, AlertTriangle, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StatusBannerProps {
  type: 'offline' | 'emergency' | 'suggestion' | 'synced';
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  type,
  message,
  actionText,
  onAction,
  className = ''
}) => {
  const { t } = useLanguage();

  if (type === 'offline') {
    return (
      <div role="status" aria-live="polite" className={`bg-[#E6F0FA] border-b border-[#0B5CAD] text-[#0B5CAD] px-4 py-2.5 text-sm flex items-center justify-between font-medium ${className}`}>
        <div className="flex items-center space-x-2">
          <WifiOff className="w-4 h-4 stroke-[1.5] shrink-0 text-[#0B5CAD]" />
          <span>
            <strong className="font-semibold">{t.workingOffline}</strong> {t.changesWillSync}
          </span>
        </div>
        <span className="text-xs bg-white px-2 py-0.5 rounded-[6px] border border-[#0B5CAD] tabular-nums shrink-0">
          LAN Offline Cache Active
        </span>
      </div>
    );
  }

  if (type === 'emergency') {
    return (
      <div role="alert" className={`bg-[#FDECEC] border border-[#C62828] text-[#C62828] p-3 rounded-[6px] text-sm flex items-start space-x-3 ${className}`}>
        <AlertTriangle className="w-5 h-5 stroke-[1.5] shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="font-semibold block text-base">CRITICAL TRIAGE PROTOCOL ACTIVE</strong>
          <p className="mt-0.5">{message || "Emergency trauma case inserted into queue position 1 per clinical guidelines."}</p>
        </div>
      </div>
    );
  }

  if (type === 'suggestion') {
    return (
      <div className={`bg-[#E6F0FA] border border-[#0B5CAD] text-[#14202E] p-3.5 rounded-[6px] text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
        <div className="flex items-start space-x-3">
          <ArrowRightLeft className="w-5 h-5 text-[#0B5CAD] stroke-[1.5] shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong className="font-semibold text-[#0B5CAD]">Load-Balancing Suggestion</strong>
            <p className="text-[#52606F] mt-0.5">{message}</p>
          </div>
        </div>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="bg-[#0B5CAD] text-white hover:bg-[#094A8C] px-3.5 py-1.5 rounded-[6px] text-xs font-semibold shrink-0 focus-ring"
          >
            {actionText}
          </button>
        )}
      </div>
    );
  }

  if (type === 'synced') {
    return (
      <div className={`bg-[#E6F0FA] border border-[#0B5CAD] text-[#0B5CAD] p-2.5 rounded-[6px] text-xs font-medium flex items-center space-x-2 ${className}`}>
        <CheckCircle2 className="w-4 h-4 stroke-[1.5]" />
        <span>LAN cache synced with central server. 0 pending transactions.</span>
      </div>
    );
  }

  return null;
};
