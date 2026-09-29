import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PlusCircle, 
  Filter, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Radio 
} from 'lucide-react';
import CaseCard from './Dashboard/CaseCard';
import { sound } from '../utils/audio';

export default function NationalBulletinSection({ 
  cases, 
  onViewCaseDetails, 
  onReportSighting, 
  onOpenReportModal,
  userRole,
  onUpdateRadius 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'ALL', label: 'All Active Cases', count: cases.filter(c => c.status !== 'RESOLVED').length },
    { id: 'CHILD', label: 'Children (Kids)', count: cases.filter(c => c.category === 'CHILD' && c.status !== 'RESOLVED').length },
    { id: 'WOMAN', label: 'Women', count: cases.filter(c => c.category === 'WOMAN' && c.status !== 'RESOLVED').length },
    { id: 'MAN', label: 'Men', count: cases.filter(c => c.category === 'MAN' && c.status !== 'RESOLVED').length },
    { id: 'SENIOR', label: 'Elderly / Seniors', count: cases.filter(c => c.category === 'SENIOR' && c.status !== 'RESOLVED').length },
    { id: 'RESOLVED', label: 'Safely Reunited', count: cases.filter(c => c.status === 'RESOLVED').length },
  ];

  const filteredCases = cases.filter(c => {
    // Category filter
    if (activeCategory === 'RESOLVED') {
      if (c.status !== 'RESOLVED') return false;
    } else if (activeCategory !== 'ALL') {
      if (c.category !== activeCategory || c.status === 'RESOLVED') return false;
    } else {
      // For 'ALL', keep active cases at top
      if (c.status === 'RESOLVED') return false;
    }

    // Search filter
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match = c.name.toLowerCase().includes(q) ||
                    c.lastSeenLocation.toLowerCase().includes(q) ||
                    c.city.toLowerCase().includes(q) ||
                    c.gender.toLowerCase().includes(q) ||
                    (c.policeFIR || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <section className="py-8 sm:py-12 bg-[#070b14] border-b border-[#141e30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* BULLETIN HEADER - MATCHING SCREENSHOT 2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#16233b]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-wider text-red-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Priority National Bulletin</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mt-1">
              Active Urgent Missing Cases
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed">
              High-priority alerts verified by police commissionerates. If you have spotted any of these individuals, report an eyewitness sighting immediately.
            </p>
          </div>

          {/* Top Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playEmergencyAlert();
                onOpenReportModal();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(225,29,72,0.35)] cursor-pointer hover:scale-102"
            >
              <span>🚨</span>
              <span>File New Missing Alert</span>
            </button>
          </div>
        </div>

        {/* POLICE BADGE BANNER IF LOGGED IN AS OFFICER */}
        {userRole === 'POLICE' && (
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/50 flex items-center justify-between gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-2 text-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                <strong>Duty Officer Authority Active:</strong> You can expand missing alert perimeter zones (5.5km &rarr; 10km &rarr; 20km &rarr; 50km) on all active notices.
              </span>
            </div>
            <span className="font-mono text-[11px] text-blue-400 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/60">
              CCTNS JURISDICTION
            </span>
          </div>
        )}

        {/* CATEGORY FILTER TABS & SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playRadarPing();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#0f1d33] text-sky-400 border border-[#1e3a5f] shadow-sm'
                      : 'bg-[#0a0f1d] text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-sky-950 text-sky-300 border border-sky-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#090e1a] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* 3-COLUMN CARD GRID - EXACT SCREENSHOT 2 */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredCases.map((caseItem) => (
              <CaseCard
                key={caseItem.id}
                caseItem={caseItem}
                onViewDetails={onViewCaseDetails}
                onReportSighting={onReportSighting}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-[#090e1a]">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <div className="text-white font-bold text-sm">No cases found matching this criteria</div>
            <p className="text-slate-400 text-xs mt-1">Try switching category tabs or clearing search keywords.</p>
          </div>
        )}

      </div>
    </section>
  );
}
