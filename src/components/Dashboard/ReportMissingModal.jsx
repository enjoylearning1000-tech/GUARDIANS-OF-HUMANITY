import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle2, 
  Radio, 
  ChevronRight, 
  ChevronLeft,
  Camera
} from 'lucide-react';
import { sound } from '../../utils/audio';

const MALE_SAMPLE_PHOTO = 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&auto=format&fit=crop&q=80';
const FEMALE_SAMPLE_PHOTO = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80';

export default function ReportMissingModal({ isOpen, onClose, onSubmitCase, userSession }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState('Male');
  const [photoPreview, setPhotoPreview] = useState(MALE_SAMPLE_PHOTO);

  const [formData, setFormData] = useState({
    name: 'Reyansh Gupta',
    age: 8,
    lastSeenLocation: 'Gate 2, Sarojini Nagar Market',
    city: 'New Delhi',
    state: 'Delhi NCR',
    timeElapsed: '45 mins ago',
    description: 'Wearing red superhero t-shirt, dark blue jeans, carrying small school bag.',
    clothing: 'Red superhero t-shirt, dark blue jeans, white sports shoes',
    height: "4' 0\"",
    complexion: 'Fair',
    distinguishingMarks: 'Small birthmark near right ear',
    informantName: 'Vikram Gupta',
    relation: 'Father',
    phone: userSession?.contact || '9871234567',
    aadhaarNumber: userSession?.aadhaarId || '8921-4401-9923',
    geoRadiusKm: 5,
    policeStation: 'Sarojini Nagar Police Station'
  });

  if (!isOpen) return null;

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    if (gender === 'Male') {
      setPhotoPreview(MALE_SAMPLE_PHOTO);
    } else {
      setPhotoPreview(FEMALE_SAMPLE_PHOTO);
    }
  };

  const handleNext = () => {
    sound.playRadarPing();
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playEmergencyAlert();

    const newCase = {
      id: `GOH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      age: Number(formData.age),
      gender: selectedGender,
      status: 'CRITICAL_ALERT',
      urgencyLevel: 'HIGH_RED',
      photo: photoPreview,
      lastSeenLocation: formData.lastSeenLocation,
      city: formData.city,
      state: formData.state,
      coordinates: [28.5772 + (Math.random() - 0.5) * 0.04, 77.1957 + (Math.random() - 0.5) * 0.04],
      lastSeenTime: formData.timeElapsed,
      reportedTime: 'Just now',
      aadhaarVerified: true,
      policeFIR: `FIR-DL-DEL-${Math.floor(1000 + Math.random() * 9000)}/2026`,
      policeStation: formData.policeStation,
      investigatingOfficer: 'Insp. R. K. Sharma (Assigned)',
      description: formData.description,
      physicalTraits: {
        gender: selectedGender,
        height: formData.height,
        complexion: formData.complexion,
        clothing: formData.clothing,
        distinguishingMarks: formData.distinguishingMarks
      },
      geoRadiusKm: Number(formData.geoRadiusKm) || 5,
      alertsDispatched: 24500,
      sightingsCount: 0,
      aiMatchConfidence: 94,
      timeline: [
        { time: 'Just now', title: 'Emergency SOS Filed', desc: 'Report filed with Aadhaar authentication.', icon: 'FileText' },
        { time: 'Just now', title: 'Level-1 Red Alert Deployed', desc: `Broadcast initiated to ${formData.geoRadiusKm}km perimeter.`, icon: 'Radio' }
      ],
      sightings: []
    };

    onSubmitCase(newCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Report Missing Person</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-num font-normal">
                Step {currentStep} of 4
              </span>
            </h2>
            <p className="text-xs text-slate-400">Emergency alert filing & geo-fence broadcast</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 border-b border-slate-800 text-center text-xs">
          {['Profile & Gender', 'Location & Time', 'Aadhaar Auth', 'Confirm Broadcast'].map((label, idx) => (
            <div
              key={label}
              className={`py-2 px-1 border-b-2 font-medium ${
                currentStep === idx + 1
                  ? 'border-blue-500 text-white bg-slate-800/40'
                  : currentStep > idx + 1
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-500'
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* STEP 1: Profile & Gender */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Photo & Gender */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                  <img src={photoPreview} alt="Portrait" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <label className="text-xs text-slate-300 font-semibold uppercase">
                    Missing Person Gender *
                  </label>
                  <div className="flex items-center gap-2">
                    {['Male', 'Female'].map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => handleGenderChange(gender)}
                        className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-colors ${
                          selectedGender === gender
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Portrait image updates automatically to match selected gender.
                  </p>
                </div>
              </div>

              {/* Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-300 font-semibold uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold uppercase">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold uppercase">Clothing Details</label>
                <input
                  type="text"
                  value={formData.clothing}
                  onChange={(e) => setFormData({ ...formData, clothing: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold uppercase">Distinguishing Marks</label>
                <input
                  type="text"
                  value={formData.distinguishingMarks}
                  onChange={(e) => setFormData({ ...formData, distinguishingMarks: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location & Time */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold uppercase">Last Seen Location *</label>
                <input
                  type="text"
                  required
                  value={formData.lastSeenLocation}
                  onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold uppercase">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold uppercase">Time Elapsed *</label>
                  <input
                    type="text"
                    required
                    value={formData.timeElapsed}
                    onChange={(e) => setFormData({ ...formData, timeElapsed: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold uppercase flex items-center justify-between">
                  <span>Broadcast Radius:</span>
                  <span className="text-blue-400 font-mono-num font-bold">{formData.geoRadiusKm} km</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={formData.geoRadiusKm}
                  onChange={(e) => setFormData({ ...formData, geoRadiusKm: e.target.value })}
                  className="w-full mt-2 accent-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Informant & Aadhaar */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-blue-400" />
                <span>Verified with Aadhaar session: {userSession?.aadhaarId || '8921-4401-9923'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold uppercase">Informant Name</label>
                  <input
                    type="text"
                    required
                    value={formData.informantName}
                    onChange={(e) => setFormData({ ...formData, informantName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold uppercase">Relationship</label>
                  <input
                    type="text"
                    required
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold uppercase">Emergency Contact</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Confirm Broadcast */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-white uppercase">Incident Summary</div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>Person: <strong className="text-white">{formData.name}</strong></div>
                  <div>Gender: <strong className="text-blue-300 uppercase">{selectedGender}</strong></div>
                  <div>Age: <strong className="text-white">{formData.age} yrs</strong></div>
                  <div>Location: <strong className="text-white">{formData.lastSeenLocation}</strong></div>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold uppercase">Nearest Police Station</label>
                <input
                  type="text"
                  value={formData.policeStation}
                  onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Radio className="w-4 h-4" />
                <span>Launch Emergency Broadcast</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
