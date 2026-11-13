import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Smartphone,
  UserPlus,
  Stethoscope,
  Tv,
  BarChart3,
  Wifi,
  WifiOff,
  Globe,
  Building2
} from 'lucide-react';
import { useLiveQueue } from '../context/QueueContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBanner } from './StatusBanner';

export const NavigationHeader: React.FC = () => {
  const { isOffline, toggleOffline } = useLiveQueue();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/patient', label: 'Patient View (375px)', icon: <Smartphone className="w-4 h-4 stroke-[1.5]" /> },
    { path: '/reception', label: 'Reception Check-in', icon: <UserPlus className="w-4 h-4 stroke-[1.5]" /> },
    { path: '/doctor', label: 'Doctor Workstation', icon: <Stethoscope className="w-4 h-4 stroke-[1.5]" /> },
    { path: '/display', label: 'Waiting Hall TV (1080p)', icon: <Tv className="w-4 h-4 stroke-[1.5]" /> },
    { path: '/admin', label: 'Admin Overview', icon: <BarChart3 className="w-4 h-4 stroke-[1.5]" /> },
  ];

  return (
    <header className="bg-white border-b border-[#D5DCE4] sticky top-0 z-40">
      {isOffline && <StatusBanner type="offline" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#0B5CAD] text-white flex items-center justify-center font-bold text-lg">
              <Building2 className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <Link to="/patient" className="font-bold text-lg text-[#14202E] tracking-tight hover:text-[#0B5CAD] transition-qc flex items-center space-x-1">
                <span>{t.appName}</span>
                <span className="text-xs bg-[#E6F0FA] text-[#0B5CAD] px-2 py-0.5 rounded-[6px] border border-[#0B5CAD] font-normal tabular-nums">
                  v2.4 LAN
                </span>
              </Link>
              <p className="text-xs text-[#52606F] hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (location.pathname === '/' && link.path === '/patient');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-[6px] text-xs font-semibold transition-qc border ${
                    isActive
                      ? 'bg-[#0B5CAD] text-white border-[#0B5CAD]'
                      : 'text-[#52606F] border-transparent hover:bg-[#F5F7FA] hover:text-[#0B5CAD]'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-[#F5F7FA] border border-[#D5DCE4] rounded-[6px] p-0.5 text-xs font-medium">
              <Globe className="w-3.5 h-3.5 text-[#52606F] ml-1.5 mr-1 stroke-[1.5]" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-[6px] transition-qc ${
                  language === 'en' ? 'bg-[#0B5CAD] text-white font-bold' : 'text-[#52606F] hover:text-[#14202E]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2 py-1 rounded-[6px] transition-qc ${
                  language === 'ta' ? 'bg-[#0B5CAD] text-white font-bold' : 'text-[#52606F] hover:text-[#14202E]'
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-[6px] transition-qc ${
                  language === 'hi' ? 'bg-[#0B5CAD] text-white font-bold' : 'text-[#52606F] hover:text-[#14202E]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={toggleOffline}
              title="Toggle LAN Connection State"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-[6px] text-xs font-semibold border transition-qc min-h-[36px] ${
                isOffline
                  ? 'bg-[#FDECEC] text-[#C62828] border-[#C62828]'
                  : 'bg-[#E6F0FA] text-[#0B5CAD] border-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-4 h-4 stroke-[1.5]" />
                  <span className="hidden md:inline">LAN Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 stroke-[1.5]" />
                  <span className="hidden md:inline">LAN Sync Live</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:hidden flex items-center overflow-x-auto py-2 space-x-1 border-t border-[#D5DCE4]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (location.pathname === '/' && link.path === '/patient');
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-[6px] text-xs font-semibold shrink-0 border ${
                  isActive
                    ? 'bg-[#0B5CAD] text-white border-[#0B5CAD]'
                    : 'text-[#52606F] border-[#D5DCE4] bg-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
