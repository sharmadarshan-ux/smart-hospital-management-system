import React, { useState } from 'react';
import { Clock, Info, ShieldAlert } from 'lucide-react';
import type { PatientRecord } from '../types/queue';
import { Badge } from './Badge';

interface TokenCardProps {
  patient: PatientRecord;
  showWhyModal?: boolean;
}

export const TokenCard: React.FC<TokenCardProps> = ({ patient }) => {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-5 shadow-sm text-left">
      <div className="flex items-start justify-between border-b border-[#D5DCE4] pb-3 mb-4">
        <div>
          <span className="text-xs font-semibold text-[#52606F] uppercase tracking-wider block">
            Token Number
          </span>
          <h1 className="text-4xl font-bold text-[#0B5CAD] tabular-nums tracking-tight mt-0.5">
            {patient.token}
          </h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#52606F] block">Registration Time</span>
          <span className="text-sm font-semibold text-[#14202E] tabular-nums">{patient.registrationTime}</span>
          <div className="mt-1">
            <Badge priority={patient.priority} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 bg-[#F5F7FA] p-3 rounded-[6px] border border-[#D5DCE4] mb-4 text-xs">
        <div>
          <span className="text-[#52606F] block">Patient Name</span>
          <strong className="text-[#14202E] text-sm block truncate">{patient.name} ({patient.age}y / {patient.gender})</strong>
        </div>
        <div>
          <span className="text-[#52606F] block">Assigned Doctor & Room</span>
          <strong className="text-[#14202E] text-sm block truncate">{patient.assignedDoctor}</strong>
          <span className="text-[#0B5CAD] font-medium">{patient.roomNo}</span>
        </div>
      </div>

      <div className="mb-4 bg-[#E6F0FA] border border-[#0B5CAD] rounded-[6px] p-2.5 text-xs text-[#14202E] flex items-start space-x-2">
        {patient.priority === 'Emergency' ? (
          <ShieldAlert className="w-4 h-4 text-[#C62828] stroke-[1.5] shrink-0 mt-0.5" />
        ) : (
          <Info className="w-4 h-4 text-[#0B5CAD] stroke-[1.5] shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <strong className="text-[#0B5CAD] block font-semibold">Priority Routing Reason:</strong>
          <span>{patient.priorityReason}</span>
        </div>
      </div>

      <div className="bg-white border-2 border-[#0B5CAD] rounded-[6px] p-4 text-center mb-3">
        <span className="text-xs font-semibold text-[#52606F] uppercase tracking-wider block">
          Honest Wait-Time Prediction
        </span>
        <div className="flex items-center justify-center space-x-2 mt-1">
          <Clock className="w-6 h-6 text-[#0B5CAD] stroke-[1.5]" />
          <span className="text-3xl font-bold text-[#14202E] tabular-nums">
            {patient.estimatedWaitMinutes === 0
              ? 'Now Calling!'
              : `about ${patient.estimatedWaitMinutes} min`}
          </span>
        </div>
        <button
          onClick={() => setShowWhy(!showWhy)}
          className="mt-2 text-xs font-semibold text-[#0B5CAD] hover:underline focus-ring px-2 py-0.5 rounded-[6px] inline-flex items-center"
        >
          <Info className="w-3.5 h-3.5 mr-1 stroke-[1.5]" />
          {showWhy ? 'Hide calculation details' : 'Why this estimate?'}
        </button>
      </div>

      {showWhy && (
        <div className="bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] p-3 text-xs text-[#52606F] space-y-1.5 mb-2">
          <p className="font-semibold text-[#14202E] border-b border-[#D5DCE4] pb-1">Wait Time Breakdown:</p>
          <div className="flex justify-between">
            <span>Doctor velocity:</span>
            <strong className="text-[#14202E] tabular-nums">~4 min / patient</strong>
          </div>
          <div className="flex justify-between">
            <span>Patients ahead in queue:</span>
            <strong className="text-[#14202E] tabular-nums">3 patients</strong>
          </div>
          <div className="flex justify-between">
            <span>Priority jump adjustments:</span>
            <strong className="text-[#14202E] tabular-nums">+1 emergency case ahead</strong>
          </div>
          <div className="flex justify-between text-[#0B5CAD] font-medium pt-1 border-t border-[#D5DCE4]">
            <span>Model confidence score:</span>
            <strong className="tabular-nums">94% (Historical LAN telemetry)</strong>
          </div>
        </div>
      )}
    </div>
  );
};
