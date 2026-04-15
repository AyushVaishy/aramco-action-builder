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
      <div className="pixel-card w-full max-w-2xl space-y-8 my-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 leading-relaxed">
            READY, {playerName}?
          </h2>
          <div className="h-1 w-full bg-black/10" />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-black/10 bg-slate-50 text-center">
              <ShieldAlert className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-sm font-bold">PRESSURE RESPONSE</p>
            </div>
            <div className="p-4 border-2 border-black/10 bg-slate-50 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-bold">TRUST IMPACT</p>
            </div>
            <div className="p-4 border-2 border-black/10 bg-slate-50 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-bold">CRITICAL DECISIONS</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-slate-600 text-center">
            YOUR DECISIONS IN THE FIELD WILL IMPACT SAFETY, TRUST, AND GROWTH. STAY FOCUSED.
          </p>
        </div>

        <div className="flex items-center space-x-4 p-6 bg-slate-100 border-4 border-black">
          <Checkbox 
            id="ready" 
            checked={isReady} 
            onCheckedChange={(checked) => setIsReady(checked as boolean)}
            className="h-8 w-8 border-4 border-black data-[state=checked]:bg-green-500 rounded-none"
          />
          <label 
            htmlFor="ready" 
            className="text-xl font-bold text-slate-900 cursor-pointer select-none"
          >
            I AM READY TO BEGIN
          </label>
        </div>

        <Button
          onClick={onBegin}
          disabled={!isReady}
          className="pixel-button h-20 w-full text-2xl disabled:opacity-50"
        >
          START SIMULATION
        </Button>
      </div>
    </motion.div>
  );
}
