import { motion } from "motion/react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#70c5ce]">
      {/* Clouds */}
      <div className="absolute top-20 w-full">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 opacity-80"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-12 w-24 bg-white rounded-full relative">
              <div className="absolute -top-4 left-4 h-10 w-10 bg-white rounded-full" />
              <div className="absolute -top-2 left-10 h-10 w-10 bg-white rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pipes (Static for background feel) */}
      <div className="absolute inset-0 flex justify-around pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="relative h-full flex flex-col justify-between">
            {/* Top Pipe */}
            <div className="w-16 bg-[#73bf2e] border-x-4 border-b-4 border-black relative" style={{ height: '20%' }}>
              <div className="absolute bottom-0 -left-2 -right-2 h-8 bg-[#73bf2e] border-4 border-black" />
              <div className="absolute inset-y-0 left-2 w-2 bg-white/20" />
            </div>
            {/* Bottom Pipe */}
            <div className="w-16 bg-[#73bf2e] border-x-4 border-t-4 border-black relative" style={{ height: '30%' }}>
              <div className="absolute top-0 -left-2 -right-2 h-8 bg-[#73bf2e] border-4 border-black" />
              <div className="absolute inset-y-0 left-2 w-2 bg-white/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 w-full h-24 bg-[#ded895] border-t-4 border-black">
        <div className="h-4 w-full bg-[#73bf2e] border-b-4 border-black" />
        <div className="flex w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="w-8 h-full border-r border-black/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
