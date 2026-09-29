import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Crosshair, 
  Maximize2, 
  Minimize2,
  Flame,
  Users2,
  LocateFixed
} from 'lucide-react';
import { sound } from '../utils/audio';

// Tile Layer configurations (Google Maps & Tactical Dark)
const MAP_LAYERS = {
  TACTICAL_DARK: {
    name: 'Tactical Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  GOOGLE_STREETS: {
    name: 'Google Roadmap',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20,
    attribution: 'Map data &copy; Google Maps'
  },
  GOOGLE_SATELLITE: {
    name: 'Google Satellite',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20,
    attribution: 'Imagery &copy; Google Maps'
  },
  GOOGLE_TERRAIN: {
    name: 'Google Terrain',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20,
    attribution: 'Map data &copy; Google Maps'
  }
};

export default function LiveRadarMap({ cases, onSelectCase, onReportSighting }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const circlesRef = useRef([]);
  const heatmapLayersRef = useRef([]);
  const userLocationLayerRef = useRef(null);
  const clusterMarkersRef = useRef([]);

  const [activeLayerType, setActiveLayerType] = useState('TACTICAL_DARK');
  const [filterType, setFilterType] = useState('ALL'); // ALL, CHILD, WOMAN, MAN, SENIOR, RESOLVED
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHeatmapEnabled, setIsHeatmapEnabled] = useState(false);
  const [isClusterMode, setIsClusterMode] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [lastTelemetryPing, setLastTelemetryPing] = useState('Active');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center over India
    const map = L.map(mapContainerRef.current, {
      center: [22.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    const initialConfig = MAP_LAYERS[activeLayerType];
    const tileLayer = L.tileLayer(initialConfig.url, {
      maxZoom: initialConfig.maxZoom,
      subdomains: initialConfig.subdomains
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Layer Switching
  const handleSwitchLayer = (layerKey) => {
    setActiveLayerType(layerKey);
    const map = mapInstanceRef.current;
    if (!map) return;

    sound.playRadarPing();

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const config = MAP_LAYERS[layerKey];
    const newLayer = L.tileLayer(config.url, {
      maxZoom: config.maxZoom,
      subdomains: config.subdomains
    }).addTo(map);

    currentTileLayerRef.current = newLayer;
  };

  // Fly to location helper
  const handleFlyTo = (coords, zoom = 14) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, zoom, { duration: 1.4 });
      sound.playRadarPing();
    }
  };

  // User Location Detection (navigator.geolocation)
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocatingUser(true);
    sound.playRadarPing();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingUser(false);
        const { latitude, longitude, accuracy } = pos.coords;
        setUserCoords([latitude, longitude]);

        const map = mapInstanceRef.current;
        if (!map) return;

        // Clear previous user location marker
        if (userLocationLayerRef.current) {
          map.removeLayer(userLocationLayerRef.current);
        }

        const userGroup = L.layerGroup();

        // Pulsing user dot
        const userIcon = L.divIcon({
          className: 'user-gps-marker',
          html: `
            <div class="relative flex items-center justify-center -ml-4 -mt-4">
              <span class="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></span>
              <span class="relative w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_15px_#3b82f6]"></span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const userMarker = L.marker([latitude, longitude], { icon: userIcon });
        userMarker.bindPopup(`
          <div class="p-3 text-slate-900 font-sans text-xs">
            <strong class="text-blue-600 block text-sm">📍 Your Current Location</strong>
            <p class="text-slate-600 mt-1">GPS Accuracy: ±${Math.round(accuracy)} meters</p>
            <p class="text-[11px] text-slate-500 mt-0.5">Emergency alerts in your radius will trigger automatically.</p>
          </div>
        `);

        // Accuracy circle
        const accuracyCircle = L.circle([latitude, longitude], {
          radius: Math.max(accuracy, 200),
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.12,
          weight: 1.5,
          dashArray: '3, 6'
        });

        userGroup.addLayer(accuracyCircle);
        userGroup.addLayer(userMarker);
        userGroup.addTo(map);

        userLocationLayerRef.current = userGroup;

        // Fly smoothly to user position
        map.flyTo([latitude, longitude], 14, { duration: 1.6 });
        sound.playSuccessChime();
      },
      (err) => {
        setIsLocatingUser(false);
        // Fallback demo location: Delhi Connaught Place
        handleFlyTo([28.6328, 77.2197], 13);
      },
      { timeout: 8000 }
    );
  };

  // Render Real Markers, Clusters, Geo-Fences, and Heatmaps
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing layers
    markersRef.current.forEach((m) => map.removeLayer(m));
    circlesRef.current.forEach((c) => map.removeLayer(c));
    heatmapLayersRef.current.forEach((h) => map.removeLayer(h));
    clusterMarkersRef.current.forEach((cm) => map.removeLayer(cm));

    markersRef.current = [];
    circlesRef.current = [];
    heatmapLayersRef.current = [];
    clusterMarkersRef.current = [];

    const filtered = cases.filter((c) => {
      if (filterType === 'CHILD' && c.category !== 'CHILD') return false;
      if (filterType === 'WOMAN' && c.category !== 'WOMAN') return false;
      if (filterType === 'MAN' && c.category !== 'MAN') return false;
      if (filterType === 'SENIOR' && c.category !== 'SENIOR') return false;
      if (filterType === 'RESOLVED' && c.status !== 'RESOLVED') return false;
      if (selectedCity !== 'ALL' && c.city !== selectedCity) return false;
      return true;
    });

    // 1. HEATMAP LAYER FOR HIGH-RISK AREAS
    if (isHeatmapEnabled) {
      filtered.forEach((c) => {
        const isCritical = c.status === 'CRITICAL_ALERT';
        const heatRadius = isCritical ? 25000 : 15000;
        const heatColor = isCritical ? '#ef4444' : '#10b981';

        // Outer glow circle
        const heatCircle = L.circle(c.coordinates, {
          radius: heatRadius,
          stroke: false,
          fillColor: heatColor,
          fillOpacity: 0.18
        }).addTo(map);

        // Core intensity circle
        const coreCircle = L.circle(c.coordinates, {
          radius: heatRadius * 0.45,
          stroke: false,
          fillColor: heatColor,
          fillOpacity: 0.32
        }).addTo(map);

        heatmapLayersRef.current.push(heatCircle, coreCircle);
      });
    }

    // 2. CLUSTER MODE FOR MULTIPLE CASES
    if (isClusterMode && selectedCity === 'ALL') {
      // Group cases by city
      const cityGroups = {};
      filtered.forEach((c) => {
        if (!cityGroups[c.city]) {
          cityGroups[c.city] = { cases: [], coords: c.coordinates };
        }
        cityGroups[c.city].cases.push(c);
      });

      Object.entries(cityGroups).forEach(([city, group]) => {
        const count = group.cases.length;
        const hasCritical = group.cases.some((c) => c.status === 'CRITICAL_ALERT');
        const badgeColor = hasCritical ? '#ef4444' : '#10b981';

        const clusterIcon = L.divIcon({
          className: 'custom-cluster-icon',
          html: `
            <div class="relative flex items-center justify-center -ml-6 -mt-6 cursor-pointer group">
              <span class="absolute w-12 h-12 rounded-full ${hasCritical ? 'bg-red-500/30 animate-ping' : 'bg-emerald-500/30'}"></span>
              <div class="relative w-12 h-12 rounded-full border-2 border-white shadow-2xl flex flex-col items-center justify-center text-white font-black" style="background-color: ${badgeColor};">
                <span class="text-sm font-mono-num leading-none">${count}</span>
                <span class="text-[8px] uppercase tracking-tighter opacity-90">${city.slice(0, 3)}</span>
              </div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 24]
        });

        const clusterMarker = L.marker(group.coords, { icon: clusterIcon }).addTo(map);

        clusterMarker.bindPopup(`
          <div class="p-3 text-slate-900 font-sans text-xs">
            <strong class="text-sm text-slate-950 block">${city} Region</strong>
            <p class="text-slate-600 mt-1">${count} incidents tracked in this sector.</p>
            <div class="mt-2 pt-2 border-t border-slate-200">
              <button id="zoom-cluster-${city}" class="w-full py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer">
                Inspect Sector Cases
              </button>
            </div>
          </div>
        `);

        clusterMarker.on('popupopen', () => {
          setTimeout(() => {
            const btn = document.getElementById(`zoom-cluster-${city}`);
            if (btn) {
              btn.onclick = () => {
                setSelectedCity(city);
                setIsClusterMode(false);
                map.flyTo(group.coords, 13, { duration: 1.2 });
              };
            }
          }, 50);
        });

        clusterMarkersRef.current.push(clusterMarker);
      });

      return;
    }

    // 3. INDIVIDUAL DYNAMIC REAL MARKERS
    filtered.forEach((c) => {
      const isCritical = c.status === 'CRITICAL_ALERT';
      const isResolved = c.status === 'RESOLVED';

      // Authentic Google Pin with Photo and Alert Radar Wave
      const pinColor = isCritical ? '#dc2626' : isResolved ? '#16a34a' : '#2563eb';
      const customPinHtml = `
        <div class="google-pin-container relative flex flex-col items-center cursor-pointer group -ml-5 -mt-10" data-cursor="${isCritical ? 'alert' : 'pointer'}">
          <!-- Animated Radar Pulse Wave for active alerts -->
          ${isCritical ? '<div class="marker-radar-wave-red"></div>' : ''}
          ${isResolved ? '<div class="marker-radar-wave-green"></div>' : ''}
          
          <div class="relative w-10 h-10 rounded-full border-2 border-white shadow-2xl overflow-hidden" style="background-color: ${pinColor}">
            <img src="${c.photo}" class="w-full h-full object-cover" alt="${c.name}"/>
            ${isCritical ? '<div class="absolute inset-0 border-2 border-red-500 rounded-full"></div>' : ''}
          </div>
          
          <!-- Teardrop pointer bottom -->
          <div class="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] -mt-[1px]" style="border-t-color: ${pinColor};"></div>
          
          <!-- Ground shadow dot -->
          <div class="w-3 h-1.5 rounded-full bg-slate-950/60 blur-[1px] mt-0.5"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-google-marker',
        html: customPinHtml,
        iconSize: [40, 48],
        iconAnchor: [20, 44],
        popupAnchor: [0, -42]
      });

      const marker = L.marker(c.coordinates, { icon: customIcon }).addTo(map);

      // Tooltip preview on hover
      marker.bindTooltip(`
        <div class="text-xs font-sans text-slate-900 flex items-center gap-2 p-1">
          <img src="${c.photo}" class="w-7 h-7 rounded-full object-cover" />
          <div>
            <div class="font-bold text-slate-950">${c.name} (${c.age}y)</div>
            <div class="text-[10px] text-slate-600">${c.lastSeenLocation}</div>
          </div>
        </div>
      `, { direction: 'top', offset: [0, -44], opacity: 0.95 });

      // Click Popup with Photo, Name, Age, Last Seen, Time, and Action Buttons
      const popupDiv = document.createElement('div');
      popupDiv.className = 'w-64 sm:w-72 overflow-hidden text-slate-100 font-sans bg-[#0c1427] rounded-xl';
      popupDiv.innerHTML = `
        <div class="relative h-28 bg-slate-950 overflow-hidden">
          <img src="${c.photo}" class="w-full h-full object-cover object-top" alt="${c.name}"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0c1427] via-transparent to-transparent"></div>
          <div class="absolute top-2 left-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-wider ${
              isCritical ? 'bg-red-600 shadow-[0_0_8px_#ef4444]' : isResolved ? 'bg-emerald-600' : 'bg-blue-600'
            }">
              ${isCritical ? '🚨 CRITICAL ALERT' : isResolved ? '✓ REUNITED' : 'ACTIVE SEARCH'}
            </span>
          </div>
          <div class="absolute bottom-1 left-2.5 right-2.5 flex items-center justify-between text-white">
            <span class="font-display font-extrabold text-sm truncate drop-shadow-md">${c.name}</span>
            <span class="text-[11px] font-mono-num font-bold text-sky-300">${c.age}y · ${c.gender}</span>
          </div>
        </div>
        <div class="p-3.5 space-y-2 bg-[#0c1427]">
          <div class="text-xs text-slate-300 leading-snug">
            <strong class="text-white">Last Seen:</strong> ${c.lastSeenLocation}
          </div>
          <div class="text-[11px] text-slate-400 flex items-center justify-between font-mono-num">
            <span>City: <strong class="text-slate-200">${c.city}</strong></span>
            <span>Alert Radius: <strong class="text-red-400">${c.geoRadiusKm || 5.5} km</strong></span>
          </div>
          <div class="text-[11px] text-slate-400 font-mono-num">
            <span>Time: </span><span class="text-slate-200">${c.lastSeenTime}</span>
          </div>
          <div class="pt-2 border-t border-slate-800 flex items-center gap-2">
            <button id="view-case-${c.id}" class="flex-1 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer text-center">
              View Details
            </button>
            ${!isResolved ? `
              <button id="report-sight-${c.id}" class="flex-1 py-2 px-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer text-center shadow-md">
                Report Sighting
              </button>
            ` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupDiv, { maxWidth: 300, minWidth: 260 });

      marker.on('popupopen', () => {
        sound.playRadarPing();
        setTimeout(() => {
          const viewBtn = document.getElementById(`view-case-${c.id}`);
          if (viewBtn) viewBtn.onclick = () => onSelectCase(c);
          const sightBtn = document.getElementById(`report-sight-${c.id}`);
          if (sightBtn) sightBtn.onclick = () => onReportSighting(c);
        }, 50);
      });

      markersRef.current.push(marker);

      // 4. ANIMATED GEO-FENCING RADIUS CIRCLE
      if (isCritical && c.geoRadiusKm) {
        const circle = L.circle(c.coordinates, {
          radius: c.geoRadiusKm * 1000,
          color: '#ef4444',
          fillColor: '#ef4444',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '5, 8'
        }).addTo(map);

        circlesRef.current.push(circle);
      }
    });
  }, [cases, filterType, selectedCity, isHeatmapEnabled, isClusterMode]);

  const cities = ['ALL', 'New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Ahmedabad', 'Varanasi', 'Jaipur', 'Chennai', 'Chandigarh'];

  return (
    <section className="py-12 bg-[#050914] border-t border-b border-[#141f33]" data-cursor="map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-950/70 text-sky-400 border border-blue-800/80 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE INCIDENT RADAR & SATELLITE TELEMETRY</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono-num">{lastTelemetryPing}</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Live Missing Person Incident Map
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Real-world road networks, active search perimeters, dynamic red/green alert beacons, and crowdsourced sighting vectors.
            </p>
          </div>

          {/* Demographic Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex-wrap">
            {[
              { id: 'ALL', label: 'All Cases' },
              { id: 'CHILD', label: '👶 Kids' },
              { id: 'WOMAN', label: '👩 Women' },
              { id: 'MAN', label: '👨 Men' },
              { id: 'SENIOR', label: '👴 Seniors' },
              { id: 'RESOLVED', label: '✓ Reunited' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playRadarPing();
                  setFilterType(tab.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Interactive Map Canvas Card */}
        <div className={`relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-[0_15px_50px_rgba(0,0,0,0.7)] bg-[#070d18] ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[620px]'
        }`}>
          
          {/* Top Left: Google Maps Style Search & Quick City Jump */}
          <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
            <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md text-white p-1.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-1.5">
              <div className="flex items-center gap-1 pl-2 pr-1 text-sky-400 font-bold text-xs">
                <Crosshair className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                <span>Jump Sector:</span>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[300px] sm:max-w-md scrollbar-none">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      if (city === 'New Delhi') handleFlyTo([28.6328, 77.2197], 13);
                      else if (city === 'Mumbai') handleFlyTo([19.0988, 72.8267], 13);
                      else if (city === 'Bengaluru') handleFlyTo([12.9763, 77.5929], 13);
                      else if (city === 'Kolkata') handleFlyTo([22.5511, 88.3526], 13);
                      else if (city === 'Ahmedabad') handleFlyTo([23.0225, 72.5714], 13);
                      else if (city === 'Varanasi') handleFlyTo([25.3076, 83.0107], 13);
                      else if (city === 'Jaipur') handleFlyTo([26.9239, 75.8267], 13);
                      else if (city === 'Chennai') handleFlyTo([13.0334, 80.2699], 13);
                      else if (city === 'Chandigarh') handleFlyTo([30.7398, 76.7827], 13);
                      else if (city === 'ALL') handleFlyTo([22.5937, 78.9629], 5);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCity === city
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Top Right: Advanced Map Tools & Layer Switcher */}
          <div className="absolute top-3 right-3 z-20 pointer-events-auto flex items-center gap-1.5 flex-wrap justify-end">
            
            {/* Locate Me Button */}
            <button
              onClick={handleLocateUser}
              disabled={isLocatingUser}
              className="px-3 py-1.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 backdrop-blur-md border border-slate-700 text-sky-400 hover:text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              title="Detect your live geolocation"
            >
              <LocateFixed className={`w-3.5 h-3.5 ${isLocatingUser ? 'animate-spin text-amber-400' : 'text-sky-400'}`} />
              <span>{isLocatingUser ? 'Locating...' : 'Locate Me'}</span>
            </button>

            {/* Heatmap Toggle */}
            <button
              onClick={() => {
                sound.playRadarPing();
                setIsHeatmapEnabled(!isHeatmapEnabled);
              }}
              className={`px-3 py-1.5 rounded-xl backdrop-blur-md border font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${
                isHeatmapEnabled
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-slate-950/90 hover:bg-slate-900 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Toggle Heatmap of High-Risk Areas"
            >
              <Flame className={`w-3.5 h-3.5 ${isHeatmapEnabled ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Heatmap</span>
            </button>

            {/* Cluster Toggle */}
            <button
              onClick={() => {
                sound.playRadarPing();
                setIsClusterMode(!isClusterMode);
              }}
              className={`px-3 py-1.5 rounded-xl backdrop-blur-md border font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${
                isClusterMode
                  ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-950/90 hover:bg-slate-900 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Toggle Cluster Markers for Multiple Cases"
            >
              <Users2 className={`w-3.5 h-3.5 ${isClusterMode ? 'text-sky-300' : 'text-slate-400'}`} />
              <span>Cluster</span>
            </button>

            {/* Map Theme / Tile Switcher */}
            <div className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-700">
              <button
                onClick={() => handleSwitchLayer('TACTICAL_DARK')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLayerType === 'TACTICAL_DARK'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                🌑 Dark
              </button>
              <button
                onClick={() => handleSwitchLayer('GOOGLE_STREETS')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLayerType === 'GOOGLE_STREETS'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                🗺️ Roads
              </button>
              <button
                onClick={() => handleSwitchLayer('GOOGLE_SATELLITE')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLayerType === 'GOOGLE_SATELLITE'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                🛰️ Sat
              </button>
              <button
                onClick={() => handleSwitchLayer('GOOGLE_TERRAIN')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLayerType === 'GOOGLE_TERRAIN'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                🏔️ Terrain
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-lg"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Leaflet Map DOM Element */}
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Bottom Left: Map Legend */}
          <div className="absolute bottom-3 left-3 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-xl text-xs text-slate-200 shadow-xl flex items-center gap-4 flex-wrap pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="font-bold text-white">Active Missing Cases</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              <span className="font-bold text-emerald-400">Reunited Persons</span>
            </div>

            <div className="hidden sm:inline text-slate-400 border-l border-slate-800 pl-3 text-[11px]">
              Click any pin to inspect case dossier & report sightings
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
