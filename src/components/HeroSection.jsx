import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Radio, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Activity,
  Globe2,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function HeroSection({ 
  onOpenReport, 
  onNavigateToMap, 
  stats, 
  onNavigateToDashboard, 
  userSession, 
  onTriggerEmergencyAlert 
}) {
  const canvasRef = useRef(null);

  // Animated counters
  const [activeCasesCount, setActiveCasesCount] = useState(0);
  const [peopleFoundCount, setPeopleFoundCount] = useState(0);
  const [alertsSentCount, setAlertsSentCount] = useState(0);

  useEffect(() => {
    const targetCases = stats.activeCases || 142;
    const targetFound = stats.peopleFound || 3894;
    const targetAlerts = 1482900;

    let startTime;
    const duration = 2000;

    const animateCounters = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setActiveCasesCount(Math.floor(ease * targetCases));
      setPeopleFoundCount(Math.floor(ease * targetFound));
      setAlertsSentCount(Math.floor(ease * targetAlerts));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    const animId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(animId);
  }, [stats]);

  // Interactive Animated Real-time Map Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Map Nodes representing emergency response hubs (approximate coordinates normalized 0 to 1)
    const nodes = [
      { x: 0.28, y: 0.32, label: 'Delhi NCR', pulse: 0, speed: 0.03, color: '#ef4444', isAlert: true },
      { x: 0.24, y: 0.58, label: 'Mumbai', pulse: 0.5, speed: 0.025, color: '#ef4444', isAlert: true },
      { x: 0.32, y: 0.74, label: 'Bengaluru', pulse: 0.2, speed: 0.02, color: '#3b82f6', isAlert: false },
      { x: 0.58, y: 0.44, label: 'Kolkata', pulse: 0.8, speed: 0.028, color: '#10b981', isAlert: false },
      { x: 0.36, y: 0.82, label: 'Chennai', pulse: 0.4, speed: 0.022, color: '#3b82f6', isAlert: false },
      { x: 0.22, y: 0.42, label: 'Ahmedabad', pulse: 0.6, speed: 0.026, color: '#ef4444', isAlert: true },
      { x: 0.44, y: 0.40, label: 'Varanasi', pulse: 0.1, speed: 0.024, color: '#ef4444', isAlert: true },
      { x: 0.26, y: 0.36, label: 'Jaipur', pulse: 0.7, speed: 0.021, color: '#3b82f6', isAlert: false },
      { x: 0.35, y: 0.64, label: 'Hyderabad', pulse: 0.3, speed: 0.023, color: '#10b981', isAlert: false },
      { x: 0.75, y: 0.35, label: 'Guwahati', pulse: 0.9, speed: 0.019, color: '#3b82f6', isAlert: false },
    ];

    // Traveling packet signals
    const packets = [
      { from: 0, to: 1, progress: 0.1, speed: 0.007 },
      { from: 0, to: 6, progress: 0.4, speed: 0.009 },
      { from: 1, to: 2, progress: 0.6, speed: 0.006 },
      { from: 2, to: 4, progress: 0.2, speed: 0.008 },
      { from: 6, to: 3, progress: 0.8, speed: 0.007 },
      { from: 0, to: 7, progress: 0.5, speed: 0.011 },
      { from: 1, to: 5, progress: 0.3, speed: 0.008 },
    ];

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw subtle geospatial coordinate grid
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw faint concentric tactical radar rings centered at top middle
      const centerX = w * 0.5;
      const centerY = h * 0.42;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      for (let r = 80; r < Math.max(w, h); r += 90) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw radar sweep beam
      radarAngle += 0.008;
      const sweepLength = Math.max(w, h);
      const sweepGradient = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, sweepLength * 0.6
      );
      sweepGradient.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      sweepGradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.04)');
      sweepGradient.addColorStop(1, 'transparent');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, sweepLength * 0.6, radarAngle - 0.4, radarAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();
      ctx.restore();

      // Draw connecting lines between nodes
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.22)';
      ctx.lineWidth = 1;
      packets.forEach((p) => {
        const n1 = nodes[p.from];
        const n2 = nodes[p.to];
        const x1 = n1.x * w;
        const y1 = n1.y * h;
        const x2 = n2.x * w;
        const y2 = n2.y * h;

        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Render traveling data signal packet
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const px = x1 + (x2 - x1) * p.progress;
        const py = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes and pulsing perimeter circles
      nodes.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;

        node.pulse += node.speed;
        if (node.pulse > 1) node.pulse = 0;

        // Pulsing radar ring
        const maxRadius = node.isAlert ? 32 : 22;
        const currentRadius = node.pulse * maxRadius;
        const opacity = (1 - node.pulse) * 0.7;

        ctx.beginPath();
        ctx.arc(nx, ny, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = node.isAlert ? `rgba(239, 68, 68, ${opacity})` : `rgba(59, 130, 246, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node center beacon dot
        ctx.beginPath();
        ctx.arc(nx, ny, node.isAlert ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = node.isAlert ? 'rgba(252, 165, 165, 0.75)' : 'rgba(148, 163, 184, 0.75)';
        ctx.fillText(node.label, nx + 8, ny + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#141f33] bg-gradient-to-b from-[#040814] via-[#060c1c] to-[#070d1a] overflow-hidden">
      
      {/* Real-time Animated Map Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
      />

      {/* Top glowing ambient spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Top Status Pill - Fade in */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-slate-950/80 text-slate-300 text-xs font-semibold shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wider uppercase font-mono-num text-[11px] text-slate-200">
            SMART MISSING PERSON RAPID EMERGENCY GRID
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-sky-400 font-mono-num text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>UIDAI & CCTNS INTEGRATED</span>
          </span>
        </div>

        {/* Main Headline with Text Fade + Slide Animation */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08]">
            Every Second{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(239,68,68,0.4)]">
              Matters.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-300 font-light leading-relaxed">
            <strong className="text-white font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Report Missing. Act Fast. Save Lives.
            </strong>
            <span className="block text-sm sm:text-base text-slate-400 mt-2 font-normal">
              Connecting families, police commissionerates, and citizens in real-time during the crucial golden hour.
            </span>
          </p>
        </div>

        {/* Primary Action Buttons with Glowing Hover States */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <button
            onClick={() => {
              sound.playEmergencyAlert();
              onOpenReport();
            }}
            data-cursor="alert"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-red-400/40"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>🚨 Report Missing Person</span>
            <ArrowRight className="w-4 h-4 text-rose-200" />
          </button>

          <button
            onClick={onNavigateToMap}
            data-cursor="map"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800/95 text-slate-100 hover:text-white border border-sky-500/40 hover:border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>📍 View Live Map</span>
          </button>

          <button
            onClick={onNavigateToDashboard}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Command Center</span>
          </button>

          {onTriggerEmergencyAlert && (
            <button
              onClick={onTriggerEmergencyAlert}
              data-cursor="alert"
              className="w-full sm:w-auto px-5 py-4 rounded-xl font-bold text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-red-500/40 hover:border-red-500 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              title="Pop up active emergency missing alert"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Simulate Alert Pop-up</span>
            </button>
          )}
        </div>

        {/* Live Impact Counters with Animated Counting Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 text-left animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          
          {/* Active Cases */}
          <div className="glass-card rounded-2xl p-5 border border-red-500/30 bg-slate-950/70 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Active Cases</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
              {activeCasesCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Under active search</span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full w-3/4" />
            </div>
          </div>

          {/* People Found */}
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-slate-950/70 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">People Found</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
              {peopleFoundCount.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>98.2% case recovery rate</span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-11/12" />
            </div>
          </div>

          {/* Alerts Sent */}
          <div className="glass-card rounded-2xl p-5 border border-sky-500/30 bg-slate-950/70 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Alerts Sent</span>
              <Radio className="w-4 h-4 text-sky-400" />
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
              {alertsSentCount.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Cell broadcast & SMS</span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-blue-500 h-full rounded-full w-4/5" />
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 bg-slate-950/70 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Avg. Broadcast</span>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white font-mono-num">
              {stats.avgResponseTime || '11.4 min'}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>FIR to cell tower push</span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-2/3" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
