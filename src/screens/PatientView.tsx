import React, { useState } from 'react';
import { Smartphone, CheckCircle, Bell, ArrowRightLeft, MessageSquare } from 'lucide-react';
import { useLiveQueue } from '../context/QueueContext';
import { useLanguage } from '../context/LanguageContext';
import { TokenCard } from '../components/TokenCard';
import { JourneyStepper } from '../components/JourneyStepper';
import { Button } from '../components/Button';

export const PatientView: React.FC = () => {
  const { patients, activePatientId, setActivePatientId, switchDoctorConsent, toggleVirtualQueue } = useLiveQueue();
  const { language, setLanguage, t } = useLanguage();
  const [viewportMode, setViewportMode] = useState<'mobile' | 'responsive'>('mobile');
  const [smsSentNotice, setSmsSentNotice] = useState<string | null>(null);

  const currentPatient = patients.find(p => p.id === activePatientId) || patients[3];

  const handleConsentAccept = () => {
    if (currentPatient.suggestedDoctor) {
      switchDoctorConsent(currentPatient.id, currentPatient.suggestedDoctor.name);
    }
  };

  const handleSmsRequest = () => {
    setSmsSentNotice(`SMS token update dispatched to ${currentPatient.phone}. Check-in confirmed.`);
    setTimeout(() => setSmsSentNotice(null), 5000);
  };

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto">
      <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-[#0B5CAD] stroke-[1.5]" />
          <span className="font-semibold text-[#14202E]">Patient View (Screen A)</span>
          <span className="text-[#52606F] hidden sm:inline">• Target Viewport: 375px Mobile Device</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[#52606F]">Simulate Patient:</span>
          <select
            value={currentPatient.id}
            onChange={(e) => setActivePatientId(e.target.value)}
            className="bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] px-2 py-1 text-xs font-medium focus-ring"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.token} - {p.name} ({p.priority})
              </option>
            ))}
          </select>

          <button
            onClick={() => setViewportMode(viewportMode === 'mobile' ? 'responsive' : 'mobile')}
            className="bg-[#E6F0FA] text-[#0B5CAD] border border-[#0B5CAD] px-2.5 py-1 rounded-[6px] font-semibold hover:bg-[#0B5CAD] hover:text-white transition-qc"
          >
            {viewportMode === 'mobile' ? '375px Mobile View' : 'Full Width View'}
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className={`bg-white border border-[#D5DCE4] rounded-[6px] transition-all duration-200 ${
            viewportMode === 'mobile' ? 'w-[375px] min-h-[667px] shadow-lg p-4' : 'w-full p-6'
          }`}
        >
          <div className="border-b border-[#D5DCE4] pb-3 mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#0B5CAD] uppercase tracking-wider block">
                QueueCare Live Mobile Tracker
              </span>
              <h2 className="text-base font-bold text-[#14202E] leading-tight">
                Government General Hospital
              </h2>
            </div>
            <div className="flex bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] p-0.5 text-[10px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded-[6px] ${language === 'en' ? 'bg-[#0B5CAD] text-white font-bold' : 'text-[#52606F]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-1.5 py-0.5 rounded-[6px] ${language === 'ta' ? 'bg-[#0B5CAD] text-white font-bold' : 'text-[#52606F]'}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 rounded-[6px] ${language === 'hi' ? 'bg-[#0B5CAD] text-white font-bold' : 'text-[#52606F]'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {currentPatient.canSwitchDoctor && currentPatient.suggestedDoctor && (
            <div className="mb-4 bg-[#E6F0FA] border border-[#0B5CAD] rounded-[6px] p-3 text-xs">
              <div className="flex items-start space-x-2">
                <ArrowRightLeft className="w-4 h-4 text-[#0B5CAD] stroke-[1.5] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0B5CAD] font-bold block">{t.switchDoctorPromptTitle}</strong>
                  <p className="text-[#14202E] mt-1 leading-snug">
                    {currentPatient.suggestedDoctor.name} ({currentPatient.suggestedDoctor.roomNo}) has only{' '}
                    <strong>{currentPatient.suggestedDoctor.queueLength} patients waiting</strong> (~
                    {currentPatient.suggestedDoctor.waitMinutes} min wait).
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-col space-y-1.5">
                <Button variant="primary" size="sm" onClick={handleConsentAccept}>
                  {t.acceptSwitch}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => switchDoctorConsent(currentPatient.id, currentPatient.assignedDoctor)}
                >
                  {t.declineSwitch}
                </Button>
              </div>
            </div>
          )}

          <div className="mb-4">
            <TokenCard patient={currentPatient} />
          </div>

          <div className="bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] p-3.5 mb-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-[#0B5CAD] stroke-[1.5]" />
                <span className="font-semibold text-[#14202E]">{t.virtualQueueLabel}</span>
              </div>
              <input
                type="checkbox"
                id="vq-toggle"
                checked={currentPatient.virtualQueueAlert}
                onChange={() => toggleVirtualQueue(currentPatient.id)}
                className="w-4 h-4 text-[#0B5CAD] rounded-[6px] border-[#D5DCE4] focus-ring"
              />
            </div>
            <p className="text-[#52606F] mt-1.5 leading-tight">
              {t.virtualQueueDesc}
            </p>
            {currentPatient.virtualQueueAlert && (
              <div className="mt-2 bg-[#E6F0FA] border border-[#0B5CAD] text-[#0B5CAD] p-2 rounded-[6px] font-medium text-[11px] flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
                <span>Virtual Queue Alert ACTIVE for {currentPatient.phone}</span>
              </div>
            )}
          </div>

          <div className="mb-4">
            <JourneyStepper currentStage={currentPatient.journeyStage} />
          </div>

          <div className="bg-white border border-[#D5DCE4] rounded-[6px] p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#14202E] flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#0B5CAD] stroke-[1.5]" />
                <span>No Smartphone / SMS Access</span>
              </span>
              <span className="text-[10px] bg-[#F5F7FA] text-[#52606F] px-1.5 py-0.5 rounded-[6px] border border-[#D5DCE4]">
                Kiosk & Feature Phone
              </span>
            </div>
            <p className="text-[#52606F] text-[11px] leading-snug">
              Patients without smartphones receive queue updates via SMS or by giving a missed call to{' '}
              <strong className="text-[#14202E] font-mono">1800-425-9000</strong>.
            </p>

            {smsSentNotice && (
              <div className="mt-2 bg-[#E6F0FA] text-[#0B5CAD] border border-[#0B5CAD] p-2 rounded-[6px] text-[11px]">
                {smsSentNotice}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="mt-2.5 w-full text-xs"
              onClick={handleSmsRequest}
            >
              Send SMS Status Update Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
