import React from 'react';

interface CardFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFrame: React.FC<CardFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-1 bg-amber-700/30 rounded-lg shadow-2xl backdrop-blur-sm ${className}`}>
      {/* Outer Border (Gold) */}
      <div className="absolute inset-0 border border-amber-600/50 rounded-lg pointer-events-none"></div>
      
      {/* Inner Decorative Border */}
      <div className="relative h-full w-full border-2 border-double border-amber-500/80 rounded-md bg-slate-900/90 flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
        
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 text-amber-500/40 text-xl">✦</div>
        <div className="absolute top-2 right-2 text-amber-500/40 text-xl">✦</div>
        <div className="absolute bottom-2 left-2 text-amber-500/40 text-xl">✦</div>
        <div className="absolute bottom-2 right-2 text-amber-500/40 text-xl">✦</div>

        {/* Top Moon/Sun Icon */}
        <div className="absolute top-4 w-full flex justify-center opacity-30">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1">
             <circle cx="12" cy="12" r="10" />
             <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10" />
           </svg>
        </div>

        {children}
      </div>
    </div>
  );
};
