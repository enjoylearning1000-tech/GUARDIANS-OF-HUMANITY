import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  MapPin, 
  Radio, 
  FileText, 
  Users, 
  ShieldCheck, 
  Settings, 
  Search, 
  Bell, 
  CheckCircle2, 
  Compass
} from 'lucide-react';
import CaseCard from './CaseCard';
import LiveRadarMap from '../LiveRadarMap';
import PoliceApprovalPortal from './PoliceApprovalPortal';
import { sound } from '../../utils/audio';

export default function DashboardView({ 
  cases, 
  stats, 
  onViewCaseDetails, 
  onReportSighting, 
  onOpenReportModal,
  userRole,
  setUserRole,
  userSession,
  onUpdateRadius 
}) {
  const [sidebarTab, setSidebarTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // ALL | CHILD | WOMAN | MAN | SENIOR | RESOLVED
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | CRITICAL
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [trackCaseModalOpen, setTrackCaseModalOpen] = useState(false);
  const [trackCaseInput, setTrackCaseInput] = useState('');
  const [trackCaseResult, setTrackCaseResult] = useState(null);

  const [notifications] = useState([
    { id: 1, text: 'New Sighting: Yellow shirt spotted near Janpath Metro Gate 2', time: '4m ago' },
    { id: 2, text: 'Police verification approved for Case #GOH-2026-0891', time: '12m ago' },
    { id: 3, text: 'Reunited: Child safely recovered in Jaipur market', time: '28m ago' }
  ]);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.lastSeenLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.policeFIR || '').toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === 'CRITICAL' && c.status !== 'CRITICAL_ALERT') return false;

    if (categoryFilter === 'RESOLVED' && c.status !== 'RESOLVED') return false;
    if (categoryFilter !== 'ALL' && categoryFilter !== 'RESOLVED') {
      if (c.category !== categoryFilter) return false;
    }
    return true;
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report-case', label: 'Report Case', icon: PlusCircle, isAction: true },
    { id: 'live-map', label: 'Live Map', icon: MapPin },
    { id: 'my-cases', label: 'My Cases', icon: FileText, count: cases.filter(c => c.status !== 'RESOLVED').length },
    { id: 'community', label: 'Community Reports', icon: Users },
    { id: 'police', label: 'Police Panel', icon: ShieldCheck, badge: userRole === 'POLICE' ? 'OFFICER' : null },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleTrackCaseSubmit = (e) => {
    e.preventDefault();
    sound.playRadarPing();
    const query = trackCaseInput.trim().toLowerCase();
    const found = cases.find(c => 
      c.id.toLowerCase().includes(query) || 
      (c.policeFIR && c.policeFIR.toLowerCase().includes(query)) ||
      c.name.toLowerCase().includes(query)
    );
    setTrackCaseResult(found || 'NOT_FOUND');
  };

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col md:flex-row border-t border-[#141f33]">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#050812] border-r border-[#152033] p-4 flex flex-col justify-between shrink-0">
        <div>
          <div className="px-3 py-2 text-[10px] font-mono-num font-bold text-slate-400 uppercase tracking-wider mb-2">
            Operations Console
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = sidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playRadarPing();
                    if (item.isAction) {
                      onOpenReportModal();
                    } else {
                      setSidebarTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 text-sky-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-6">
            <button
              onClick={() => {
                sound.playEmergencyAlert();
                onOpenReportModal();
              }}
              className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Missing Person</span>
            </button>
          </div>
        </div>

        {/* User Role Card */}
        <div className="pt-4 border-t border-slate-800/80 mt-6">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono-num flex items-center justify-between">
              <span>Active Operator</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="font-bold text-white mt-1">
              {userRole === 'POLICE' ? 'Inspector R. Verma (Duty)' : 'Verified Citizen'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono-num">
              Aadhaar: {userSession?.aadhaarId || '8921-4401-9923'}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Search & Notifications Bar */}
        <div className="h-16 border-b border-[#152033] px-4 sm:px-6 flex items-center justify-between gap-4 bg-[#050812]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, gender, location, or FIR number..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            </button>

            {notificationOpen && (
              <div 
                className="absolute right-4 top-14 w-80 rounded-2xl bg-slate-900 border border-slate-700 p-3.5 z-50 shadow-2xl animate-in fade-in"
                onClick={() => setNotificationOpen(false)}
              >
                <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                  <span>Emergency Dispatch Feed</span>
                  <span className="text-[10px] text-slate-400 font-normal">Real-time</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div>{n.text}</div>
                      <div className="text-[10px] text-sky-400 font-mono-num mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* TAB: Police Panel */}
          {sidebarTab === 'police' && (
            <PoliceApprovalPortal cases={cases} onUpdateRadius={onUpdateRadius} />
          )}

          {/* TAB: Full Live Map */}
          {sidebarTab === 'live-map' && (
            <LiveRadarMap
              cases={cases}
              onSelectCase={onViewCaseDetails}
              onReportSighting={onReportSighting}
            />
          )}

          {/* TAB: Community Reports */}
          {sidebarTab === 'community' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-xl text-white">Community Sighting Submissions</h2>
                  <p className="text-xs text-slate-400">Crowdsourced public eyewitness intelligence feed</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cases.flatMap(c => (c.sightings || []).map(s => ({ ...s, caseName: c.name, casePhoto: c.photo, caseGender: c.gender, caseId: c.id }))).map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={s.casePhoto} alt={s.caseName} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <div className="font-bold text-white text-sm">{s.caseName} ({s.caseGender})</div>
                        <div className="text-[11px] text-slate-400">Witness: {s.witnessName} • {s.time}</div>
                      </div>
                    </div>
                    <div className="text-slate-200 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>{s.location}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{s.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Settings */}
          {sidebarTab === 'settings' && (
            <div className="max-w-xl space-y-4">
              <h2 className="font-display font-bold text-xl text-white">System Settings & Controls</h2>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white text-sm">Emergency Audio Siren</div>
                  <div className="text-slate-400 text-xs mt-0.5">Audible warning tone for critical missing bulletins</div>
                </div>
                <button 
                  onClick={() => sound.toggleMute()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Toggle Audio
                </button>
              </div>
            </div>
          )}

          {/* TAB: Main Dashboard Overview or My Cases */}
          {(sidebarTab === 'dashboard' || sidebarTab === 'my-cases') && (
            <>
              {/* 1. QUICK ACTIONS */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono-num font-bold text-slate-400 uppercase tracking-wider">
                  Main Commands
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      sound.playEmergencyAlert();
                      onOpenReportModal();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.35)]"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Report Missing</span>
                  </button>

                  <button
                    onClick={() => setSidebarTab('live-map')}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <MapPin className="w-4 h-4 text-sky-400" />
                    <span>View Map</span>
                  </button>

                  <button
                    onClick={() => setTrackCaseModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <span>Track Case</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playRadarPing();
                      setStatusFilter(statusFilter === 'CRITICAL' ? 'ALL' : 'CRITICAL');
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      statusFilter === 'CRITICAL'
                        ? 'bg-red-950 border-red-700 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5 text-red-500" />
                    <span>Critical Alert Filter</span>
                  </button>
                </div>
              </div>

              {/* 2. STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-red-500/30 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Active Cases</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
                    {cases.filter(c => c.status === 'CRITICAL_ALERT').length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Under active search perimeter</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Found Today</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
                    {cases.filter(c => c.status === 'RESOLVED').length + 3894}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Safely returned to families</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-sky-500/30 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Alerts Sent</span>
                    <Radio className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
                    {stats.alertsSent || '1,482,900+'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Cell broadcast & SMS push</div>
                </div>
              </div>

              {/* 3. REAL MAP (CENTER FOCUS) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <h3 className="font-display font-bold text-lg text-white">
                      Center Tactical Radar Map
                    </h3>
                    <span className="text-xs text-slate-400 font-mono-num">
                      (Click any marker to open case modal)
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <LiveRadarMap
                    cases={cases}
                    onSelectCase={onViewCaseDetails}
                    onReportSighting={onReportSighting}
                  />
                </div>
              </div>

              {/* 4. CASE CARDS */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      Missing Person Case Files
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verified police FIR reports with eyewitness submission access.
                    </p>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
                    {[
                      { id: 'ALL', label: 'All Cases', count: cases.length },
                      { id: 'CHILD', label: '👶 Kids', count: cases.filter(c => c.category === 'CHILD').length },
                      { id: 'WOMAN', label: '👩 Women', count: cases.filter(c => c.category === 'WOMAN').length },
                      { id: 'MAN', label: '👨 Men', count: cases.filter(c => c.category === 'MAN').length },
                      { id: 'SENIOR', label: '👴 Seniors', count: cases.filter(c => c.category === 'SENIOR').length },
                      { id: 'RESOLVED', label: '✓ Reunited', count: cases.filter(c => c.status === 'RESOLVED').length }
                    ].map((tab) => {
                      const isActive = categoryFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            sound.playRadarPing();
                            setCategoryFilter(tab.id);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white hover:bg-slate-900'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-num ${
                            isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {filteredCases.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCases.map((c) => (
                      <CaseCard
                        key={c.id}
                        caseItem={c}
                        onViewDetails={onViewCaseDetails}
                        onReportSighting={onReportSighting}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                    No cases found matching query or filters.
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </main>

      {/* Track Case Modal */}
      {trackCaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Track Missing Person Case</span>
              </h3>
              <button 
                onClick={() => {
                  setTrackCaseModalOpen(false);
                  setTrackCaseResult(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTrackCaseSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Enter Case ID, FIR, or Name</label>
                <input
                  type="text"
                  required
                  value={trackCaseInput}
                  onChange={(e) => setTrackCaseInput(e.target.value)}
                  placeholder="e.g. GOH-2026-0449 or Aarav"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Search Emergency Telemetry
              </button>
            </form>

            {trackCaseResult === 'NOT_FOUND' && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                No active case file found with that reference. Check the number and retry.
              </div>
            )}

            {trackCaseResult && trackCaseResult !== 'NOT_FOUND' && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <img src={trackCaseResult.photo} alt={trackCaseResult.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div className="font-bold text-white text-sm">{trackCaseResult.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono-num">{trackCaseResult.policeFIR}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTrackCaseModalOpen(false);
                    onViewCaseDetails(trackCaseResult);
                  }}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Open Live Case Dossier
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
