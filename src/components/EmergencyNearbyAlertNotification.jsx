import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Eye, 
  ShieldAlert, 
  Navigation, 
  Radio, 
  ChevronRight 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function EmergencyNearbyAlertNotification({ 
  alertCase, 
  onClose, 
  onViewDetails, 
  onReportSighting 
}) {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!alertCase) return;
    sound.playEmergencyAlert();

    // 12-second auto-dismiss with animated progress bar
    const duration = 12000;
    const intervalTime = 100;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - step;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [alertCase, isPaused]);

  if (!alertCase) return null;

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 pointer-events-auto transition-all duration-300 ease-out animate-shake"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-cursor="alert"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#170509]/95 via-[#1a080d]/95 to-[#0b101e]/95 border-2 border-red-500/80 shadow-[0_12px_45px_rgba(239,68,68,0.35)] backdrop-blur-xl">
        
        {/* Subtle red pulsing ambient background light */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Strip */}
        <div className="px-4 py-2 bg-red-950/70 border-b border-red-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-5" />
            <span className="text-xs font-black tracking-wider text-red-400 uppercase flex items-center gap-1.5">
              <span>🚨 MISSING PERSON NEARBY</span>
            </span>
            <span className="text-[10px] font-mono-num font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              1.2 KM AWAY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono-num hidden sm:inline">
              Auto-dismissing in {Math.ceil((progress / 100) * 12)}s
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-red-900/50 transition-colors cursor-pointer"
              title="Dismiss Alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-4 flex items-center gap-4">
          {/* Missing Person Thumbnail with Red Border */}
          <div 
            onClick={() => onViewDetails(alertCase)}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-red-500 shrink-0 bg-slate-900 cursor-pointer group"
          >
            <img 
              src={alertCase.photo} 
              alt={alertCase.name} 
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-red-600/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 
                onClick={() => onViewDetails(alertCase)}
                className="text-base sm:text-lg font-display font-extrabold text-white truncate cursor-pointer hover:text-red-300 transition-colors"
              >
                {alertCase.name}
              </h4>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-200 font-mono-num">
                {alertCase.age}y · {alertCase.gender}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-600/80 text-white">
                Golden Hour
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="truncate"><strong>Last Seen:</strong> {alertCase.lastSeenLocation}</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5 font-mono-num">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{alertCase.lastSeenTime}</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-300 truncate">
                {alertCase.policeStation || 'Delhi Police'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-3.5 pt-1 flex items-center justify-between gap-2.5">
          <button
            onClick={() => onReportSighting(alertCase)}
            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>I Saw This Person</span>
          </button>

          <button
            onClick={() => onViewDetails(alertCase)}
            className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar (Auto-Dismiss) */}
        <div className="w-full bg-slate-900 h-1 overflow-hidden">
          <div 
            className="bg-red-500 h-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
}
