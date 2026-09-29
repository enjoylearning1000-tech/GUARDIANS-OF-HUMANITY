import React from 'react';
import { 
  Fingerprint, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Lock, 
  WifiOff,
  Radio,
  Share2
} from 'lucide-react';

export default function Features({ onNavigateSecurity }) {
  const standards = [
    {
      category: "Fraud Immunity",
      title: "Aadhaar-based Verification",
      protocol: "Standard Protocol",
      icon: Fingerprint,
      desc: "Zero fake reports. Every alert filing requires cryptographic UIDAI OTP validation by family members, stopping fraudulent calls instantly."
    },
    {
      category: "Hyperlocal Reach",
      title: "Geo-Fencing Radar Alerts",
      protocol: "Standard Protocol",
      icon: MapPin,
      desc: "Calculates dynamic 1km to 15km perimeter rings based on time elapsed and transportation corridors to broadcast to all nearby citizen smartphones."
    },
    {
      category: "100% Connectivity",
      title: "Offline SMS & Cell Broadcast",
      protocol: "Standard Protocol",
      icon: WifiOff,
      desc: "Works seamlessly without active internet connections. Emergency Cell Broadcast Service (CBS) reaches basic feature phones across rural and remote highways."
    },
    {
      category: "Crowd Intelligence",
      title: "Community Eyewitness Network",
      protocol: "Standard Protocol",
      icon: Users,
      desc: "Empowers auto drivers, local shopkeepers, transit guards, and pedestrians to snap photos and tag sightings in 2 clicks with immediate police routing."
    },
    {
      category: "Law Enforcement",
      title: "Police & CCTNS Integration",
      protocol: "Standard Protocol",
      icon: ShieldCheck,
      desc: "Bi-directional live API synchronizes directly with State Police Commissionerates and CCTNS criminal/missing registries for fast FIR sealing."
    },
    {
      category: "Data Sovereignty",
      title: "Automated Privacy Protection",
      protocol: "Standard Protocol",
      icon: Lock,
      desc: "Full DPDP Act 2023 compliance. When a missing person is safely recovered, all public biometric records and citizen alerts are permanently wiped."
    }
  ];

  return (
    <section className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching user's exact specification */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            Engineering Life-Saving Speed
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
            Built with National Emergency Standards
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            Replacing outdated paper missing posters with real-time biometric verification, cell-tower telemetry, and decentralized citizen response.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {standards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono-num font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {item.protocol}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Active Protocol</span>
                  </span>
                  <span className="font-mono-num">GovTech Certified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
