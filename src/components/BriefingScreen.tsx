import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ShieldAlert, 
  Users, 
  Target,
  PlayCircle
} from "lucide-react";

interface BriefingScreenProps {
  playerName: string;
  onBegin: () => void;
  key?: string;
}

export default function BriefingScreen({ playerName, onBegin }: BriefingScreenProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center p-6 overflow-y-auto"
    >
      <div className="pixel-card w-full max-w-2xl space-y-8 my-8 bg-slate-900/90 border-slate-700">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white leading-relaxed">
            OPERATOR: {playerName}
          </h2>
          <div className="h-1 w-full bg-slate-800" />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-slate-800 bg-slate-950 text-center">
              <ShieldAlert className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-bold text-slate-300">PRESSURE RESPONSE</p>
            </div>
            <div className="p-4 border-2 border-slate-800 bg-slate-950 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-bold text-slate-300">TRUST IMPACT</p>
            </div>
            <div className="p-4 border-2 border-slate-800 bg-slate-950 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-bold text-slate-300">CRITICAL DECISIONS</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-slate-400 text-center">
            YOUR DECISIONS IN THE FIELD WILL IMPACT SAFETY, TRUST, AND GROWTH. STAY FOCUSED ON OPERATIONAL INTEGRITY.
          </p>
        </div>

        <div className="flex items-center space-x-4 p-6 bg-slate-950 border-4 border-slate-800">
          <Checkbox 
            id="ready" 
            checked={isReady} 
            onCheckedChange={(checked) => setIsReady(checked as boolean)}
            className="h-8 w-8 border-4 border-slate-700 data-[state=checked]:bg-orange-500 rounded-none"
          />
          <label 
            htmlFor="ready" 
            className="text-xl font-bold text-slate-200 cursor-pointer select-none"
          >
            CONFIRM READINESS
          </label>
        </div>

        <Button
          onClick={onBegin}
          disabled={!isReady}
          className="pixel-button h-20 w-full text-2xl disabled:opacity-50"
        >
          BEGIN MISSION
        </Button>
      </div>
    </motion.div>
  );
}
