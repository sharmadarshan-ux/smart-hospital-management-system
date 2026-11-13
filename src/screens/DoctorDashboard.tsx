import React, { useState } from 'react';
import {
  Stethoscope,
  UserCheck,
  PhoneCall,
  ArrowRightLeft,
  AlertTriangle,
  Activity,
  CheckCircle,
  Filter
} from 'lucide-react';
import { useLiveQueue } from '../context/QueueContext';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { StatusBanner } from '../components/StatusBanner';

export const DoctorDashboard: React.FC = () => {
  const { patients, doctors, callNextPatient, markPatientDone, switchDoctorConsent } = useLiveQueue();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('doc-1');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const currentDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  const docPatients = patients.filter(p => p.assignedDoctor === currentDoctor.name);
  
  const activeConsultationPatient = docPatients.find(p => p.status === 'In Consultation');

  const waitingPatients = docPatients
    .filter(p => p.status === 'Waiting')
    .filter(p => filterPriority === 'ALL' || p.priority === filterPriority)
    .sort((a, b) => {
      if (a.priorityOrder !== b.priorityOrder) return a.priorityOrder - b.priorityOrder;
      return a.id.localeCompare(b.id);
    });

  const alternateDoctor = doctors.find(d => d.department === currentDoctor.department && d.id !== currentDoctor.id);

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-[6px] bg-[#0B5CAD] text-white flex items-center justify-center font-bold">
            <Stethoscope className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14202E]">
              Staff & Doctor Workstation (Screen C)
            </h1>
            <p className="text-xs text-[#52606F]">
              Live OPD Queue Management & Clinical Triage Console
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs font-semibold text-[#52606F]">Active Physician Desk:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-1.5 text-xs font-semibold text-[#14202E] focus-ring"
          >
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.department} - {d.roomNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {alternateDoctor && currentDoctor.waitingCount > 4 && (
        <StatusBanner
          type="suggestion"
          message={`${currentDoctor.name} currently has ${currentDoctor.waitingCount} patients waiting. ${alternateDoctor.name} (${alternateDoctor.roomNo}) in ${alternateDoctor.department} has only ${alternateDoctor.waitingCount} waiting patients.`}
          actionText={`Suggest Re-route to ${alternateDoctor.name}`}
          onAction={() => {
            if (waitingPatients.length > 0) {
              switchDoctorConsent(waitingPatients[waitingPatients.length - 1].id, alternateDoctor.name);
            }
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#D5DCE4] rounded-[6px] p-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-[#D5DCE4] gap-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-[#14202E]">
                  Waiting Queue ({waitingPatients.length} Patients)
                </span>
                <span className="text-xs text-[#52606F] bg-[#F5F7FA] border border-[#D5DCE4] px-2 py-0.5 rounded-[6px] tabular-nums">
                  Avg Velocity: {currentDoctor.avgVelocityMinutes} min/patient
                </span>
              </div>

              <div className="flex items-center space-x-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-[#52606F] stroke-[1.5]" />
                <button
                  onClick={() => setFilterPriority('ALL')}
                  className={`px-2 py-1 rounded-[6px] font-semibold border ${
                    filterPriority === 'ALL' ? 'bg-[#0B5CAD] text-white border-[#0B5CAD]' : 'bg-white text-[#52606F] border-[#D5DCE4]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterPriority('Emergency')}
                  className={`px-2 py-1 rounded-[6px] font-semibold border ${
                    filterPriority === 'Emergency' ? 'bg-[#C62828] text-white border-[#C62828]' : 'bg-white text-[#52606F] border-[#D5DCE4]'
                  }`}
                >
                  Emergency
                </button>
                <button
                  onClick={() => setFilterPriority('Senior')}
                  className={`px-2 py-1 rounded-[6px] font-semibold border ${
                    filterPriority === 'Senior' ? 'bg-[#0B5CAD] text-white border-[#0B5CAD]' : 'bg-white text-[#52606F] border-[#D5DCE4]'
                  }`}
                >
                  Senior
                </button>
              </div>
            </div>

            <div className="mb-4 bg-[#E6F0FA] border border-[#0B5CAD] rounded-[6px] p-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#14202E]">
                <strong className="text-[#0B5CAD] block">Desk Action Controls:</strong>
                <span>Call next waiting token to OPD Room 3 or complete active consultation.</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<PhoneCall className="w-4 h-4 stroke-[1.5]" />}
                  onClick={() => callNextPatient(currentDoctor.id)}
                  disabled={waitingPatients.length === 0}
                >
                  Call Next Patient
                </Button>
                {activeConsultationPatient && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<CheckCircle className="w-4 h-4 text-[#0B5CAD] stroke-[1.5]" />}
                    onClick={() => markPatientDone(activeConsultationPatient.id)}
                  >
                    Mark Done & Send to Lab
                  </Button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto border border-[#D5DCE4] rounded-[6px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F5F7FA] border-b border-[#D5DCE4] text-[#52606F] font-semibold uppercase tracking-wider">
                    <th className="p-3 border-r border-[#D5DCE4]">Token</th>
                    <th className="p-3 border-r border-[#D5DCE4]">Patient Details</th>
                    <th className="p-3 border-r border-[#D5DCE4]">Visit Type</th>
                    <th className="p-3 border-r border-[#D5DCE4]">Wait Time</th>
                    <th className="p-3 border-r border-[#D5DCE4]">Priority & Reason</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5DCE4] bg-white">
                  {waitingPatients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#52606F]">
                        No patients currently waiting in queue for {currentDoctor.name}.
                      </td>
                    </tr>
                  ) : (
                    waitingPatients.map((patient) => {
                      const isEmergency = patient.priority === 'Emergency';
                      return (
                        <tr
                          key={patient.id}
                          className={`hover:bg-[#F5F7FA] transition-qc ${
                            isEmergency ? 'bg-[#FDECEC]/40' : ''
                          }`}
                        >
                          <td className="p-3 border-r border-[#D5DCE4] font-bold text-sm text-[#0B5CAD] tabular-nums">
                            {patient.token}
                          </td>
                          <td className="p-3 border-r border-[#D5DCE4]">
                            <strong className="text-[#14202E] block">{patient.name}</strong>
                            <span className="text-[#52606F] font-mono">{patient.uhid} • {patient.age}y/{patient.gender}</span>
                          </td>
                          <td className="p-3 border-r border-[#D5DCE4] text-[#14202E]">
                            {patient.visitType}
                          </td>
                          <td className="p-3 border-r border-[#D5DCE4] font-bold text-[#14202E] tabular-nums">
                            {patient.estimatedWaitMinutes} min
                          </td>
                          <td className="p-3 border-r border-[#D5DCE4] max-w-[220px]">
                            <Badge priority={patient.priority} />
                            <p className="text-[11px] text-[#52606F] mt-1 line-clamp-2">
                              {patient.priorityReason}
                            </p>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                callNextPatient(currentDoctor.id);
                              }}
                              className="bg-[#0B5CAD] text-white hover:bg-[#094A8C] px-2.5 py-1 rounded-[6px] text-xs font-semibold focus-ring inline-flex items-center space-x-1"
                            >
                              <PhoneCall className="w-3 h-3 stroke-[1.5]" />
                              <span>Call</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D5DCE4] text-xs text-[#52606F] flex justify-between">
            <span>Showing {waitingPatients.length} active queue entries</span>
            <span>Tabular numerals enabled • LAN Real-time Sync Active</span>
          </div>
        </div>

        <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-5 space-y-4">
          <div className="border-b border-[#D5DCE4] pb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52606F] uppercase tracking-wider">
              Active Consultation Panel
            </span>
            <span className="text-xs font-bold text-[#0B5CAD] bg-[#E6F0FA] px-2 py-0.5 rounded-[6px] border border-[#0B5CAD]">
              {currentDoctor.roomNo}
            </span>
          </div>

          {activeConsultationPatient ? (
            <div className="space-y-4">
              <div className="bg-[#E6F0FA] border border-[#0B5CAD] rounded-[6px] p-4 text-center">
                <span className="text-xs text-[#52606F] block">CURRENTLY IN ROOM</span>
                <span className="text-4xl font-extrabold text-[#0B5CAD] tabular-nums block my-1">
                  {activeConsultationPatient.token}
                </span>
                <h3 className="font-bold text-base text-[#14202E]">
                  {activeConsultationPatient.name}
                </h3>
                <span className="text-xs text-[#52606F] font-mono block mt-0.5">
                  {activeConsultationPatient.uhid} • {activeConsultationPatient.age} yrs • {activeConsultationPatient.gender}
                </span>
              </div>

              <div className="border border-[#D5DCE4] rounded-[6px] p-3 text-xs space-y-2 bg-[#F5F7FA]">
                <strong className="text-[#14202E] font-semibold block border-b border-[#D5DCE4] pb-1 flex items-center justify-between">
                  <span>Clinical Triage Notes</span>
                  <Activity className="w-3.5 h-3.5 text-[#0B5CAD] stroke-[1.5]" />
                </strong>
                <div className="flex justify-between">
                  <span className="text-[#52606F]">Visit Reason:</span>
                  <span className="font-semibold text-[#14202E]">{activeConsultationPatient.visitType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52606F]">Priority Level:</span>
                  <Badge priority={activeConsultationPatient.priority} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52606F]">Check-in Time:</span>
                  <span className="font-mono text-[#14202E]">{activeConsultationPatient.registrationTime}</span>
                </div>
              </div>

              <div className="bg-[#FDECEC] border border-[#C62828] text-[#C62828] p-3 rounded-[6px] text-xs">
                <strong className="font-semibold block flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Priority Override Rule Applied</span>
                </strong>
                <p className="mt-1 text-[11px] text-[#14202E]">
                  {activeConsultationPatient.priorityReason}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#D5DCE4]">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<CheckCircle className="w-4 h-4 stroke-[1.5]" />}
                  onClick={() => markPatientDone(activeConsultationPatient.id)}
                >
                  Mark Complete & Route to Lab
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon={<ArrowRightLeft className="w-3.5 h-3.5 stroke-[1.5]" />}
                  onClick={() => {
                    if (alternateDoctor) {
                      switchDoctorConsent(activeConsultationPatient.id, alternateDoctor.name);
                    }
                  }}
                >
                  Transfer Patient to another Doctor
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#52606F] text-xs space-y-3">
              <UserCheck className="w-10 h-10 text-[#52606F]/50 mx-auto stroke-[1.5]" />
              <p>No active consultation in progress for {currentDoctor.name}.</p>
              <Button
                variant="primary"
                size="sm"
                icon={<PhoneCall className="w-4 h-4 stroke-[1.5]" />}
                onClick={() => callNextPatient(currentDoctor.id)}
                disabled={waitingPatients.length === 0}
              >
                Call Next Token
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
