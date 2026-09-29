import React from 'react';
import { 
  Clock, 
  MapPin, 
  Eye, 
  CheckCircle2,
  Radio
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function CaseCard({ caseItem, onViewDetails, onReportSighting }) {
  const isResolved = caseItem.status === 'RESOLVED';
  const isCritical = caseItem.priorityLabel === 'Critical Priority' || 
                     caseItem.urgencyLevel === 'HIGH_RED' || 
                     caseItem.status === 'CRITICAL_ALERT';

  return (
    <div 
      onClick={() => onViewDetails(caseItem)}
      className="rounded-2xl overflow-hidden border border-[#182338] bg-[#0c1220] hover:border-[#22395d] transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
    >
      <div>
        {/* FULL PASSPORT-STYLE PHOTO WITH SCREENSHOT 2 BADGES */}
        <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-[#060a14]">
          <img
            src={caseItem.photo}
            alt={caseItem.name}
            className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
          />

          {/* Top-left Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap z-10">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1 ${
              isResolved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#dc2626] text-white'
            }`}>
              <span>{isResolved ? '✓ Case Reunited' : '🚨 Active Search'}</span>
            </span>

            {isCritical && !isResolved && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#f59e0b] text-slate-950 uppercase shadow-md">
                Critical Priority
              </span>
            )}
          </div>

          {/* Bottom-right Radius Badge */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-black/75 backdrop-blur text-slate-200 border border-white/10 shadow-md flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-red-400 animate-pulse" />
              <span>Radius: {caseItem.geoRadiusKm || 5.5} km</span>
            </span>
          </div>
        </div>

        {/* DETAILS BODY - MATCHING SCREENSHOT 2 */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Row 1: Name and FIR */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-white font-bold text-lg sm:text-xl leading-snug group-hover:text-sky-400 transition-colors">
                {caseItem.name}
              </h3>
              <div className="text-xs text-slate-400 font-semibold mt-0.5">
                {caseItem.age} Years Old · {caseItem.gender}
              </div>
            </div>

            <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/80 text-sky-400 shrink-0 shadow-sm">
              {caseItem.policeFIR || 'FIR Pending'}
            </span>
          </div>

          {/* Row 2: Location */}
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
            <span className="leading-snug font-medium line-clamp-1">
              {caseItem.lastSeenLocation}
            </span>
          </div>

          {/* Row 3: Time */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{caseItem.lastSeenTime}</span>
          </div>

          {/* Row 4: Full Clothing Description Box */}
          <div className="p-3 rounded-xl bg-[#070c17] border border-slate-800 text-xs leading-relaxed">
            <p className="text-slate-300 text-[11px] line-clamp-2">
              <strong className="text-white font-semibold">Clothing: </strong>
              {caseItem.clothing || caseItem.description}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION FOOTER BUTTONS - MATCHING SCREENSHOT 2 */}
      <div className="p-4 sm:p-5 pt-0 flex items-center gap-2.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(caseItem);
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#0f1d33] hover:bg-[#162947] text-[#38bdf8] border border-[#1e3a5f] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>View Details</span>
        </button>

        {isResolved ? (
          <button
            disabled
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-default"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Case Solved</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReportSighting(caseItem);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Report Sighting</span>
          </button>
        )}
      </div>
    </div>
  );
}
