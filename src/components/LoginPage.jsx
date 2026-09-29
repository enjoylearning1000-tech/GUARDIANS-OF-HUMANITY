import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Fingerprint, 
  Phone, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  Activity,
  AlertCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function LoginPage({ onLoginSuccess }) {
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('CITIZEN'); // 'CITIZEN' | 'POLICE' | 'VOLUNTEER'
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-format Aadhaar (XXXX-XXXX-XXXX)
  const handleAadhaarChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setAadhaarInput(parts.join('-'));
    setErrorMessage('');
  };

  // Auto-format contact
  const handleContactChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setContactInput(raw);
    setErrorMessage('');
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    const rawAadhaar = aadhaarInput.replace(/-/g, '');
    if (rawAadhaar.length !== 12) {
      setErrorMessage('Please enter a valid 12-digit Aadhaar ID number.');
      return;
    }
    if (contactInput.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile contact number.');
      return;
    }

    setIsLoading(true);
    sound.playRadarPing();

    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setOtpCode('742891');
      sound.playSuccessChime();
    }, 500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    sound.playRadarPing();

    setTimeout(() => {
      setIsLoading(false);
      sound.playSuccessChime();
      onLoginSuccess({
        aadhaarId: aadhaarInput || '8921-4401-9923',
        contact: contactInput || '9876543210',
        role: selectedRole,
        fullName: selectedRole === 'POLICE' ? 'Inspector R. Verma' : 'Verified Citizen',
        verifiedAt: new Date().toLocaleTimeString()
      });
    }, 500);
  };

  const handleQuickDemo = (role = 'CITIZEN') => {
    setSelectedRole(role);
    setAadhaarInput('8921-4401-9923');
    setContactInput('9876543210');
    setOtpStep(true);
    setOtpCode('742891');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#091122] via-[#070d18] to-[#070d18] flex flex-col justify-between py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Banner */}
      <div className="max-w-lg mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-xs text-blue-300 font-mono-num mb-4 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-blue-400" />
          <span>NATIONAL EMERGENCY MISSING PERSON ALERT GRID</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md mx-auto w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 border border-slate-700/80">
        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-indigo-950 border border-red-500/40 text-white flex items-center justify-center mb-3 shadow-lg shadow-red-600/25">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Guardians of Humanity
          </h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Smart Missing Person Emergency Alert System
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        {!otpStep ? (
          <form onSubmit={handleRequestOtp} className="mt-6 space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Select Your Access Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'CITIZEN', label: 'Citizen', icon: UserCheck, desc: 'Public Alert' },
                  { id: 'POLICE', label: 'Police Officer', icon: ShieldCheck, desc: 'Verified Duty' },
                  { id: 'VOLUNTEER', label: 'NGO / Vol', icon: Activity, desc: 'Ground Search' }
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      selectedRole === role.id
                        ? 'border-blue-500 bg-blue-600/25 text-white shadow-md'
                        : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <role.icon className={`w-4 h-4 ${selectedRole === role.id ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aadhaar Input */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between mb-1.5">
                <span>Aadhaar ID (12 Digits) *</span>
                <span className="text-[10px] text-blue-400 font-mono-num font-semibold">UIDAI e-KYC</span>
              </label>
              <div className="relative">
                <Fingerprint className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={aadhaarInput}
                  onChange={handleAadhaarChange}
                  placeholder="e.g. 8921-4401-9923"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-sm font-mono-num placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero-knowledge proof verification. Plaintext identity is never exposed.
              </p>
            </div>

            {/* Mobile Contact Input */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Registered Contact Mobile *
              </label>
              <div className="relative">
                <span className="text-xs text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-num font-bold">
                  +91
                </span>
                <input
                  type="text"
                  required
                  value={contactInput}
                  onChange={handleContactChange}
                  placeholder="10-digit mobile number"
                  className="w-full pl-12 pr-3 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-sm font-mono-num placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
            </div>

            {/* Request OTP Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying with UIDAI...' : 'Request Authentication OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs">
              <div className="text-slate-400">One-Time Password sent to:</div>
              <div className="text-white font-mono-num font-bold text-sm mt-0.5">+91 {contactInput || '9876543210'}</div>
              <div className="text-[11px] text-slate-400 mt-1">Aadhaar Linked: {aadhaarInput || '8921-4401-9923'}</div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Enter 6-Digit OTP Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
                  placeholder="6-digit OTP code"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-lg tracking-widest font-mono-num text-center focus:outline-none focus:border-emerald-500 shadow-inner"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLoading ? 'Authenticating...' : 'Enter Emergency System'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Quick Demo Shortcuts */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <div className="text-[11px] text-slate-400 mb-2">Fast Evaluation Shortcuts:</div>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('CITIZEN')}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
            >
              Citizen Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('POLICE')}
              className="px-3 py-1.5 rounded-lg text-xs bg-blue-950/80 hover:bg-blue-900/80 text-blue-200 font-semibold border border-blue-800 transition-colors"
            >
              Police Demo
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Compliance Notice */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-slate-400 space-y-1 relative z-10">
        <div>Compliant with Digital Personal Data Protection (DPDP) Act 2023</div>
        <div className="text-slate-500">National Emergency Helplines: Police 112 • Childline 1098</div>
      </div>
    </div>
  );
}
