import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Camera, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function ReportSightingModal({ isOpen, onClose, targetCase, onSubmitSighting }) {
  const [witnessName, setWitnessName] = useState('Aakash Patel (Citizen Eye)');
  const [sightingLocation, setSightingLocation] = useState('Near Janpath Metro Station exit gate');
  const [details, setDetails] = useState('I spotted someone closely matching the photo wearing the yellow shirt talking to a station security guard.');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !targetCase) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playRadarPing();
    setIsSubmitting(true);

    setTimeout(() => {
      const newSighting = {
        id: `ST-${Date.now()}`,
        witnessName,
        time: 'Just now',
        location: sightingLocation,
        details,
        verifiedByPolice: false,
        photoEvidence: photoUploaded ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80' : null
      };

      onSubmitSighting(targetCase.id, newSighting);
      setIsSubmitting(false);
      sound.playSuccessChime();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Report Sighting</h2>
              <p className="text-xs text-slate-400">Direct alert to investigating police unit</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Missing Person Preview */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center gap-3">
          <img
            src={targetCase.photo}
            alt={targetCase.name}
            className="w-12 h-12 rounded-xl object-cover border border-red-500/50"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white truncate">{targetCase.name}</span>
              <span className="text-xs text-slate-400 font-mono-num">{targetCase.age}y</span>
            </div>
            <div className="text-xs text-slate-400 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400 shrink-0" />
              <span>Missing from: {targetCase.lastSeenLocation}</span>
            </div>
          </div>
        </div>

        {/* Sighting Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-slate-400 uppercase font-semibold">Your Name / Witness ID *</label>
            <input
              type="text"
              required
              value={witnessName}
              onChange={(e) => setWitnessName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-semibold">Where Did You See Them? *</label>
            <input
              type="text"
              required
              value={sightingLocation}
              onChange={(e) => setSightingLocation(e.target.value)}
              placeholder="Provide exact landmark, platform, or street"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-semibold">Observation Notes & Physical State *</label>
            <textarea
              required
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="What were they wearing? Were they alone or with someone? Direction of movement?"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* Photo Evidence simulator button */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300">
                {photoUploaded ? 'Photo Evidence Attached ✓' : 'Attach Camera Photo / CCTV snapshot'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPhotoUploaded(!photoUploaded)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                photoUploaded ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {photoUploaded ? 'Attached' : '+ Add Photo'}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting Sighting...' : 'Submit Sighting'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
