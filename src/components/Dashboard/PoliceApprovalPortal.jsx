import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Radio, 
  Camera, 
  Clock, 
  MapPin,
  Sliders,
  Check
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function PoliceApprovalPortal({ cases, onUpdateRadius }) {
  const [cctvStreams] = useState([
    {
      id: 'CAM-DL-091',
      location: 'Janpath Metro Station - Concourse Gate 1',
      status: 'MATCH_FLAGGED',
      confidence: 91,
      targetPerson: 'Aarav Sharma (7y, Male)',
      timestamp: '2 mins ago',
      image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'CAM-DL-044',
      location: 'Connaught Place Outer Circle / Barakhamba Rd',
      status: 'SCANNING',
      confidence: 14,
      targetPerson: 'General Surveillance',
      timestamp: 'Active Feed',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'CAM-MUM-118',
      location: 'Juhu Beach Promenade Watchtower 3',
      status: 'MATCH_FLAGGED',
      confidence: 94,
      targetPerson: 'Pooja Deshmukh (9y, Female)',
      timestamp: '12 mins ago',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
    }
  ]);

  const [expandedCaseId, setExpandedCaseId] = useState(null);

  const handleQuickExpand = (caseId, newKm) => {
    sound.playEmergencyAlert();
    if (onUpdateRadius) {
      onUpdateRadius(caseId, newKm);
    }
    setExpandedCaseId(caseId);
    setTimeout(() => setExpandedCaseId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Law Enforcement Command & Verification Console</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono-num font-bold border border-blue-800">
                CCTNS PORTAL
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Terminal ID: DL-ND-CP-04 • Sub-Inspector R. Verma • Authority to expand broadcast radius
            </p>
          </div>
        </div>

        <div className="text-xs text-emerald-400 font-mono-num flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>CONNECTED & AUTHENTICATED</span>
        </div>
      </div>

      {/* CCTV AI Matches */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              CCTV AI Edge Facial Match Feeds
            </h3>
          </div>
          <span className="text-xs font-mono-num text-slate-400">
            1,420 Municipal Cameras Scanned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cctvStreams.map((stream) => (
            <div
              key={stream.id}
              className={`rounded-xl overflow-hidden border p-4 bg-slate-900 flex flex-col justify-between ${
                stream.status === 'MATCH_FLAGGED'
                  ? 'border-red-600/80 bg-red-950/20'
                  : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-num text-slate-400">{stream.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    stream.status === 'MATCH_FLAGGED'
                      ? 'bg-red-900/80 text-red-300 border border-red-700'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {stream.status === 'MATCH_FLAGGED' ? 'AI MATCH FLAGGED' : 'SCANNING'}
                  </span>
                </div>

                <div className="relative h-32 rounded-lg overflow-hidden mb-3 border border-slate-800">
                  <img src={stream.image} alt={stream.location} className="w-full h-full object-cover" />
                  {stream.status === 'MATCH_FLAGGED' && (
                    <span className="absolute bottom-2 right-2 bg-slate-950 text-red-400 text-[10px] font-mono-num px-2 py-0.5 rounded font-bold border border-red-800">
                      {stream.confidence}% MATCH
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-white leading-tight">{stream.location}</div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Target: <strong className="text-white">{stream.targetPerson}</strong>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono-num text-slate-500">{stream.timestamp}</span>
                {stream.status === 'MATCH_FLAGGED' && (
                  <button
                    onClick={() => {
                      sound.playEmergencyAlert();
                      alert(`PCR Van dispatched to ${stream.location}`);
                    }}
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Dispatch PCR
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Authorization & Radius Adjustment Queue */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Emergency Broadcast Management & Range Controls
            </h3>
          </div>
          <span className="text-xs text-blue-400">Police Override Active</span>
        </div>

        <div className="space-y-3">
          {cases.filter(c => c.status !== 'RESOLVED').map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img src={c.photo} alt={c.name} className="w-14 h-14 rounded-lg object-cover border border-slate-700 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{c.name}</h4>
                    <span className="text-xs px-2 py-0.2 rounded bg-slate-800 text-slate-300 font-mono-num">
                      {c.age} yrs • <strong className="text-blue-300 uppercase">{c.gender}</strong>
                    </span>
                    <span className="text-xs font-mono-num font-bold text-slate-300 bg-slate-800 px-2 py-0.2 rounded border border-slate-700">
                      Radius: {c.geoRadiusKm || 5}km
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{c.lastSeenLocation}, {c.city}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono-num mt-0.5">
                    FIR: {c.policeFIR} • Station: {c.policeStation}
                  </div>
                </div>
              </div>

              {/* Police Option: Increase Range Stepper */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold px-2">Expand Range:</span>
                  {[5, 10, 20, 50].map((km) => (
                    <button
                      key={km}
                      onClick={() => handleQuickExpand(c.id, km)}
                      className={`px-2.5 py-1 rounded text-xs font-bold font-mono-num transition-colors cursor-pointer ${
                        c.geoRadiusKm === km
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {km}km
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    sound.playEmergencyAlert();
                    alert(`Emergency cell broadcast refreshed across ${c.geoRadiusKm || 5}km perimeter for ${c.name}`);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Broadcast
                </button>

                {expandedCaseId === c.id && (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Updated!</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
