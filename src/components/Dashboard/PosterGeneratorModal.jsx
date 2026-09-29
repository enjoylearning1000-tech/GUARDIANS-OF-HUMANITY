import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  ShieldAlert, 
  Phone, 
  QrCode, 
  AlertTriangle 
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function PosterGeneratorModal({ isOpen, onClose, caseItem }) {
  if (!isOpen || !caseItem) return null;

  const handlePrint = () => {
    sound.playRadarPing();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Action Bar (Not printed) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-sm">Official Emergency Missing Flyer Generator</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Poster Sheet */}
        <div id="printable-flyer" className="overflow-y-auto p-6 sm:p-8 space-y-5 bg-white text-slate-950 border-8 border-red-600">
          {/* Top Red Header */}
          <div className="text-center border-b-4 border-slate-950 pb-4">
            <div className="flex items-center justify-center gap-2 text-red-600 font-black tracking-widest text-xs uppercase mb-1">
              <ShieldAlert className="w-5 h-5 fill-red-600 text-white" />
              <span>NATIONAL EMERGENCY MISSING PERSON NOTICE</span>
              <ShieldAlert className="w-5 h-5 fill-red-600 text-white" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-red-600 tracking-tight leading-none uppercase">
              MISSING PERSON
            </h1>
            <p className="text-xs font-bold text-slate-800 tracking-widest uppercase mt-1">
              REWARD & IMMEDIATE POLICE ATTENTION AUTHORIZED
            </p>
          </div>

          {/* Photo & Vital Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            <div className="sm:col-span-5 text-center">
              <div className="border-4 border-slate-950 rounded-xl overflow-hidden shadow-md">
                <img
                  src={caseItem.photo}
                  alt={caseItem.name}
                  className="w-full h-64 object-cover object-center"
                />
              </div>
              <div className="mt-2 text-xs font-mono font-bold text-slate-700 uppercase">
                UIDAI ENCRYPTED CASE ID: {caseItem.id}
              </div>
            </div>

            <div className="sm:col-span-7 space-y-2.5">
              <div>
                <h2 className="text-3xl font-black text-slate-950 uppercase leading-tight">
                  {caseItem.name}
                </h2>
                <div className="text-sm font-bold text-red-600">
                  AGE: {caseItem.age} YEARS • GENDER: {caseItem.gender?.toUpperCase()}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-800 border-t border-b border-slate-300 py-2.5">
                <div><strong>LAST SEEN:</strong> {caseItem.lastSeenLocation}</div>
                <div><strong>TIME:</strong> {caseItem.lastSeenTime}</div>
                <div><strong>CITY / STATE:</strong> {caseItem.city}, {caseItem.state}</div>
                <div><strong>CLOTHING:</strong> {caseItem.physicalTraits?.clothing || caseItem.description}</div>
                <div><strong>DISTINGUISHING MARKS:</strong> {caseItem.physicalTraits?.distinguishingMarks || "None reported"}</div>
              </div>

              <div className="text-xs text-slate-700 leading-snug">
                <strong>DESCRIPTION:</strong> {caseItem.description}
              </div>
            </div>
          </div>

          {/* Emergency Helplines & Contact Grid */}
          <div className="border-4 border-red-600 bg-red-50 p-4 rounded-xl text-center space-y-2">
            <div className="text-sm font-black text-red-700 uppercase tracking-wide">
              IF YOU HAVE ANY INFORMATION, IMMEDIATELY CONTACT:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-base font-black text-slate-950 font-mono">
              <div className="flex items-center gap-1.5">
                <Phone className="w-5 h-5 text-red-600" />
                <span>DIAL 112 (POLICE)</span>
              </div>
              <span>•</span>
              <div>CHILDLINE: 1098</div>
              <span>•</span>
              <div>STATION: {caseItem.policeStation}</div>
            </div>
          </div>

          {/* Bottom Security Watermark */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-300 text-[10px] text-slate-600 font-mono">
            <div>INVESTIGATING FIR: {caseItem.policeFIR}</div>
            <div>ISSUED BY: GUARDIANS OF HUMANITY EMERGENCY NETWORK</div>
          </div>
        </div>
      </div>
    </div>
  );
}
