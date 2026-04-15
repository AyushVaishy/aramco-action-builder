import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  RefreshCcw,
  ArrowRight
} from "lucide-react";

interface ResultScreenProps {
  playerName: string;
  stats: {
    meters: { safety: number; trust: number; growth: number };
    xp: number;
    performance: { acknowledge: number; clarify: number; act: number; sustain: number };
    choicesMade: string[];
  };
  onReplay: () => void;
  key?: string;
}

export default function ResultScreen({ playerName, stats, onReplay }: ResultScreenProps) {
  const getProfile = () => {
    const counts = stats.choicesMade.reduce((acc: any, choice: string) => {
      acc[choice] = (acc[choice] || 0) + 1;
      return acc;
    }, {});

    const openCount = counts["STAY OPEN"] || 0;
    const understandCount = counts["UNDERSTAND"] || 0;
    const defendCount = counts["DEFEND"] || 0;
    const total = stats.choicesMade.length;

    if (defendCount / total > 0.4) return {
      type: "REACTIVE DEFENDER",
      desc: "YOU TEND TO PRIORITIZE SELF-PROTECTION OVER OPERATIONAL TRUTH. THIS CREATES A DANGEROUS SILO WHERE CRITICAL SAFETY FEEDBACK IS IGNORED OR DISMISSED.",
      strengths: ["- PROTECTIVE OF PERSONAL WORKFLOW", "- QUICK VERBAL RESPONSE"],
      areas: ["- PSYCHOLOGICAL SAFETY", "- ADAPTABILITY TO CHANGE"],
      rec: "PRACTICE THE 'PAUSE' TECHNIQUE. WHEN FEEDBACK HITS, WAIT 5 SECONDS BEFORE SPEAKING TO LOWER YOUR DEFENSIVE SHIELD."
    };
    if (understandCount / total > 0.4) return {
      type: "PROACTIVE LEARNER",
      desc: "YOU VIEW EVERY INTERACTION AS A DATA POINT FOR GROWTH. YOU BUILD HIGH TRUST BY SEEKING THE 'WHY' BEHIND EVERY CORRECTION, REDUCING SYSTEMIC RISKS.",
      strengths: ["- HIGH SITUATIONAL AWARENESS", "- SYSTEMIC THINKING"],
      areas: ["- SPEED OF ACKNOWLEDGMENT", "- DECISIVENESS UNDER FIRE"],
      rec: "ENSURE YOU ACKNOWLEDGE THE FEEDBACK IMMEDIATELY BEFORE DIVING INTO DEEP CLARIFYING QUESTIONS."
    };
    if (openCount / total > 0.5) return {
      type: "HIGH-INTEGRITY ADAPTER",
      desc: "YOU ARE THE BACKBONE OF A SAFETY CULTURE. YOU OWN MISTAKES IMMEDIATELY AND PIVOT TO CORRECTIVE ACTION WITHOUT EGO, ENSURING TEAM ALIGNMENT.",
      strengths: ["- EXTREME OWNERSHIP", "- TEAM COHESION"],
      areas: ["- ROOT CAUSE ANALYSIS", "- ASSERTIVE INQUIRY"],
      rec: "DON'T JUST FIX THE PROBLEM; ASK MORE QUESTIONS TO ENSURE THE SYSTEM PREVENTS IT FROM HAPPENING AGAIN."
    };
    return {
      type: "BALANCED OPERATOR",
      desc: "YOU ADAPT YOUR RESPONSE STYLE TO THE SITUATION, BALANCING IMMEDIATE ACTION WITH NECESSARY INQUIRY TO MAINTAIN BOTH SPEED AND SAFETY.",
      strengths: ["- VERSATILE COMMUNICATION", "- EMOTIONAL INTELLIGENCE"],
      areas: ["- CONSISTENCY IN HIGH STRESS", "- DEEP TECHNICAL CURIOSITY"],
      rec: "CONTINUE TO CHALLENGE YOURSELF BY ASKING 'WHAT ELSE COULD GO WRONG?' EVEN WHEN YOU'VE ACCEPTED THE FEEDBACK."
    };
  };

  const profile = getProfile();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center p-6 overflow-y-auto"
    >
      <div className="pixel-card w-full max-w-2xl space-y-8 text-center my-8">
        <div className="space-y-4">
          <Trophy className="h-16 w-16 text-[#f7b500] mx-auto drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
          <h2 className="text-4xl font-bold text-slate-900">
            MISSION COMPLETE
          </h2>
          <p className="text-xl font-bold text-teal-600 uppercase tracking-widest">{playerName}</p>
        </div>

        <div className="bg-black text-white p-6 border-4 border-white shadow-xl">
          <p className="text-xl text-[#f7b500] font-bold mb-3">{profile.type}</p>
          <p className="text-base leading-relaxed opacity-90">{profile.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-slate-900 border-4 border-slate-700 p-6">
            <p className="text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">STRENGTHS</p>
            <div className="space-y-2">
              {profile.strengths.map(s => <p key={s} className="text-sm font-bold text-slate-300">{s}</p>)}
            </div>
          </div>
          <div className="bg-slate-900 border-4 border-slate-700 p-6">
            <p className="text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">IMPROVEMENTS</p>
            <div className="space-y-2">
              {profile.areas.map(a => <p key={a} className="text-sm font-bold text-slate-300">{a}</p>)}
            </div>
          </div>
        </div>

        <div className="space-y-6 text-left">
          <p className="text-xs font-black text-slate-500 text-center uppercase tracking-widest">FINAL SCORES</p>
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold w-24 text-slate-300">SAFETY</span>
              <div className="flex-1 h-6 bg-slate-800 border-4 border-slate-700">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${stats.meters.safety}%` }} />
              </div>
              <span className="text-sm font-bold w-12 text-right text-blue-400">{stats.meters.safety}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold w-24 text-slate-300">TRUST</span>
              <div className="flex-1 h-6 bg-slate-800 border-4 border-slate-700">
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${stats.meters.trust}%` }} />
              </div>
              <span className="text-sm font-bold w-12 text-right text-red-400">{stats.meters.trust}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold w-24 text-slate-300">GROWTH</span>
              <div className="flex-1 h-6 bg-slate-800 border-4 border-slate-700">
                <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${stats.meters.growth}%` }} />
              </div>
              <span className="text-sm font-bold w-12 text-right text-green-400">{stats.meters.growth}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border-4 border-orange-600 p-6 text-lg text-orange-400 italic font-medium leading-relaxed shadow-[inset_0_0_20px_rgba(249,115,22,0.1)]">
          <span className="font-black mr-2 text-orange-500">RECOMMENDATION:</span> {profile.rec}
        </div>

        <div className="pt-4">
          <Button
            onClick={onReplay}
            className="pixel-button h-20 w-full text-2xl"
          >
            REPLAY MISSION
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
