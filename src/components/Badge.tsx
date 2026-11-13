import React from 'react';
import { AlertTriangle, Award, User, HeartPulse } from 'lucide-react';
import type { PriorityTier } from '../types/queue';

interface BadgeProps {
  priority?: PriorityTier;
  label?: string;
  variant?: 'emergency' | 'priority' | 'neutral' | 'info';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  priority,
  label,
  variant,
  size = 'md',
  icon
}) => {
  let activeVariant = variant;
  let activeLabel = label;
  let activeIcon = icon;

  if (priority === 'Emergency') {
    activeVariant = 'emergency';
    activeLabel = activeLabel || 'Emergency Priority';
    activeIcon = activeIcon || <AlertTriangle className="w-3.5 h-3.5 mr-1 stroke-[1.5]" />;
  } else if (priority === 'Senior') {
    activeVariant = 'priority';
    activeLabel = activeLabel || 'Senior Citizen (60+)';
    activeIcon = activeIcon || <Award className="w-3.5 h-3.5 mr-1 stroke-[1.5]" />;
  } else if (priority === 'Pregnant') {
    activeVariant = 'priority';
    activeLabel = activeLabel || 'Priority Care';
    activeIcon = activeIcon || <HeartPulse className="w-3.5 h-3.5 mr-1 stroke-[1.5]" />;
  } else if (priority === 'General') {
    activeVariant = 'neutral';
    activeLabel = activeLabel || 'General Queue';
    activeIcon = activeIcon || <User className="w-3.5 h-3.5 mr-1 stroke-[1.5]" />;
  }

  let colorClasses = "";
  if (activeVariant === 'emergency') {
    colorClasses = "bg-[#FDECEC] text-[#C62828] border-[#C62828]";
  } else if (activeVariant === 'priority' || activeVariant === 'info') {
    colorClasses = "bg-[#E6F0FA] text-[#0B5CAD] border-[#0B5CAD]";
  } else {
    colorClasses = "bg-[#F5F7FA] text-[#52606F] border-[#D5DCE4]";
  }

  const paddingClasses = size === 'sm' ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-semibold";

  return (
    <span className={`inline-flex items-center rounded-[6px] border ${paddingClasses} ${colorClasses} tabular-nums`}>
      {activeIcon}
      <span>{activeLabel}</span>
    </span>
  );
};
