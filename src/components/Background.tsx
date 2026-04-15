import { motion } from "motion/react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      {/* Base Image with Faded Effect */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070"
          alt="Industrial Background"
          className="h-full w-full object-cover opacity-20 grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#0f172a]/60 to-[#0f172a]/90 backdrop-blur-[2px]" />
      </div>

      {/* Industrial Grid Overlay */}
      <div className="absolute inset-0 industrial-grid opacity-30" />

      {/* Structural Elements (Girders/Pipes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical Girders */}
        <div className="absolute inset-y-0 left-1/4 w-12 bg-slate-800/20 border-x border-slate-700/30" />
        <div className="absolute inset-y-0 right-1/4 w-12 bg-slate-800/20 border-x border-slate-700/30" />
        
        {/* Glowing Energy Lines */}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/3 w-full h-0.5 bg-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 w-full h-0.5 bg-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        />
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, "-10%"],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
