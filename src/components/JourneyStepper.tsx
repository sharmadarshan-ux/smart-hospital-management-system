import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import type { JourneyStage } from '../types/queue';

interface JourneyStepperProps {
  currentStage: JourneyStage;
  predictedJam?: {
    stage: JourneyStage;
    minutes: number;
  };
}

const STAGES: { id: JourneyStage; label: string; desc: string }[] = [
  { id: 'Registration', label: 'Registration', desc: 'Check-in & Triage' },
  { id: 'Doctor', label: 'Doctor', desc: 'OPD Consultation' },
  { id: 'Lab', label: 'Laboratory', desc: 'Blood / Diagnostic Test' },
  { id: 'Pharmacy', label: 'Pharmacy', desc: 'Medication Dispense' },
  { id: 'Billing', label: 'Billing', desc: 'Payment & Discharge' }
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
  currentStage,
  predictedJam = { stage: 'Lab', minutes: 15 }
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-4">
      <div className="flex items-center justify-between mb-3 border-b border-[#D5DCE4] pb-2">
        <span className="text-xs font-semibold text-[#52606F] uppercase tracking-wider">
          Multi-Stop Journey Route
        </span>
        <span className="text-xs font-semibold text-[#0B5CAD] bg-[#E6F0FA] px-2 py-0.5 rounded-[6px] border border-[#0B5CAD] tabular-nums">
          Step {Math.max(1, currentIndex + 1)} of 5
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = stage.id === currentStage;
          const isJam = predictedJam && predictedJam.stage === stage.id;

          let stepBoxClass = "border border-[#D5DCE4] bg-[#F5F7FA] text-[#52606F]";
          let numberBadge = "bg-[#D5DCE4] text-[#14202E]";

          if (isCompleted) {
            stepBoxClass = "border-[#0B5CAD] bg-[#E6F0FA] text-[#0B5CAD]";
            numberBadge = "bg-[#0B5CAD] text-white";
          } else if (isCurrent) {
            stepBoxClass = "border-[#0B5CAD] bg-white text-[#14202E] ring-2 ring-[#0B5CAD] ring-offset-1 font-semibold";
            numberBadge = "bg-[#0B5CAD] text-white";
          }

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-[6px] border flex items-start space-x-3 transition-qc ${stepBoxClass}`}
            >
              <div className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${numberBadge}`}>
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold truncate leading-tight">{stage.label}</p>
                  {isCurrent && (
                    <span className="text-[10px] font-bold text-[#0B5CAD] uppercase bg-[#E6F0FA] px-1 rounded-[6px] shrink-0 ml-1">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#52606F] truncate mt-0.5">{stage.desc}</p>

                {isJam && !isCompleted && (
                  <div className="mt-1.5 flex items-center space-x-1 text-[10px] font-medium text-[#C62828] bg-[#FDECEC] px-1.5 py-0.5 rounded-[6px] border border-[#C62828]">
                    <AlertCircle className="w-3 h-3 shrink-0 stroke-[1.5]" />
                    <span className="truncate tabular-nums">Predicted {predictedJam.minutes}m jam</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {predictedJam && (
        <div className="mt-3 bg-[#E6F0FA] border border-[#0B5CAD] rounded-[6px] px-3 py-2 text-xs flex items-center space-x-2 text-[#14202E]">
          <Clock className="w-4 h-4 text-[#0B5CAD] stroke-[1.5] shrink-0" />
          <span>
            <strong>Journey Bottleneck Alert:</strong> Predicted {predictedJam.minutes} minute bottleneck expected at the <strong>{predictedJam.stage}</strong> stage due to high diagnostic volume.
          </span>
        </div>
      )}
    </div>
  );
};
