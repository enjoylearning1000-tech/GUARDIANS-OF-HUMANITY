import React from 'react';
import { 
  ShieldAlert, 
  Phone, 
  Heart, 
  Lock, 
  MapPin, 
  Radio, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* National Emergency Hotline Strip */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/70 via-slate-900 to-red-950/70 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="text-white font-bold text-base sm:text-lg">
                National 24/7 Rapid Emergency Helplines
              </div>
              <div className="text-slate-300 text-xs mt-0.5">
                Immediate toll-free government hotlines for missing persons and emergency distress.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:112"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Dial 112 (Police)</span>
            </a>
            <a
              href="tel:1098"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Childline: 1098
            </a>
            <a
              href="tel:1090"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Women Safety: 1090
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-lg text-white">
                GUARDIANS <span className="text-red-500">OF HUMANITY</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Smart Missing Person Emergency Alert & Rapid Response Grid. Designed for Smart India Hackathon (SIH) to turn every second into a life-saving opportunity.
            </p>
            <div className="font-mono-num text-[11px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CCTNS & UIDAI SIMULATION STACK V2.6</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">Mission Overview</button></li>
              <li><button onClick={() => onNavigate('map')} className="hover:text-white transition-colors cursor-pointer">Live Incident Radar</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors cursor-pointer">Command Center</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer">Response Lifecycle</button></li>
            </ul>
          </div>

          {/* Technology & Protocols */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Tech & Security</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('security')} className="hover:text-white transition-colors cursor-pointer">Aadhaar Zero-Knowledge Verification</button></li>
              <li><button onClick={() => onNavigate('security')} className="hover:text-white transition-colors cursor-pointer">Dynamic Geo-Fencing Broadcast</button></li>
              <li><button onClick={() => onNavigate('security')} className="hover:text-white transition-colors cursor-pointer">Edge AI Facial Vector Indexing</button></li>
              <li><button onClick={() => onNavigate('security')} className="hover:text-white transition-colors cursor-pointer">DPDP Act Data Auto-Purge</button></li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Legal & Compliance</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              In accordance with Section 182 IPC, false emergency reporting is a punishable offense. Citizen photos and facial vectors are cryptographically expunged immediately upon confirmed safe reunion.
            </p>
            <div className="pt-2 text-slate-500 font-mono-num text-[11px]">
              Govt. Public Utility Project Concept
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <div>
            © 2026 Guardians of Humanity • Smart Missing Person Alert System • Built with ❤️ for Social Impact
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Emergency Protocol</span>
            <span>•</span>
            <span className="hover:text-slate-400">Zero-Trace Privacy Policy</span>
            <span>•</span>
            <span className="text-cyan-400">Status: 99.98% High Availability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
