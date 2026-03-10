import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, Cpu } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing System...');

  useEffect(() => {
    const totalDurationMs = 700;
    const start = performance.now();
    let raf = 0;

    const update = (current: number) => {
      const elapsed = current - start;
      const next = Math.min(100, Math.round((elapsed / totalDurationMs) * 100));
      setProgress(next);

      if (next < 100) {
        raf = requestAnimationFrame(update);
      }
    };

    raf = requestAnimationFrame(update);

    const statuses = [
      'Loading Core Modules...',
      'Connecting to Neural Network...',
      'Optimizing Assets...',
      'System Ready.',
    ];

    let statusIndex = 0;
    const statusTimer = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      setStatus(progress < 100 ? statuses[statusIndex] : 'System Ready.');
    }, 220);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(statusTimer);
    };
  }, []);

  useEffect(() => {
    if (progress !== 100) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 120);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-md px-8 relative">
        {/* Animated Icons Background */}
        <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none -z-10">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                 <Cpu size={200} />
             </motion.div>
        </div>

        <div className="flex justify-between items-end mb-4">
            <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-brandOrange rounded flex items-center justify-center animate-pulse">
                     <Activity className="text-white w-5 h-5" />
                 </div>
                 <span className="text-white font-bold text-xl tracking-tight">COLLABY.T</span>
            </div>
            <span className="text-brandOrange text-2xl font-bold">{Math.min(100, Math.round(progress))}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-4">
             <motion.div 
                className="h-full bg-brandOrange shadow-[0_0_15px_rgba(255,90,31,0.8)]"
                style={{ width: `${progress}%` }}
             />
        </div>

        <div className="flex justify-between text-xs text-slate-500 uppercase tracking-widest">
            <motion.span 
                key={status} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="font-mono"
            >
                {status}
            </motion.span>
            <span className="flex items-center gap-1">
                <Code2 size={10} /> v2.4.0
            </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
