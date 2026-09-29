import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Radio, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  ShieldCheck, 
  UserCheck, 
  Menu, 
  X, 
  LogOut,
  Fingerprint
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  setUserRole, 
  userSession,
  onLogout,
  onOpenReportModal, 
  triggerTestAlert 
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playRadarPing();
    }
  };

  const roles = [
    { id: 'CITIZEN', label: 'Citizen', icon: UserCheck, desc: 'Public report & sighting' },
    { id: 'POLICE', label: 'Police Officer', icon: ShieldCheck, desc: 'Case approval & range expand' },
    { id: 'VOLUNTEER', label: 'NGO / Volunteer', icon: UserCheck, desc: 'Search responder' }
  ];

  const navLinks = [
    { id: 'map', label: 'Live Radar' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'home', label: 'Active Alerts', badge: '3' },
    { id: 'dashboard', label: 'Command Center' },
    { id: 'security', label: 'Aadhaar & Security' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#151f32] bg-[#070b14]/95 backdrop-blur-md transition-all">
      {/* Top Status Strip */}
      <div className="bg-[#050811] border-b border-slate-800/80 px-4 py-1 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-semibold text-slate-300 font-mono-num shrink-0 text-[11px] uppercase tracking-wider">
            NATIONAL EMERGENCY NETWORK 112:
          </span>
          <span className="text-slate-400 truncate text-[11px]">
            Real-time multi-jurisdiction missing person response grid active
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-2">
          {userSession?.aadhaarId && (
            <span className="text-[11px] text-slate-400 font-mono-num flex items-center gap-1 hidden sm:inline">
              <Fingerprint className="w-3 h-3 text-blue-400" />
              <span>Aadhaar: ****-****-{userSession.aadhaarId.slice(-4)}</span>
            </span>
          )}
          <button 
            onClick={triggerTestAlert}
            className="text-[11px] font-bold text-slate-200 hover:text-white px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
            title="Pop up active emergency missing alert"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Simulate Emergency Alert</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          {/* Logo & Brand Name - Matching Screenshot 2 with red glowing dot */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center relative shadow-[0_0_12px_rgba(239,68,68,0.35)]">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg text-white tracking-tight">
                  Guardians
                </span>
                <span className="font-display font-medium text-lg text-slate-300 tracking-tight">
                  of Humanity
                </span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono-num">
                National Missing Persons Alert
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#0f1d33] border border-[#1e3a5f]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-600 text-white font-mono shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/90 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-900 text-slate-200 cursor-pointer"
              >
                {userRole === 'POLICE' ? <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> : <UserCheck className="w-3.5 h-3.5 text-slate-400" />}
                <span>{roles.find(r => r.id === userRole)?.label}</span>
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-xl p-1.5 z-50"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setUserRole(r.id)}
                      className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 text-xs transition-colors cursor-pointer ${
                        userRole === r.id ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <r.icon className="w-4 h-4 text-blue-400" />
                      <div>
                        <div>{r.label}</div>
                        <div className="text-[10px] text-slate-500">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Report Button - Bright Red matching Screenshot 2 */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs bg-[#e11d48] hover:bg-[#be123c] text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(225,29,72,0.35)]"
            >
              <span>🚨</span>
              <span>Report Missing Person</span>
            </button>

            {/* Logout / Switch Session */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer"
                title="Log Out / Switch Aadhaar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenReportModal}
              className="p-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Report
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-left text-xs ${
                  currentTab === link.id
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-400">Role:</span>
            <div className="flex gap-1">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setUserRole(r.id)}
                  className={`px-2 py-1 rounded text-xs ${
                    userRole === r.id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-xs text-red-400 underline ml-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
