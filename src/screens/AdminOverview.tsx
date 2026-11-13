import React, { useState } from 'react';
import { BarChart3, Wifi, WifiOff, Layers, Server, RefreshCw } from 'lucide-react';
import { useLiveQueue } from '../context/QueueContext';
import { Button } from '../components/Button';
import { StatusBanner } from '../components/StatusBanner';

export const AdminOverview: React.FC = () => {
  const { isOffline, toggleOffline, departments, doctors, patients } = useLiveQueue();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const totalPatients = patients.length;
  const totalWaiting = patients.filter(p => p.status === 'Waiting').length;
  const totalInConsultation = patients.filter(p => p.status === 'In Consultation').length;
  const totalCompleted = patients.filter(p => p.status === 'Completed').length;

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-[6px] bg-[#0B5CAD] text-white flex items-center justify-center font-bold">
            <BarChart3 className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14202E]">
              Hospital Operations & LAN Admin Overview (Screen E)
            </h1>
            <p className="text-xs text-[#52606F]">
              Capacity Load Balancing, Bottleneck Analysis & LAN Database Sync Console
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant={isOffline ? 'destructive' : 'primary'}
            size="sm"
            icon={isOffline ? <WifiOff className="w-4 h-4 stroke-[1.5]" /> : <Wifi className="w-4 h-4 stroke-[1.5]" />}
            onClick={toggleOffline}
          >
            {isOffline ? 'LAN Offline Mode Active' : 'LAN Connected & Live'}
          </Button>
        </div>
      </div>

      {syncSuccess && <StatusBanner type="synced" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-[#D5DCE4] p-4 rounded-[6px]">
          <span className="text-[#52606F] font-semibold uppercase tracking-wider block">Total Registered Today</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-extrabold text-[#0B5CAD] tabular-nums">{totalPatients}</span>
            <span className="text-[#52606F]">Patients</span>
          </div>
          <span className="text-[11px] text-[#52606F] mt-1 block">OPD & Triage Desks</span>
        </div>

        <div className="bg-white border border-[#D5DCE4] p-4 rounded-[6px]">
          <span className="text-[#52606F] font-semibold uppercase tracking-wider block">Currently Waiting</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-extrabold text-[#14202E] tabular-nums">{totalWaiting}</span>
            <span className="text-[#0B5CAD] font-bold">Active Queue</span>
          </div>
          <span className="text-[11px] text-[#52606F] mt-1 block">Estimated avg wait ~18 min</span>
        </div>

        <div className="bg-white border border-[#D5DCE4] p-4 rounded-[6px]">
          <span className="text-[#52606F] font-semibold uppercase tracking-wider block">In Consultation</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-extrabold text-[#0B5CAD] tabular-nums">{totalInConsultation}</span>
            <span className="text-[#0B5CAD] font-bold">Rooms Active</span>
          </div>
          <span className="text-[11px] text-[#52606F] mt-1 block">4 Physicians on duty</span>
        </div>

        <div className="bg-white border border-[#D5DCE4] p-4 rounded-[6px]">
          <span className="text-[#52606F] font-semibold uppercase tracking-wider block">Completed & Routed</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-extrabold text-[#52606F] tabular-nums">{totalCompleted}</span>
            <span className="text-[#52606F]">Discharged/Lab</span>
          </div>
          <span className="text-[11px] text-[#52606F] mt-1 block">100% LAN Telemetry Logged</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#D5DCE4] rounded-[6px] p-5 space-y-4">
          <div className="border-b border-[#D5DCE4] pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#14202E] flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#0B5CAD] stroke-[1.5]" />
              <span>Department Load & Capacity Metrics</span>
            </h2>
            <span className="text-xs text-[#52606F] bg-[#F5F7FA] border border-[#D5DCE4] px-2 py-0.5 rounded-[6px]">
              Real-time Hospital Telemetry
            </span>
          </div>

          <div className="overflow-x-auto border border-[#D5DCE4] rounded-[6px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F5F7FA] border-b border-[#D5DCE4] text-[#52606F] font-semibold uppercase tracking-wider">
                  <th className="p-3 border-r border-[#D5DCE4]">Department</th>
                  <th className="p-3 border-r border-[#D5DCE4]">Active Doctors</th>
                  <th className="p-3 border-r border-[#D5DCE4]">Waiting Patients</th>
                  <th className="p-3 border-r border-[#D5DCE4]">Avg Wait Time</th>
                  <th className="p-3 border-r border-[#D5DCE4]">Capacity Status</th>
                  <th className="p-3">Predicted Bottleneck</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5DCE4] bg-white">
                {departments.map((dept) => {
                  const isJam = dept.jamLevel !== 'Normal';
                  return (
                    <tr key={dept.name} className="hover:bg-[#F5F7FA] transition-qc">
                      <td className="p-3 border-r border-[#D5DCE4] font-bold text-[#14202E]">
                        {dept.name}
                      </td>
                      <td className="p-3 border-r border-[#D5DCE4] tabular-nums font-semibold text-[#0B5CAD]">
                        {dept.activeDoctors} Physicians
                      </td>
                      <td className="p-3 border-r border-[#D5DCE4] tabular-nums font-bold text-[#14202E]">
                        {dept.waitingPatients} Patients
                      </td>
                      <td className="p-3 border-r border-[#D5DCE4] tabular-nums font-bold text-[#14202E]">
                        ~{dept.avgWaitTime} min
                      </td>
                      <td className="p-3 border-r border-[#D5DCE4]">
                        <span className={`px-2 py-0.5 rounded-[6px] text-xs font-semibold border ${
                          isJam ? 'bg-[#FDECEC] text-[#C62828] border-[#C62828]' : 'bg-[#E6F0FA] text-[#0B5CAD] border-[#0B5CAD]'
                        }`}>
                          {dept.jamLevel}
                        </span>
                      </td>
                      <td className="p-3 text-[#14202E] font-medium">
                        {dept.bottleneckStop ? (
                          <span className="text-[#C62828] font-semibold bg-[#FDECEC] px-2 py-0.5 rounded-[6px] border border-[#C62828]">
                            {dept.bottleneckStop} Delay
                          </span>
                        ) : (
                          <span className="text-[#52606F]">Clear Flow</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-[#D5DCE4]">
            <h3 className="text-xs font-bold text-[#52606F] uppercase tracking-wider mb-2">
              Individual Doctor Velocity & Queue Depth
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {doctors.map(doc => (
                <div key={doc.id} className="border border-[#D5DCE4] p-3 rounded-[6px] bg-[#F5F7FA] flex justify-between items-center">
                  <div>
                    <strong className="text-[#14202E] block">{doc.name}</strong>
                    <span className="text-[#52606F]">{doc.department} • {doc.roomNo}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#0B5CAD] tabular-nums block">{doc.waitingCount} waiting</span>
                    <span className="text-[11px] text-[#52606F] tabular-nums">Velocity: ~{doc.avgVelocityMinutes}m/pat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-5 space-y-4">
          <div className="border-b border-[#D5DCE4] pb-3">
            <h2 className="text-base font-bold text-[#14202E] flex items-center space-x-2">
              <Server className="w-5 h-5 text-[#0B5CAD] stroke-[1.5]" />
              <span>Hospital LAN Sync Control</span>
            </h2>
            <p className="text-xs text-[#52606F] mt-0.5">
              Offline-first synchronization buffer for central DB sync
            </p>
          </div>

          <div className={`p-4 rounded-[6px] border text-xs space-y-2 ${
            isOffline ? 'bg-[#FDECEC] border-[#C62828] text-[#C62828]' : 'bg-[#E6F0FA] border-[#0B5CAD] text-[#0B5CAD]'
          }`}>
            <div className="flex items-center justify-between">
              <strong className="font-bold text-sm">
                {isOffline ? 'LOCAL LAN CACHE MODE' : 'CENTRAL DB SYNCED'}
              </strong>
              {isOffline ? <WifiOff className="w-5 h-5 stroke-[1.5]" /> : <Wifi className="w-4 h-4 stroke-[1.5]" />}
            </div>
            <p className="text-[#14202E]">
              {isOffline
                ? 'System is currently operating on local hospital LAN server. All queue updates are written to IndexedDB / local memory buffer.'
                : 'All patient registrations, priority overrides, and consultation completions are in sync with central hospital records.'}
            </p>
          </div>

          <div className="border border-[#D5DCE4] rounded-[6px] p-3 bg-[#F5F7FA] text-xs space-y-2">
            <div className="flex justify-between font-semibold text-[#14202E] border-b border-[#D5DCE4] pb-1">
              <span>Pending Buffer Operations:</span>
              <span className="tabular-nums font-mono text-[#0B5CAD]">4 Transactions</span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-[#52606F]">
              <div className="flex justify-between">
                <span>[CHECKIN] Token A-108 (Emergency)</span>
                <span>Queued 09:22</span>
              </div>
              <div className="flex justify-between">
                <span>[STATUS] Token A-102 -&gt; Done</span>
                <span>Queued 09:25</span>
              </div>
              <div className="flex justify-between">
                <span>[SWITCH] Token A-104 -&gt; Dr. Karthik</span>
                <span>Queued 09:28</span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            icon={<RefreshCw className={`w-4 h-4 stroke-[1.5] ${isSyncing ? 'animate-spin' : ''}`} />}
            onClick={handleManualSync}
            disabled={isSyncing}
          >
            {isSyncing ? 'Synchronizing LAN Data...' : 'Force Sync Pending Operations'}
          </Button>

          <div className="pt-3 border-t border-[#D5DCE4] text-[11px] text-[#52606F] space-y-1">
            <p><strong>LAN Architecture Note:</strong> SQLite / IndexedDB local state seamlessly syncs with FastAPI + Supabase backend when connection restores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
