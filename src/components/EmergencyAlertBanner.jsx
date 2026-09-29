import React, { useState } from 'react';
import { Clock, MapPin, Eye, X, Radio, ShieldCheck, Check, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function EmergencyAlertBanner({ alertCase, onSelectCase, onDismiss, userRole, onUpdateRadius }) {
  const [justUpdated, setJustUpdated] = useState(false);

  if (!alertCase) return null;

  const radiusPresets = [5.5, 10, 20, 50];

  const handleSelectRadius = (newKm) => {
    sound.playEmergencyAlert();
    if (onUpdateRadius) {
      onUpdateRadius(alertCase.id, newKm);
    }
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 2000);
  };

  return (
    <aside aria-label="Hyperlocal emergency broadcast" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 z-30">
      <div className="bg-[#120a10]/95 backdrop-blur-md border border-red-900/70 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.45)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Red Alert Bell + Case Quick Info */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500 shrink-0 text-xl shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            🚨
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-wider text-red-500 uppercase">
                🚨 HYPERLOCAL EMERGENCY ALERT
              </span>
              <span className="text-xs font-mono text-slate-400">
                Within {alertCase.geoRadiusKm || 5.5} km
              </span>
            </div>

            <div className="text-white font-bold text-sm sm:text-base mt-0.5">
              {alertCase.name}, {alertCase.age} yrs · Missing from {alertCase.city || 'New Delhi'}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{alertCase.lastSeenLocation}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{alertCase.lastSeenTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right: POLICE-EXCLUSIVE RANGE EXPANDER & ACTION BUTTONS */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {userRole === 'POLICE' && (
            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-blue-500/40 px-2.5 py-1.5 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 text-xs text-blue-300 font-semibold pr-1 border-r border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Officer Range:</span>
              </div>

              <div className="flex items-center gap-1">
                {radiusPresets.map((km) => (
                  <button
                    key={km}
                    type="button"
                    onClick={() => handleSelectRadius(km)}
                    className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono transition-colors cursor-pointer ${
                      alertCase.geoRadiusKm === km
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                    }`}
                    title={`Expand alert perimeter to ${km} km`}
                  >
                    {km}km
                  </button>
                ))}
              </div>

              {justUpdated && (
                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5 pl-1">
                  <Check className="w-3 h-3" />
                  <span className="hidden sm:inline">Updated</span>
                </span>
              )}
            </div>
          )}

          {/* View Case & Photo Button - Bright Red matching Screenshot 2 */}
          <button
            onClick={() => onSelectCase(alertCase)}
            className="px-4 py-2 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(225,29,72,0.35)] hover:scale-102 cursor-pointer"
          >
            <span>View Case & Photo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
