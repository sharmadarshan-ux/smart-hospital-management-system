import React from 'react';
import { Printer, X, CheckCircle2 } from 'lucide-react';
import type { PatientRecord } from '../types/queue';
import { Button } from './Button';

interface TokenPrintModalProps {
  patient: PatientRecord | null;
  onClose: () => void;
}

export const TokenPrintModal: React.FC<TokenPrintModalProps> = ({ patient, onClose }) => {
  if (!patient) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-[#14202E]/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#D5DCE4] rounded-[6px] max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-[#0B5CAD] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 stroke-[1.5]" />
            <h3 className="font-semibold text-base">Token Receipt Print Preview</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-[6px] focus-ring"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        <div className="p-6 bg-[#F5F7FA] overflow-y-auto flex-1 flex justify-center">
          <div className="bg-white border border-[#D5DCE4] p-6 rounded-[6px] w-[300px] text-center font-mono shadow-sm text-sm text-[#14202E]">
            <div className="border-b border-dashed border-[#D5DCE4] pb-3 mb-3">
              <h2 className="font-bold text-base tracking-tight font-sans text-[#0B5CAD]">QUEUECARE HOSPITAL</h2>
              <p className="text-[11px] text-[#52606F] font-sans">Government District Healthcare Unit</p>
              <p className="text-[10px] text-[#52606F]">LAN Terminal #04 • Reception Desk</p>
            </div>

            <div className="my-3 py-2 border-y border-dashed border-[#D5DCE4]">
              <span className="text-xs uppercase text-[#52606F] block font-sans">YOUR TOKEN NUMBER</span>
              <span className="text-4xl font-extrabold text-[#0B5CAD] tabular-nums block my-1">
                {patient.token}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-[6px] bg-[#E6F0FA] text-[#0B5CAD] inline-block font-sans border border-[#0B5CAD]">
                {patient.priority} Priority
              </span>
            </div>

            <div className="text-left text-xs space-y-1 my-3 font-sans">
              <div className="flex justify-between">
                <span className="text-[#52606F]">UHID:</span>
                <span className="font-bold tabular-nums">{patient.uhid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52606F]">Patient:</span>
                <span className="font-semibold truncate max-w-[150px]">{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52606F]">Age / Gender:</span>
                <span className="font-semibold">{patient.age}y / {patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52606F]">Doctor:</span>
                <span className="font-semibold truncate max-w-[150px]">{patient.assignedDoctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52606F]">Room:</span>
                <span className="font-bold text-[#0B5CAD]">{patient.roomNo}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-[#D5DCE4] pt-1">
                <span className="text-[#52606F]">Est. Wait:</span>
                <span className="font-bold tabular-nums">~{patient.estimatedWaitMinutes} min</span>
              </div>
            </div>

            <div className="bg-[#E6F0FA] p-2 rounded-[6px] text-[11px] text-left font-sans text-[#14202E] border border-[#0B5CAD] mb-3">
              <strong className="block text-[#0B5CAD] text-[10px] uppercase">Routing Reason:</strong>
              <span>{patient.priorityReason}</span>
            </div>

            <div className="my-3 py-2 bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] flex flex-col items-center justify-center">
              <div className="h-8 w-48 bg-[repeating-linear-gradient(90deg,#14202E_0px,#14202E_2px,transparent_2px,transparent_4px,#14202E_4px,#14202E_7px,transparent_7px,transparent_9px)]"></div>
              <span className="text-[10px] font-mono mt-1 text-[#52606F]">{patient.uhid}</span>
            </div>

            <div className="text-[10px] text-[#52606F] font-sans border-t border-dashed border-[#D5DCE4] pt-2 space-y-1">
              <p>No Smartphone? Track via SMS / Missed Call:</p>
              <p className="font-mono font-bold text-[#14202E]">Give missed call to 1800-425-9000</p>
              <p className="text-[9px] mt-1 text-[#52606F]">Issued: {patient.registrationTime} • LAN Offline Ready</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-[#D5DCE4] p-4 flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-1.5 text-xs text-[#52606F]">
            <CheckCircle2 className="w-4 h-4 text-[#0B5CAD] stroke-[1.5]" />
            <span>Thermal printer connected</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" icon={<Printer className="w-4 h-4 stroke-[1.5]" />} onClick={handlePrint}>
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
