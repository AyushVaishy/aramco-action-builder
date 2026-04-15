import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LandingScreenProps {
  onStart: (name: string, avatar: string) => void;
  key?: string;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      onStart(name, "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + name);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-2xl space-y-12">
        {/* Title Section */}
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#f97316] drop-shadow-[6px_6px_0px_rgba(0,0,0,0.8)] tracking-tighter leading-none">
              FEEDBACK<br />OPS
            </h1>
          </motion.div>
          <p className="text-lg md:text-xl font-bold text-slate-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] uppercase tracking-[0.2em]">
            INDUSTRIAL RESPONSE UNIT
          </p>
        </div>

        {/* Interaction Section */}
        <div className="space-y-8">
          <div className="relative">
            <Input
              placeholder="OPERATOR ID / NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-20 border-4 border-slate-700 bg-slate-900/80 text-white text-center text-xl font-bold placeholder:text-slate-600 focus-visible:ring-0 rounded-none"
            />
          </div>

          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            className="pixel-button h-20 w-full text-2xl disabled:opacity-50"
          >
            INITIALIZE MISSION
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
