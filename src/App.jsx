import React, { useState, useEffect } from 'react';
import { 
  INITIAL_CASES, 
  SYSTEM_STATS 
} from './data/mockData';
import { sound } from './utils/audio';

// Components
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import EmergencyAlertBanner from './components/EmergencyAlertBanner';
import EmergencyNearbyAlertNotification from './components/EmergencyNearbyAlertNotification';
import EmergencyAlertPopup from './components/EmergencyAlertPopup';
import HeroSection from './components/HeroSection';
import LiveRadarMap from './components/LiveRadarMap';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import SuccessStories from './components/SuccessStories';
import SecurityPortal from './components/SecurityPortal';
import NationalBulletinSection from './components/NationalBulletinSection';
import DashboardView from './components/Dashboard/DashboardView';
import CaseDetailModal from './components/Dashboard/CaseDetailModal';
import ReportMissingModal from './components/Dashboard/ReportMissingModal';
import ReportSightingModal from './components/Dashboard/ReportSightingModal';
import PosterGeneratorModal from './components/Dashboard/PosterGeneratorModal';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  // Authentication State: Default to verified citizen session for immediate platform exploration
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userSession, setUserSession] = useState({
    fullName: 'Verified Citizen',
    role: 'CITIZEN',
    aadhaarId: '8921-4401-9923',
    contact: '9876543210',
    verifiedAt: 'Active Session'
  });

  const [cases, setCases] = useState(INITIAL_CASES);
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'map' | 'dashboard' | 'how-it-works' | 'security' | 'stories'
  const [userRole, setUserRole] = useState('CITIZEN'); // 'CITIZEN' | 'POLICE' | 'VOLUNTEER'
  const [stats, setStats] = useState(SYSTEM_STATS);

  // Active Emergency Alert Banner State
  const [activeAlert, setActiveAlert] = useState(null);

  // Dedicated "🚨 Missing Person Nearby" slide-from-top notification
  const [nearbyAlertCase, setNearbyAlertCase] = useState(null);

  // Priority Child Emergency Modal (with passport photo switcher & range authority)
  const [popupAlertCase, setPopupAlertCase] = useState(null);

  // Modals
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState(null);
  const [selectedCaseForSighting, setSelectedCaseForSighting] = useState(null);
  const [selectedCaseForPoster, setSelectedCaseForPoster] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Trigger initial emergency alert notification smoothly on mount
  useEffect(() => {
    const criticalCase = cases.find(c => c.status === 'CRITICAL_ALERT') || cases[0];
    setActiveAlert(criticalCase);

    // Slide down "🚨 Missing Person Nearby" popup with slight shake after 1.4s
    const timer = setTimeout(() => {
      setNearbyAlertCase(criticalCase);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  // Handle successful login
  const handleLoginSuccess = (session) => {
    setUserSession(session);
    setUserRole(session.role || 'CITIZEN');
    setIsAuthenticated(true);
    
    const criticalCase = cases.find(c => c.status === 'CRITICAL_ALERT') || cases[0];
    setActiveAlert(criticalCase);
    setNearbyAlertCase(criticalCase);
    sound.playEmergencyAlert();
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserSession(null);
    setActiveAlert(null);
    setNearbyAlertCase(null);
    setPopupAlertCase(null);
    setCurrentTab('home');
  };

  // Trigger emergency alert popup manually
  const handleTriggerTestAlert = () => {
    sound.playEmergencyAlert();
    const criticalCase = cases.find(c => c.status === 'CRITICAL_ALERT') || cases[0];
    setActiveAlert(criticalCase);
    setNearbyAlertCase(criticalCase);
  };

  // POLICE EXCLUSIVE AUTHORITY: Increase broadcast alert range
  const handleUpdateCaseRadius = (caseId, newRadiusKm) => {
    sound.playEmergencyAlert();

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const updatedCase = {
            ...c,
            geoRadiusKm: newRadiusKm,
            alertsDispatched: Math.round(newRadiusKm * 14500),
            timeline: [
              {
                time: 'Just now',
                title: 'Broadcast Perimeter Expanded',
                desc: `Authorized by Duty Officer: search radius expanded to ${newRadiusKm} km across transit routes.`,
                icon: 'Radio'
              },
              ...(c.timeline || [])
            ]
          };
          if (activeAlert?.id === caseId) {
            setActiveAlert(updatedCase);
          }
          if (nearbyAlertCase?.id === caseId) {
            setNearbyAlertCase(updatedCase);
          }
          if (popupAlertCase?.id === caseId) {
            setPopupAlertCase(updatedCase);
          }
          if (selectedCaseForDetail?.id === caseId) {
            setSelectedCaseForDetail(updatedCase);
          }
          return updatedCase;
        }
        return c;
      })
    );
  };

  // Add new reported missing person
  const handleAddNewCase = (newCase) => {
    setCases((prev) => [newCase, ...prev]);
    setActiveAlert(newCase);
    setNearbyAlertCase(newCase);
    setStats((prev) => ({
      ...prev,
      activeCases: prev.activeCases + 1
    }));
  };

  // Submit sighting for a case
  const handleSubmitSighting = (caseId, newSighting) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            sightingsCount: (c.sightingsCount || 0) + 1,
            sightings: [newSighting, ...(c.sightings || [])],
            timeline: [
              {
                time: 'Just now',
                title: 'New Sighting Submitted',
                desc: `${newSighting.witnessName} observed individual at ${newSighting.location}.`,
                icon: 'Eye'
              },
              ...(c.timeline || [])
            ]
          };
        }
        return c;
      })
    );
  };

  // Mark a case as reunited/resolved
  const handleMarkReunited = (caseId) => {
    sound.playSuccessChime();

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: 'RESOLVED',
            urgencyLevel: 'RESOLVED',
            resolvedTime: 'Reunited just now!',
            timeline: [
              {
                time: 'Just now',
                title: 'Safely Reunited with Family',
                desc: 'Verified by police patrol. Biometric identification confirmed. Case closed.',
                icon: 'HeartHandshake'
              },
              ...(c.timeline || [])
            ]
          };
        }
        return c;
      })
    );

    setStats((prev) => ({
      ...prev,
      activeCases: Math.max(0, prev.activeCases - 1),
      peopleFound: prev.peopleFound + 1
    }));

    if (selectedCaseForDetail?.id === caseId) {
      setSelectedCaseForDetail(null);
    }
    if (activeAlert?.id === caseId) {
      setActiveAlert(null);
    }
    if (nearbyAlertCase?.id === caseId) {
      setNearbyAlertCase(null);
    }
  };

  const handleSwitchTab = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user explicitly logged out, show LoginPage
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#050812] text-slate-100 flex flex-col relative font-sans selection:bg-red-500/30 selection:text-red-200">
      
      {/* Custom Glowing Cursor with Map Pin & Ripple Effect */}
      <CustomCursor />

      {/* Main Navbar Fixed at Top */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleSwitchTab}
        userRole={userRole}
        setUserRole={setUserRole}
        userSession={userSession}
        onLogout={handleLogout}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        triggerTestAlert={handleTriggerTestAlert}
      />

      {/* Floating Hyperlocal Emergency Alert Banner */}
      {activeAlert && (
        <EmergencyAlertBanner
          alertCase={activeAlert}
          userRole={userRole}
          onUpdateRadius={handleUpdateCaseRadius}
          onSelectCase={(caseItem) => {
            setSelectedCaseForDetail(caseItem);
            setActiveAlert(null);
          }}
          onDismiss={() => setActiveAlert(null)}
        />
      )}

      {/* ALERT SYSTEM: "🚨 Missing Person Nearby" slide-from-top notification */}
      {nearbyAlertCase && (
        <EmergencyNearbyAlertNotification
          alertCase={nearbyAlertCase}
          onClose={() => setNearbyAlertCase(null)}
          onViewDetails={(caseItem) => {
            setSelectedCaseForDetail(caseItem);
            setNearbyAlertCase(null);
          }}
          onReportSighting={(caseItem) => {
            setSelectedCaseForSighting(caseItem);
            setNearbyAlertCase(null);
          }}
        />
      )}

      {/* Main View Router */}
      <div className="flex-1 pb-16 md:pb-0">
        {currentTab === 'home' && (
          <div>
            {/* 1. HERO SECTION at Top */}
            <HeroSection
              stats={stats}
              userSession={userSession}
              onOpenReport={() => setIsReportModalOpen(true)}
              onNavigateToMap={() => {
                const mapEl = document.getElementById('live-map-section');
                if (mapEl) {
                  mapEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleSwitchTab('map');
                }
              }}
              onNavigateToDashboard={() => handleSwitchTab('dashboard')}
              onTriggerEmergencyAlert={handleTriggerTestAlert}
            />

            {/* 2. LIVE MAP SECTION */}
            <div id="live-map-section">
              <LiveRadarMap
                cases={cases}
                onSelectCase={(caseItem) => setSelectedCaseForDetail(caseItem)}
                onReportSighting={(caseItem) => setSelectedCaseForSighting(caseItem)}
              />
            </div>

            {/* 3. PRIORITY NATIONAL BULLETIN */}
            <NationalBulletinSection
              cases={cases}
              onViewCaseDetails={(caseItem) => setSelectedCaseForDetail(caseItem)}
              onReportSighting={(caseItem) => setSelectedCaseForSighting(caseItem)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              userRole={userRole}
              onUpdateRadius={handleUpdateCaseRadius}
            />

            {/* 4. HOW IT WORKS (Timeline animation: Report -> Verify -> Alert -> Found) */}
            <HowItWorks />

            {/* 5. PLATFORM CAPABILITIES */}
            <Features
              onNavigateSecurity={() => handleSwitchTab('security')}
            />

            {/* 6. VERIFIED SAFE REUNIONS */}
            <SuccessStories />

            {/* 7. SECURITY & GOVERNANCE ARCHITECTURE */}
            <SecurityPortal />
          </div>
        )}

        {currentTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Live Emergency Radar & Telemetry
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Real-time GPS coordinate triangulation and emergency perimeter zones.
                </p>
              </div>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Report Missing
              </button>
            </div>

            <LiveRadarMap
              cases={cases}
              onSelectCase={(caseItem) => setSelectedCaseForDetail(caseItem)}
              onReportSighting={(caseItem) => setSelectedCaseForSighting(caseItem)}
            />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            cases={cases}
            stats={stats}
            userRole={userRole}
            setUserRole={setUserRole}
            userSession={userSession}
            onUpdateRadius={handleUpdateCaseRadius}
            onViewCaseDetails={(caseItem) => setSelectedCaseForDetail(caseItem)}
            onReportSighting={(caseItem) => setSelectedCaseForSighting(caseItem)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {currentTab === 'how-it-works' && (
          <div className="py-6 space-y-6">
            <HowItWorks />
          </div>
        )}

        {currentTab === 'security' && (
          <div className="py-6">
            <SecurityPortal />
          </div>
        )}

        {currentTab === 'stories' && (
          <div className="py-6">
            <SuccessStories />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleSwitchTab} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={handleSwitchTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Modals */}
      {selectedCaseForDetail && (
        <CaseDetailModal
          caseItem={selectedCaseForDetail}
          userRole={userRole}
          onUpdateRadius={handleUpdateCaseRadius}
          onClose={() => setSelectedCaseForDetail(null)}
          onReportSighting={(caseItem) => setSelectedCaseForSighting(caseItem)}
          onOpenPoster={(caseItem) => setSelectedCaseForPoster(caseItem)}
          onMarkReunited={handleMarkReunited}
        />
      )}

      {isReportModalOpen && (
        <ReportMissingModal
          isOpen={isReportModalOpen}
          userSession={userSession}
          onClose={() => setIsReportModalOpen(false)}
          onSubmitCase={handleAddNewCase}
        />
      )}

      {selectedCaseForSighting && (
        <ReportSightingModal
          isOpen={Boolean(selectedCaseForSighting)}
          targetCase={selectedCaseForSighting}
          onClose={() => setSelectedCaseForSighting(null)}
          onSubmitSighting={handleSubmitSighting}
        />
      )}

      {selectedCaseForPoster && (
        <PosterGeneratorModal
          isOpen={Boolean(selectedCaseForPoster)}
          caseItem={selectedCaseForPoster}
          onClose={() => setSelectedCaseForPoster(null)}
        />
      )}

      {/* Child Priority Modal */}
      {popupAlertCase && (
        <EmergencyAlertPopup
          alertCase={popupAlertCase}
          userRole={userRole}
          onUpdateRadius={handleUpdateCaseRadius}
          onClose={() => setPopupAlertCase(null)}
          onViewDetails={(caseItem) => {
            setSelectedCaseForDetail(caseItem);
            setPopupAlertCase(null);
          }}
          onReportSighting={(caseItem) => {
            setSelectedCaseForSighting(caseItem);
            setPopupAlertCase(null);
          }}
        />
      )}
    </div>
  );
}
