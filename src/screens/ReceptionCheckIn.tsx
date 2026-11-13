import React, { useState } from 'react';
import { UserPlus, Search, Printer } from 'lucide-react';
import { useLiveQueue } from '../context/QueueContext';
import type { PatientRecord } from '../types/queue';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { TokenPrintModal } from '../components/TokenPrintModal';

export const ReceptionCheckIn: React.FC = () => {
  const { patients, doctors, registerNewPatient } = useLiveQueue();
  const [searchTerm, setSearchTerm] = useState('');
  const [printedPatient, setPrintedPatient] = useState<PatientRecord | null>(null);

  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'M' | 'F' | 'Other'>('M');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('General Medicine');
  const [assignedDoctor, setAssignedDoctor] = useState('Dr. Meenakshi Sundaram');
  const [visitType, setVisitType] = useState('Fever & Cough');

  const [hasChestPain, setHasChestPain] = useState(false);
  const [hasSevereBleeding, setHasSevereBleeding] = useState(false);
  const [isUnconscious, setIsUnconscious] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyWeeks, setPregnancyWeeks] = useState<number>(24);

  const numAge = Number(age) || 0;
  let calculatedPriority = 'General';
  let calculatedReason = 'Standard registration order (Position calculated on submission)';

  if (hasChestPain || hasSevereBleeding || isUnconscious) {
    calculatedPriority = 'Emergency';
    calculatedReason = `CRITICAL TRIAGE PROTOCOL: Emergency priority (${
      hasChestPain ? 'Acute chest pain' : hasSevereBleeding ? 'Uncontrolled bleeding' : 'Loss of consciousness'
    })`;
  } else if (numAge >= 60) {
    calculatedPriority = 'Senior';
    calculatedReason = `Moved ahead: Senior citizen, age ${numAge}`;
  } else if (isPregnant) {
    calculatedPriority = 'Pregnant';
    calculatedReason = `Moved ahead: Priority care - Pregnant mother (${pregnancyWeeks} weeks)`;
  }

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !phone) return;

    const newPatient = registerNewPatient({
      name,
      age: Number(age),
      gender,
      phone,
      department,
      assignedDoctor,
      visitType,
      hasChestPain,
      hasSevereBleeding,
      isUnconscious,
      isPregnant,
      pregnancyWeeks
    });

    setPrintedPatient(newPatient);

    setName('');
    setAge('');
    setPhone('');
    setHasChestPain(false);
    setHasSevereBleeding(false);
    setIsUnconscious(false);
    setIsPregnant(false);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-[6px] bg-[#0B5CAD] text-white flex items-center justify-center font-bold">
            <UserPlus className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14202E]">
              Reception Check-in & Clinical Triage (Screen B)
            </h1>
            <p className="text-xs text-[#52606F]">
              Patient Lookup, Rapid Clinical Triage & Thermal Token Generation
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white border border-[#D5DCE4] rounded-[6px] p-5 space-y-5">
          <div className="border-b border-[#D5DCE4] pb-3">
            <h2 className="text-base font-bold text-[#14202E] flex items-center space-x-2">
              <span>New Patient Check-in Form</span>
              <span className="text-xs font-normal text-[#0B5CAD] bg-[#E6F0FA] px-2 py-0.5 rounded-[6px] border border-[#0B5CAD]">
                Rule-Based Priority Engine
              </span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#14202E] mb-1">
                  Full Patient Name <span className="text-[#C62828]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring text-[#14202E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#14202E] mb-1">
                  Mobile Number (for SMS token) <span className="text-[#C62828]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98401 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring font-mono text-[#14202E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#14202E] mb-1">
                  Age (Years) <span className="text-[#C62828]">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="120"
                  placeholder="e.g. 72"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring tabular-nums text-[#14202E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#14202E] mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring text-[#14202E]"
                >
                  <option value="M">Male (M)</option>
                  <option value="F">Female (F)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#D5DCE4]">
              <div>
                <label className="block font-semibold text-[#14202E] mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    const docsInDept = doctors.filter(d => d.department === e.target.value);
                    if (docsInDept.length > 0) setAssignedDoctor(docsInDept[0].name);
                  }}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring text-[#14202E]"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Paediatrics">Paediatrics</option>
                  <option value="Orthopaedics">Orthopaedics</option>
                  <option value="Cardiology">Cardiology</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#14202E] mb-1">Assigned Doctor</label>
                <select
                  value={assignedDoctor}
                  onChange={(e) => setAssignedDoctor(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring text-[#14202E]"
                >
                  {doctors
                    .filter(d => d.department === department)
                    .map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.roomNo})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#14202E] mb-1">Chief Symptom / Cause</label>
                <input
                  type="text"
                  placeholder="e.g. Fever, Chest pain, Follow-up"
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-3 py-2 text-xs focus-ring text-[#14202E]"
                />
              </div>
            </div>

            <div className="bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] p-3.5 space-y-2">
              <span className="font-semibold text-[#14202E] block text-xs border-b border-[#D5DCE4] pb-1">
                Clinical Triage Override Checklist (Rule-Based Engine)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <label className="flex items-center space-x-2 text-[#C62828] font-semibold bg-white p-2 rounded-[6px] border border-[#C62828]/40">
                  <input
                    type="checkbox"
                    checked={hasChestPain}
                    onChange={(e) => setHasChestPain(e.target.checked)}
                    className="w-4 h-4 rounded-[6px] border-[#C62828] focus-ring"
                  />
                  <span>Chest Pain / Pressure (Acute Trauma)</span>
                </label>

                <label className="flex items-center space-x-2 text-[#C62828] font-semibold bg-white p-2 rounded-[6px] border border-[#C62828]/40">
                  <input
                    type="checkbox"
                    checked={hasSevereBleeding}
                    onChange={(e) => setHasSevereBleeding(e.target.checked)}
                    className="w-4 h-4 rounded-[6px] border-[#C62828] focus-ring"
                  />
                  <span>Uncontrolled Bleeding / Deep Wound</span>
                </label>

                <label className="flex items-center space-x-2 text-[#C62828] font-semibold bg-white p-2 rounded-[6px] border border-[#C62828]/40">
                  <input
                    type="checkbox"
                    checked={isUnconscious}
                    onChange={(e) => setIsUnconscious(e.target.checked)}
                    className="w-4 h-4 rounded-[6px] border-[#C62828] focus-ring"
                  />
                  <span>Unconscious / Altered Sensorium</span>
                </label>

                <label className="flex items-center space-x-2 text-[#0B5CAD] font-semibold bg-white p-2 rounded-[6px] border border-[#0B5CAD]/40">
                  <input
                    type="checkbox"
                    checked={isPregnant}
                    onChange={(e) => setIsPregnant(e.target.checked)}
                    className="w-4 h-4 rounded-[6px] border-[#0B5CAD] focus-ring"
                  />
                  <span>Pregnant Mother</span>
                </label>
              </div>

              {isPregnant && (
                <div className="mt-2 flex items-center space-x-2 bg-white p-2 rounded-[6px] border border-[#0B5CAD]">
                  <span className="text-xs text-[#52606F]">Gestation (Weeks):</span>
                  <input
                    type="number"
                    min="1"
                    max="42"
                    value={pregnancyWeeks}
                    onChange={(e) => setPregnancyWeeks(Number(e.target.value))}
                    className="w-20 bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-2 py-1 text-xs tabular-nums"
                  />
                </div>
              )}
            </div>

            <div className={`p-3 rounded-[6px] border text-xs ${
              calculatedPriority === 'Emergency'
                ? 'bg-[#FDECEC] border-[#C62828] text-[#C62828]'
                : 'bg-[#E6F0FA] border-[#0B5CAD] text-[#0B5CAD]'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold uppercase tracking-wider text-[10px]">
                  Rule Engine Evaluation Result:
                </span>
                <Badge priority={calculatedPriority as any} />
              </div>
              <p className="font-semibold text-xs text-[#14202E]">
                {calculatedReason}
              </p>
            </div>

            <Button
              type="submit"
              variant={calculatedPriority === 'Emergency' ? 'destructive' : 'primary'}
              size="lg"
              className="w-full"
              icon={<Printer className="w-5 h-5 stroke-[1.5]" />}
            >
              Issue Token & Open Thermal Print Preview
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#D5DCE4] rounded-[6px] p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-[#D5DCE4] pb-3 mb-3">
              <h2 className="text-base font-bold text-[#14202E]">
                Patient Registry Search
              </h2>
              <p className="text-xs text-[#52606F] mt-0.5">
                Look up past UHID records or check current queue status
              </p>
            </div>

            <div className="relative mb-3">
              <Search className="w-4 h-4 text-[#52606F] absolute left-3 top-2.5 stroke-[1.5]" />
              <input
                type="text"
                placeholder="Search UHID, Mobile, or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] pl-9 pr-3 py-2 text-xs focus-ring text-[#14202E]"
              />
            </div>

            <div className="overflow-y-auto max-h-[480px] border border-[#D5DCE4] rounded-[6px]">
              <div className="divide-y divide-[#D5DCE4] bg-white">
                {filteredPatients.map(p => (
                  <div key={p.id} className="p-3 hover:bg-[#F5F7FA] transition-qc text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0B5CAD] text-sm tabular-nums">
                        {p.token}
                      </span>
                      <Badge priority={p.priority} size="sm" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-[#14202E] block">{p.name}</strong>
                        <span className="text-[#52606F] font-mono">{p.uhid} • {p.phone}</span>
                      </div>
                      <button
                        onClick={() => setPrintedPatient(p)}
                        className="text-[#0B5CAD] hover:underline font-semibold text-xs border border-[#0B5CAD] px-2 py-0.5 rounded-[6px] bg-[#E6F0FA]"
                      >
                        Re-print
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D5DCE4] text-xs text-[#52606F] flex items-center justify-between">
            <span>Hospital LAN Database Active</span>
            <span className="font-mono font-bold text-[#0B5CAD]">{filteredPatients.length} records</span>
          </div>
        </div>
      </div>

      {printedPatient && (
        <TokenPrintModal patient={printedPatient} onClose={() => setPrintedPatient(null)} />
      )}
    </div>
  );
};
