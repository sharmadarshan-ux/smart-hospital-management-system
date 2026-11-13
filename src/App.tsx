import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { QueueProvider } from './context/QueueContext';
import { NavigationHeader } from './components/NavigationHeader';
import { PatientView } from './screens/PatientView';
import { ReceptionCheckIn } from './screens/ReceptionCheckIn';
import { DoctorDashboard } from './screens/DoctorDashboard';
import { WaitingHallDisplay } from './screens/WaitingHallDisplay';
import { AdminOverview } from './screens/AdminOverview';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDisplayScreen = location.pathname === '/display';

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#14202E] flex flex-col font-sans">
      {!isDisplayScreen && <NavigationHeader />}
      <main className="flex-1">{children}</main>
      {!isDisplayScreen && (
        <footer className="bg-white border-t border-[#D5DCE4] py-4 text-center text-xs text-[#52606F] mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
            <span>
              QueueCare Hospital System • Built for Indian Government & Private Healthcare
            </span>
            <span className="font-mono text-[#0B5CAD] bg-[#E6F0FA] px-2 py-0.5 rounded-[6px] border border-[#0B5CAD]">
              WCAG AA Compliant • Offline LAN Sync Ready
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <QueueProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/patient" replace />} />
              <Route path="/patient" element={<PatientView />} />
              <Route path="/reception" element={<ReceptionCheckIn />} />
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/display" element={<WaitingHallDisplay />} />
              <Route path="/admin" element={<AdminOverview />} />
              <Route path="*" element={<Navigate to="/patient" replace />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </QueueProvider>
    </LanguageProvider>
  );
}

export default App;
