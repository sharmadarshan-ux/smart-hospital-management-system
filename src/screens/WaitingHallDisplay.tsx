import React, { useState, useEffect } from 'react';
import { Volume2, Radio, ShieldAlert } from 'lucide-react';
import { useLiveQueue } from '../context/QueueContext';
import type { Language } from '../translations';
import { translations } from '../translations';

export const WaitingHallDisplay: React.FC = () => {
  const { doctors, patients, lastAnnouncement, playVoiceAnnouncement } = useLiveQueue();
  const [displayLang, setDisplayLang] = useState<Language>('en');

  useEffect(() => {
    const langInterval = setInterval(() => {
      setDisplayLang(prev => (prev === 'en' ? 'ta' : prev === 'ta' ? 'hi' : 'en'));
    }, 8000);
    return () => clearInterval(langInterval);
  }, []);

  const t = translations[displayLang];

  return (
    <div className="bg-[#14202E] text-white min-h-screen flex flex-col justify-between p-6 select-none font-sans">
      <div className="bg-[#0B5CAD] border-b-2 border-white rounded-[6px] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white text-[#0B5CAD] rounded-[6px] flex items-center justify-center font-extrabold text-2xl">
            QC
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight uppercase">
              GOVERNMENT GENERAL HOSPITAL
            </h1>
            <p className="text-sm text-[#E6F0FA] font-medium">
              OPD Central Waiting Hall Public Display • 1920x1080 (10m Distance Readable)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#094A8C] border border-[#E6F0FA]/30 px-3 py-1.5 rounded-[6px] text-xs">
            <Radio className="w-4 h-4 text-red-400 animate-pulse stroke-[2]" />
            <span className="font-semibold uppercase tracking-wider text-[#E6F0FA]">
              Language Rotation: {displayLang === 'en' ? 'English' : displayLang === 'ta' ? 'தமிழ்' : 'हिन्दी'}
            </span>
          </div>

          <button
            onClick={() => {
              playVoiceAnnouncement(
                "Token A-102 Lakshmi Ammal please proceed to OPD Room 3 General Medicine",
                displayLang
              );
            }}
            className="bg-white text-[#0B5CAD] hover:bg-[#E6F0FA] font-bold px-4 py-2 rounded-[6px] text-sm flex items-center space-x-2 focus-ring transition-qc"
          >
            <Volume2 className="w-5 h-5 stroke-[2]" />
            <span>Test Voice Announcement</span>
          </button>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
        {doctors.map(doctor => {
          const docPatients = patients.filter(p => p.assignedDoctor === doctor.name);
          const activePatient = docPatients.find(p => p.status === 'In Consultation');
          const upcoming5 = docPatients
            .filter(p => p.status === 'Waiting')
            .sort((a, b) => a.priorityOrder - b.priorityOrder)
            .slice(0, 5);

          return (
            <div
              key={doctor.id}
              className="bg-white text-[#14202E] rounded-[6px] border-4 border-[#0B5CAD] flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div className="bg-[#0B5CAD] text-white p-4 text-center border-b-2 border-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E6F0FA] block">
                  {doctor.department}
                </span>
                <h2 className="text-xl font-extrabold truncate">{doctor.name}</h2>
                <div className="mt-1 bg-[#094A8C] px-3 py-0.5 rounded-[6px] text-sm font-bold inline-block border border-white/30">
                  {doctor.roomNo}
                </div>
              </div>

              <div className="p-6 text-center bg-[#F5F7FA] border-b-2 border-[#D5DCE4] flex-1 flex flex-col justify-center">
                <span className="text-sm font-extrabold text-[#52606F] uppercase tracking-widest block">
                  {t.nowServing}
                </span>
                {activePatient ? (
                  <div className="my-2">
                    <span className="text-6xl font-black text-[#0B5CAD] tabular-nums block tracking-tighter">
                      {activePatient.token}
                    </span>
                    <span className="text-base font-bold text-[#14202E] block truncate mt-1">
                      {activePatient.name}
                    </span>
                    <span className="text-xs text-[#52606F] block mt-0.5">
                      {activePatient.priority} Priority
                    </span>
                  </div>
                ) : (
                  <div className="my-6 text-2xl font-bold text-[#52606F]">
                    Calling...
                  </div>
                )}
              </div>

              <div className="p-4 bg-white text-xs">
                <span className="text-xs font-bold text-[#52606F] uppercase tracking-wider block mb-2 border-b border-[#D5DCE4] pb-1">
                  {t.upcomingTokens}
                </span>
                <div className="space-y-1.5 font-mono">
                  {upcoming5.length === 0 ? (
                    <span className="text-[#52606F] italic block">No waiting tokens</span>
                  ) : (
                    upcoming5.map((p, idx) => (
                      <div
                        key={p.id}
                        className={`flex items-center justify-between p-2 rounded-[6px] border ${
                          p.priority === 'Emergency'
                            ? 'bg-[#FDECEC] text-[#C62828] border-[#C62828] font-bold'
                            : 'bg-[#F5F7FA] text-[#14202E] border-[#D5DCE4]'
                        }`}
                      >
                        <span className="font-extrabold text-sm tabular-nums">{idx + 1}. {p.token}</span>
                        <span className="text-[11px] truncate max-w-[120px] font-sans">{p.name}</span>
                        <span className="text-[10px] uppercase font-sans font-semibold">{p.priority}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {lastAnnouncement && (
        <div className="mb-4 bg-[#E6F0FA] border-2 border-[#0B5CAD] text-[#14202E] px-5 py-3 rounded-[6px] flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6 text-[#0B5CAD] animate-bounce stroke-[2]" />
            <div>
              <strong className="text-xs text-[#0B5CAD] uppercase tracking-wider block">
                AUDIO ANNOUNCEMENT BROADCAST ({lastAnnouncement.time})
              </strong>
              <p className="text-base font-bold text-[#14202E] mt-0.5">
                "{lastAnnouncement.text}"
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-[#0B5CAD] text-white px-3 py-1 rounded-[6px]">
            {lastAnnouncement.lang.toUpperCase()}
          </span>
        </div>
      )}

      <div className="bg-[#C62828] text-white border-2 border-white rounded-[6px] p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-6 h-6 text-white stroke-[2] shrink-0" />
          <p className="text-sm font-bold tracking-wide">
            {t.announcementStrip}
          </p>
        </div>
        <div className="text-xs font-mono font-bold bg-white text-[#C62828] px-3 py-1 rounded-[6px] shrink-0">
          CLINICAL TRIAGE ACTIVE
        </div>
      </div>
    </div>
  );
};
