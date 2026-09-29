import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Radio, 
  Users, 
  HeartHandshake, 
  Clock, 
  Lock 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Report Missing Person",
      subtitle: "Digital FIR & Biometrics",
      icon: FileText,
      time: "< 2 Minutes",
      desc: "Family submits photo, last-known GPS coordinates, clothing details, and Aadhaar identity. Facial feature embeddings are extracted on-device with zero-knowledge encryption.",
      technical: "ArcFace 512-dim face embeddings generated with privacy hashing."
    },
    {
      num: "02",
      title: "Police & Aadhaar Verification",
      subtitle: "Anti-Hoax Authentication",
      icon: ShieldCheck,
      time: "< 3 Minutes",
      desc: "Jurisdictional police station verifies the report legitimacy with instant UIDAI e-KYC hash authentication, preventing hoaxes and authorizing Level-1 Emergency broadcast.",
      technical: "CCTNS integration validates against national missing person records."
    },
    {
      num: "03",
      title: "Instant Geo-Alert Broadcast",
      subtitle: "Cell Broadcast & SMS",
      icon: Radio,
      time: "< 30 Seconds",
      desc: "System dynamically calculates estimated travel radius (5–15 km) and alerts local smartphones via offline Cell Broadcast SMS, WhatsApp emergency channels, and transit displays.",
      technical: "Cell tower geo-fencing targets active devices within the travel perimeter."
    },
    {
      num: "04",
      title: "Community & AI Response",
      subtitle: "Crowdsourced Sightings + CCTV",
      icon: Users,
      time: "Golden Hour Active",
      desc: "Shopkeepers, commuters, delivery partners, and connected municipal CCTV cameras scan the area. Citizens submit geotagged sightings with verified timestamps.",
      technical: "Edge camera feeds cross-reference incoming sightings with encrypted vector hashes."
    },
    {
      num: "05",
      title: "Safe Rescue & Case Closure",
      subtitle: "Verification & Data Purge",
      icon: HeartHandshake,
      time: "Average 42 Minutes",
      desc: "Nearest police patrol van secures the individual, confirms biometric match, reunites them safely with their family, and cryptographically purges public photo data.",
      technical: "Automated DPDP Act compliant data expungement from edge caches."
    }
  ];

  return (
    <section className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            Emergency Response Lifecycle
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            How The Smart Alert Grid Works
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Structured 5-step rapid response pipeline engineered for speed and verified trust.
          </p>
        </div>

        {/* Step Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => {
                  sound.playRadarPing();
                  setActiveStep(idx);
                }}
                className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-800 border-blue-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-num text-[11px] font-bold text-slate-500">
                    STEP {step.num}
                  </span>
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div className="font-bold text-xs text-white leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {step.time}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Details Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono-num font-bold bg-slate-800 text-blue-300 border border-slate-700">
                PHASE {steps[activeStep].num} • {steps[activeStep].time}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {steps[activeStep].subtitle}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              {steps[activeStep].title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Security Architecture: </strong>
                <span>{steps[activeStep].technical}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
