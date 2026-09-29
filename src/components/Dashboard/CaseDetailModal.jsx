import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Radio, 
  Check, 
  Share2, 
  FileText,
  AlertTriangle,
  PhoneCall,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function CaseDetailModal({ 
  caseItem, 
  onClose, 
  onReportSighting, 
  onOpenPoster, 
  onMarkReunited,
  userRole,
  onUpdateRadius 
}) {
  const [selectedRadius, setSelectedRadius] = useState(caseItem?.geoRadiusKm || 5.5);
  const [radiusSuccessMsg, setRadiusSuccessMsg] = useState(false);

  if (!caseItem) return null;

  const isResolved = caseItem.status === 'RESOLVED';
  const radiusPresets = [5.5, 10, 20, 50];

  const handleApplyRadius = (newKm) => {
    sound.playEmergencyAlert();
    setSelectedRadius(newKm);
    if (onUpdateRadius) {
      onUpdateRadius(caseItem.id, newKm);
    }
    setRadiusSuccessMsg(true);
    setTimeout(() => setRadiusSuccessMsg(false), 2400);
  };

  const handleShare = () => {
    sound.playRadarPing();
    const shareText = `🚨 ACTIVE NATIONAL EMERGENCY: ${caseItem.name} (${caseItem.age} Years Old · ${caseItem.gender}). Last seen at ${caseItem.lastSeenLocation}. Clothing: ${caseItem.clothing || caseItem.description}. Case Ref: ${caseItem.caseRef || caseItem.policeFIR}. Report sightings immediately on Guardians emergency network.`;
    if (navigator.share) {
      navigator.share({ title: `MISSING: ${caseItem.name}`, text: shareText, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareText);
      alert('Case emergency details copied to clipboard.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#090f1d] border border-[#1b2b48] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* HEADER BAR - MATCHING SCREENSHOT 3 */}
        <div className="px-5 py-4 border-b border-[#16233b] bg-[#070b16] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
              isResolved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#dc2626] text-white'
            }`}>
              <span>{isResolved ? '✓ CASE REUNITED' : '🚨 ACTIVE NATIONAL EMERGENCY'}</span>
            </span>

            <span className="text-xs font-mono font-semibold text-slate-300">
              Case Ref: <strong className="text-sky-400">{caseItem.caseRef || caseItem.policeFIR || 'DL-POL-2026-0892'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-[#111c30] hover:bg-[#1a2b49] text-slate-300 hover:text-white border border-[#213559] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share Case"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => onOpenPoster(caseItem)}
              className="px-3 py-1.5 rounded-lg bg-[#111c30] hover:bg-[#1a2b49] text-slate-300 hover:text-white border border-[#213559] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Wanted Notice"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Wanted Notice</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#111c30] hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE 2-COLUMN BODY */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: FULL PASSPORT PHOTO (MATCHING SCREENSHOT 3) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 relative shadow-2xl">
                <img
                  src={caseItem.photo}
                  alt={caseItem.name}
                  className="w-full h-80 sm:h-96 object-cover object-top"
                />

                {/* Bottom Overlay with Name and Age */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10 text-left">
                  <div className="font-display font-black text-xl sm:text-2xl text-white tracking-wide uppercase">
                    {caseItem.name}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold mt-0.5">
                    Age: {caseItem.age} Years · Gender: {caseItem.gender}
                  </div>
                </div>
              </div>

              {/* UIDAI Aadhaar Verification Badge */}
              <div className="mt-3 w-full p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs text-center font-mono flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UIDAI Aadhaar Verified · CCTNS Integrated</span>
              </div>

              {/* Broadcast Telemetry */}
              <div className="mt-2.5 w-full p-3 rounded-xl bg-[#060a13] border border-slate-800 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Geo-fence Radius:</span>
                  <strong className="text-red-400 font-bold">{caseItem.geoRadiusKm || 5.5} km active</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Alerts Dispatched:</span>
                  <strong className="text-slate-200">{(caseItem.alertsDispatched || 42800).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Police Station:</span>
                  <strong className="text-sky-300 truncate max-w-[180px]">{caseItem.policeStation}</strong>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CASE DETAILS & IDENTIFIERS */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Header subtitle / Location tag */}
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400">
                <span>{caseItem.city || 'New Delhi'}, India</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                  <span>Geo-fence: {caseItem.geoRadiusKm || 5.5} km active</span>
                </span>
              </div>

              {/* Section 1: LAST SEEN OCCURRENCE */}
              <div className="p-3.5 rounded-xl bg-[#070c17] border border-[#16233b] space-y-1.5">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Last Seen Occurrence
                </div>
                <div className="flex items-start gap-2 text-xs text-white font-semibold">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{caseItem.lastSeenLocation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{caseItem.lastSeenTime}</span>
                </div>
              </div>

              {/* Section 2: PHYSICAL CHARACTERISTICS & IDENTIFIERS */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Physical Characteristics & Identifiers
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#070c17] border border-[#16233b]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Height</span>
                    <strong className="text-white text-xs font-semibold mt-0.5 block">
                      {caseItem.physicalTraits?.height || "4'1\" (124 cm)"}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070c17] border border-[#16233b]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Build</span>
                    <strong className="text-white text-xs font-semibold mt-0.5 block">
                      {caseItem.physicalTraits?.complexion || "Slender, Fair"}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070c17] border border-[#16233b]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Marks</span>
                    <strong className="text-white text-xs font-semibold mt-0.5 block truncate" title={caseItem.physicalTraits?.distinguishingMarks}>
                      {caseItem.physicalTraits?.distinguishingMarks || "Small birthmark"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Section 3: AMBER CLOTHING BOX (MATCHING SCREENSHOT 3) */}
              <div className="p-4 rounded-xl bg-[#241705] border border-amber-600/60 text-amber-200 space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Last Known Attire & Belongings
                </div>
                <p className="text-xs leading-relaxed text-amber-100 font-medium">
                  {caseItem.clothing || caseItem.description}
                </p>
              </div>

              {/* Section 4: DARK RED URGENT MEDICAL WARNING (MATCHING SCREENSHOT 3) */}
              <div className="p-4 rounded-xl bg-[#260c10] border border-red-700/70 text-red-200 space-y-1">
                <div className="text-[10px] uppercase font-black tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Urgent Medical Warning</span>
                </div>
                <p className="text-xs leading-relaxed text-red-100 font-medium">
                  {caseItem.physicalTraits?.medicalWarning || 
                   (caseItem.category === 'SENIOR' 
                     ? "Early-stage dementia / disorientation. Requires essential blood pressure medication." 
                     : "Mild asthma, carries inhaler in small blue sling bag. May require medical assistance if distressed.")}
                </p>
              </div>

              {/* Section 5: POLICE EXCLUSIVE AUTHORITY - INCREASE ALERT RANGE */}
              {userRole === 'POLICE' && !isResolved && (
                <div className="p-4 rounded-xl bg-[#0c1a33] border border-blue-500/60 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      Police Authority: Increase Alert Broadcast Range
                    </span>
                    <span className="text-sky-300 font-mono font-bold">
                      {selectedRadius} km active
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug">
                    Expand cellular broadcast radius & digital signs across transit routes:
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {radiusPresets.map((km) => (
                      <button
                        key={km}
                        type="button"
                        onClick={() => handleApplyRadius(km)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          selectedRadius === km
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                        }`}
                      >
                        {km} km
                      </button>
                    ))}
                  </div>

                  {radiusSuccessMsg && (
                    <div className="p-2 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Alert radius expanded to {selectedRadius} km! Cell broadcast dispatched.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Police Station & Investigating Officer */}
              <div className="p-3 rounded-xl bg-[#070c17] border border-slate-800 text-xs flex items-center justify-between text-slate-300 font-medium">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Investigating Officer</span>
                  <span className="text-white font-semibold">{caseItem.investigatingOfficer}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Jurisdiction</span>
                  <span className="text-sky-400 font-mono">{caseItem.policeFIR}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER BAR - MATCHING SCREENSHOT 3 */}
        <div className="px-5 py-4 border-t border-[#16233b] bg-[#070b16] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Emergency Helpline: <strong className="text-white font-mono">112</strong> · Anti-Fraud Protected</span>
          </div>

          <div className="flex items-center gap-2">
            {!isResolved ? (
              <button
                onClick={() => {
                  onClose();
                  onReportSighting(caseItem);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(225,29,72,0.35)] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Seen This Person? Report Sighting</span>
              </button>
            ) : (
              <button
                disabled
                className="px-5 py-2.5 rounded-xl bg-emerald-950 text-emerald-400 font-bold text-xs flex items-center gap-2 cursor-default border border-emerald-800"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Person Safely Recovered</span>
              </button>
            )}

            {userRole === 'POLICE' && !isResolved && (
              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onMarkReunited(caseItem.id);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Reunited</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#111c30] hover:bg-[#1a2b49] text-slate-300 hover:text-white border border-[#213559] text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
