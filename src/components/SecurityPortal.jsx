import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  Trash2, 
  Scale, 
  CheckCircle, 
  Key, 
  RefreshCw 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function SecurityPortal() {
  const [aadhaarInput, setAadhaarInput] = useState('8921-4401-9923');
  const [otpInput, setOtpInput] = useState('742891');
  const [verifyState, setVerifyState] = useState('IDLE');

  const handleSimulateVerify = () => {
    sound.playRadarPing();
    setVerifyState('VERIFYING');
    setTimeout(() => {
      setVerifyState('VERIFIED');
      sound.playSuccessChime();
    }, 800);
  };

  return (
    <section className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            Governance & Privacy Architecture
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Security, Ethics & Anti-Hoax Framework
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Engineered to eliminate false emergency reports while protecting citizen privacy under Indian law.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Aadhaar Verification */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center">
                <Fingerprint className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono-num font-bold text-blue-300 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                UIDAI INTEGRATION
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-white">
                Aadhaar Zero-Knowledge Verification
              </h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Prevents prank alerts and fake kidnappings. The informant verifies identity via Aadhaar OTP. The platform verifies authenticity without storing the 12-digit number in plaintext.
              </p>
            </div>

            {/* Interactive Aadhaar Simulator */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5 text-xs font-mono-num">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Aadhaar Token / VID</label>
                <input
                  type="text"
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <button
                onClick={handleSimulateVerify}
                disabled={verifyState === 'VERIFYING'}
                className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {verifyState === 'VERIFYING' ? (
                  <span>Verifying with UIDAI Hash...</span>
                ) : verifyState === 'VERIFIED' ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>Identity Verified (ZKP Hash #7F4A)</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>Test Aadhaar Verification</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Police Approval */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono-num font-bold text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                STATION SIGN-OFF
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-white">
                Police Station Multi-Sign Approval
              </h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Emergency Red broadcast to local smartphones requires instant verification by the jurisdictional Duty Officer or ACP before public geo-fencing initiates.
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Station Identity Sign-Off:</span>
                <span className="font-mono-num text-slate-200">Sub-Inspector Digital Token</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Auto CCTNS FIR Cross-Check:</span>
                <span className="font-mono-num text-emerald-400">Validated</span>
              </div>
            </div>
          </div>

          {/* 3. Anti-Fake Reporting */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-red-400 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono-num font-bold text-red-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                LEGAL DETERRENT
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-white">
                Anti-Hoax Legal Deterrent & Forensics
              </h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Filing a fraudulent emergency alert triggers automatic forensic IP and cell tower logging. Hoax creators face prosecution under Section 182 of the Indian Penal Code (BNS Section 217).
              </p>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-red-900/40 text-xs text-red-300">
              Zero tolerance for false alarms: device fingerprints and Aadhaar hashes are submitted to cybercrime divisions if fraud is detected.
            </div>
          </div>

          {/* 4. Data Auto-Deletion */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono-num font-bold text-emerald-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                DPDP ACT COMPLIANT
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-white">
                Automated Right-To-Be-Forgotten
              </h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Once a missing child or adult is recovered, their photos and biometric feature vectors are automatically purged from public edge caches and community feeds within 60 minutes to protect their privacy and future dignity.
              </p>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-400 flex justify-between">
              <span>Public Image CDN TTL:</span>
              <span className="text-emerald-400 font-mono-num">Active Only During Search</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
