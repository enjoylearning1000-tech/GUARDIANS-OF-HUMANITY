import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Radio, 
  Check, 
  Eye, 
  AlertTriangle,
  SlidersHorizontal,
  Share2,
  Building2,
  Users,
  Camera
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function EmergencyAlertPopup({ 
  alertCase, 
  onClose, 
  onViewDetails, 
  onReportSighting, 
  userRole, 
  onUpdateRadius 
}) {
  // Pre-configured authentic child profiles with full-face passport photos
  const childPresets = {
    boy: {
      id: "GOH-2026-0449",
      name: "Aarav Sharma",
      age: 8,
      gender: "Male",
      childType: "Boy",
      priorityLabel: "Critical Priority",
      // Full frontal passport photo showing entire head, face, ears, and shoulders
      photo: "/images/aarav_sharma.png",
      policeFIR: "FIR #449/2026",
      policeStation: "Tilak Marg / India Gate Police Station",
      lastSeenLocation: "Near Children Park, India Gate Circle, Central Delhi",
      city: "New Delhi",
      lastSeenTime: "Today, 03:15 PM (1h 14m ago)",
      clothing: "Bright yellow collared polo t-shirt, dark blue denim shorts, white Adidas sneakers with red stripes",
      schoolInfo: "Tilak Marg Primary Wing (Class 3)",
      guardian: "Smt. Neha Sharma (Mother - Aadhaar Verified)",
      geoRadiusKm: alertCase?.geoRadiusKm || 5.5,
      alertsDispatched: 42800,
      protocol: "POCSO & Golden Hour Child Emergency Grid"
    },
    girl: {
      id: "GOH-2026-0879",
      name: "Pooja Deshmukh",
      age: 9,
      gender: "Female",
      childType: "Girl",
      priorityLabel: "Critical Priority",
      // Full frontal passport photo showing entire head, face, ears, and shoulders
      photo: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80",
      policeFIR: "FIR #4512/2026",
      policeStation: "Santacruz Police Station, Mumbai",
      lastSeenLocation: "Juhu Beach Promenade near Shivaji Statue",
      city: "Mumbai",
      lastSeenTime: "Today, 05:30 PM (2h 15m ago)",
      clothing: "Pink floral sundress, yellow hairband, white sandals, cartoon water flask",
      schoolInfo: "Santacruz Vidya Mandir (Class 4)",
      guardian: "Shri Santosh Deshmukh (Father - Aadhaar Verified)",
      geoRadiusKm: 6.0,
      alertsDispatched: 61400,
      protocol: "POCSO & Coastal Beach Patrol Alert Grid"
    }
  };

  const initialChildKey = alertCase?.gender?.toLowerCase() === 'female' && alertCase?.category === 'CHILD' ? 'girl' : 'boy';
  const [selectedChildKey, setSelectedChildKey] = useState(initialChildKey);

  const activeChild = childPresets[selectedChildKey] || childPresets.boy;
  const [selectedRadius, setSelectedRadius] = useState(activeChild.geoRadiusKm || 5.5);
  const [justUpdated, setJustUpdated] = useState(false);

  const radiusPresets = [5.5, 10, 20, 50];

  const handleSwitchChild = (key) => {
    sound.playRadarPing();
    setSelectedChildKey(key);
    setSelectedRadius(childPresets[key].geoRadiusKm);
    setJustUpdated(false);
  };

  const handleApplyRadius = (newKm) => {
    sound.playEmergencyAlert();
    setSelectedRadius(newKm);
    if (onUpdateRadius) {
      onUpdateRadius(activeChild.id, newKm);
    }
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 2400);
  };

  const handleShare = () => {
    sound.playRadarPing();
    const shareText = `URGENT MISSING CHILD NOTICE: ${activeChild.name} (${activeChild.age}y, ${activeChild.gender} - ${activeChild.childType}). Last seen: ${activeChild.lastSeenLocation}. Clothing: ${activeChild.clothing}. FIR: ${activeChild.policeFIR}. Report sightings immediately on Guardians emergency network.`;
    if (navigator.share) {
      navigator.share({ title: `CHILD ALERT: ${activeChild.name}`, text: shareText, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareText);
      alert('Child emergency alert details copied to clipboard.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c1527] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
              <span>PRIORITY MISSING CHILD ALERT (AMBER BULLETIN)</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono-num text-slate-400 border-l border-slate-700 pl-2.5">
              {activeChild.policeFIR}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share Child Alert"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Acknowledge & Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Child Toggle: Boy or Girl */}
        <div className="bg-[#09101f] px-5 py-2 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-slate-300 text-[11px] font-semibold flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <span>Full Passport Photo Switcher:</span>
          </span>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleSwitchChild('boy')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChildKey === 'boy'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>👦 Boy: Aarav (8y)</span>
            </button>
            <button
              onClick={() => handleSwitchChild('girl')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChildKey === 'girl'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>👧 Girl: Pooja (9y)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            
            {/* CLEAN OFFICIAL PASSPORT PHOTO FRAME (Full face, head, and shoulders completely visible, no face-obscuring overlays) */}
            <div className="w-full sm:w-44 shrink-0 flex flex-col items-center">
              <div className="w-40 sm:w-full h-56 rounded-xl overflow-hidden bg-slate-950 border-2 border-slate-500 shadow-xl relative p-1">
                <img
                  src={activeChild.photo}
                  alt={activeChild.name}
                  className="w-full h-full object-cover object-top rounded-lg"
                />
              </div>
              <div className="mt-2 text-center w-full">
                <span className="text-[10px] font-mono-num font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 block uppercase">
                  Full Passport Photograph
                </span>
                <span className="text-[10px] text-blue-300 font-semibold block mt-0.5">
                  Verified: {activeChild.childType} ({activeChild.gender})
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2.5">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                    {activeChild.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 font-bold font-mono-num">
                    {activeChild.age} Years Old · {activeChild.childType}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold uppercase">
                    {activeChild.gender}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-900 font-bold uppercase">
                    {activeChild.priorityLabel}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Last Seen:</strong> {activeChild.lastSeenLocation}, {activeChild.city}</span>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono-num">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{activeChild.lastSeenTime}</span>
                </div>
              </div>

              {/* Clothing Details */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Clothing & Physical Appearance:
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {activeChild.clothing}
                </p>
              </div>

              {/* School & Guardian Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate"><strong>School:</strong> {activeChild.schoolInfo}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate"><strong>Guardian:</strong> {activeChild.guardian}</span>
                </div>
              </div>
            </div>
          </div>

          {/* POLICE OFFICER RANGE EXPANSION OPTION */}
          {userRole === 'POLICE' ? (
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">
                    Police Authority: Expand Child Alert Range
                  </span>
                </div>
                <span className="text-xs font-mono-num font-bold text-blue-300">
                  {selectedRadius} km Active Perimeter
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug">
                Expand cell broadcast radius across local school transit, metro stations, and highway checkposts:
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {radiusPresets.map((km) => (
                  <button
                    key={km}
                    type="button"
                    onClick={() => handleApplyRadius(km)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono-num transition-all cursor-pointer ${
                      selectedRadius === km
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {km} km
                  </button>
                ))}

                {justUpdated && (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5 pl-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Broadcast perimeter expanded to {selectedRadius}km!</span>
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span>Child Safety Radar: <strong className="text-white">{selectedRadius} km</strong> perimeter monitored by Commissionerate</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono-num">
                {activeChild.policeFIR}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>POCSO Amber Search Protocol • Delhi Police Commissionerate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                if (onViewDetails) onViewDetails(activeChild);
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Dossier</span>
            </button>

            <button
              onClick={() => {
                onClose();
                if (onReportSighting) onReportSighting(activeChild);
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Report Sighting</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
