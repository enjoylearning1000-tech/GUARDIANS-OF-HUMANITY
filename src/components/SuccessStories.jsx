import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Users 
} from 'lucide-react';
import { SUCCESS_STORIES } from '../data/mockData';
import { sound } from '../utils/audio';

export default function SuccessStories() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = SUCCESS_STORIES[currentIdx];

  return (
    <section className="py-16 bg-[#070b14] border-b border-[#141e30]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
            Reuniting Families · Proof of Impact
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            From Hopelessness to Warm Embrace
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            When communities unite with smart emergency technology, the impossible becomes possible. Read the verified stories of lives recovered in record time.
          </p>
        </div>

        {/* Big Success Story Card - Matching Screenshot 1 */}
        <div className="rounded-2xl border border-[#1b2b48] bg-[#0c1220] p-6 sm:p-8 shadow-2xl">
          {/* Top Bar with Case Status & Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#16233b] mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-md bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-700/60 flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{current.caseNumber}</span>
              </span>

              <span className="text-xs font-semibold text-slate-300">
                {current.city}
              </span>

              <span className="text-slate-600 hidden sm:inline">•</span>

              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                <Clock className="w-3 h-3" />
                <span>Reunited in {current.timeToFind}</span>
              </span>

              <span className="text-xs font-mono text-sky-300 flex items-center gap-1 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/40">
                <Users className="w-3 h-3" />
                <span>{current.nearbyAlerts}</span>
              </span>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setCurrentIdx((prev) => (prev > 0 ? prev - 1 : SUCCESS_STORIES.length - 1));
                  sound.playRadarPing();
                }}
                className="p-2 rounded-lg bg-[#111c30] hover:bg-[#1a2b49] text-slate-300 hover:text-white border border-[#213559] transition-colors cursor-pointer"
                title="Previous Case"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400 px-2">
                {currentIdx + 1} / {SUCCESS_STORIES.length}
              </span>
              <button
                onClick={() => {
                  setCurrentIdx((prev) => (prev < SUCCESS_STORIES.length - 1 ? prev + 1 : 0));
                  sound.playRadarPing();
                }}
                className="p-2 rounded-lg bg-[#111c30] hover:bg-[#1a2b49] text-slate-300 hover:text-white border border-[#213559] transition-colors cursor-pointer"
                title="Next Case"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Details Row: Photo + Quote */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Authentic Reunion Photograph */}
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 relative shadow-xl">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-72 sm:h-80 object-cover object-center"
                />
                
                {/* Verified safe badge */}
                <div className="absolute top-3 right-3 bg-emerald-950/90 backdrop-blur border border-emerald-500/50 px-2.5 py-1 rounded-md text-emerald-300 text-xs font-bold shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Safe Reunion</span>
                </div>

                {/* Bottom person label */}
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur px-3 py-1.5 rounded-xl text-white text-xs font-mono flex items-center justify-between border border-slate-800">
                  <span className="font-bold">{current.name}</span>
                  <span className="text-sky-300">{current.age} yrs · {current.gender}</span>
                </div>
              </div>
            </div>

            {/* Right: Big Impact Quote & Attribution (Screenshot 1) */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-snug">
                  {current.headline}
                </h3>
              </div>

              {/* Styled Quote Box with cyan accent */}
              <div className="border-l-4 border-sky-400 bg-[#070c17] p-4 sm:p-5 rounded-r-xl border border-y-slate-800/80 border-r-slate-800/80 space-y-2">
                <Quote className="w-5 h-5 text-sky-400/60" />
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  {current.story}
                </p>
              </div>

              {/* Verified Attribution */}
              <div className="p-3.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>{current.attribution}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {current.attributionTitle}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/50">
                  ✓ Case Closed & Verified
                </div>
              </div>
            </div>
          </div>

          {/* Quick switcher preview tabs */}
          <div className="mt-8 pt-5 border-t border-[#16233b] grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SUCCESS_STORIES.map((story, i) => (
              <button
                key={story.id}
                onClick={() => {
                  setCurrentIdx(i);
                  sound.playRadarPing();
                }}
                className={`p-3 rounded-xl text-left text-xs transition-all cursor-pointer ${
                  currentIdx === i
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-[#070c17] text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800'
                }`}
              >
                <div className="font-bold truncate">{story.name} ({story.timeToFind})</div>
                <div className="text-[10px] opacity-80 truncate">{story.city}</div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
