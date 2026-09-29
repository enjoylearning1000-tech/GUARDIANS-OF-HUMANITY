import React from 'react';
import { 
  Home, 
  MapPin, 
  PlusCircle, 
  LayoutDashboard, 
  ShieldCheck, 
  Radio 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function MobileBottomNav({ currentTab, setCurrentTab, onOpenReportModal }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl px-2 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around relative">
        {/* Home */}
        <button
          onClick={() => {
            sound.playRadarPing();
            setCurrentTab('home');
          }}
          className={`flex flex-col items-center p-1.5 rounded-xl transition-colors ${
            currentTab === 'home' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Live Map */}
        <button
          onClick={() => {
            sound.playRadarPing();
            setCurrentTab('map');
          }}
          className={`flex flex-col items-center p-1.5 rounded-xl transition-colors ${
            currentTab === 'map' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Radar Map</span>
        </button>

        {/* Center Floating Emergency Report Button */}
        <div className="-mt-6">
          <button
            onClick={() => {
              sound.playEmergencyAlert();
              onOpenReportModal();
            }}
            data-cursor="alert"
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] border-2 border-red-400 flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <PlusCircle className="w-6 h-6 animate-pulse" />
          </button>
        </div>

        {/* Command Dashboard */}
        <button
          onClick={() => {
            sound.playRadarPing();
            setCurrentTab('dashboard');
          }}
          className={`flex flex-col items-center p-1.5 rounded-xl transition-colors ${
            currentTab === 'dashboard' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Dossiers</span>
        </button>

        {/* Security & Verification */}
        <button
          onClick={() => {
            sound.playRadarPing();
            setCurrentTab('security');
          }}
          className={`flex flex-col items-center p-1.5 rounded-xl transition-colors ${
            currentTab === 'security' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Security</span>
        </button>
      </div>
    </div>
  );
}
