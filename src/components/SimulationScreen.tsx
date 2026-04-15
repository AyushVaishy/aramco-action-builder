import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Heart, 
  TrendingUp, 
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimulationScreenProps {
  playerName: string;
  onComplete: (stats: any) => void;
  key?: string;
}

const LEVELS = [
  {
    id: 1,
    name: "LEVEL 1",
    label: "BASIC AWARENESS",
    scenarios: [
      {
        id: "1-1",
        messages: [
          "HEY, I NOTICED SOMETHING.",
          "YOUR GLOVES ARE MISSING.",
          "YOU'RE NEAR THE CHEMICAL RACK."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "THANKS FOR THE CATCH. I'LL PUT THEM ON.",
            type: "positive", 
            feedback: "TEAM TRUSTS YOUR SAFETY FOCUS.", 
            followUp: "GOOD. LET'S KEEP IT SAFE.",
            meters: { trust: 10, growth: 5, safety: 10 } 
          },
          { 
            action: "UNDERSTAND",
            label: "WHICH GLOVES ARE REQUIRED HERE?",
            type: "neutral", 
            feedback: "YOU GAINED CRITICAL KNOWLEDGE.", 
            followUp: "THE NITRILE ONES. THEY'RE IN THE BIN.",
            meters: { trust: 5, growth: 10, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "I WAS ONLY THERE FOR A SECOND.",
            type: "negative", 
            feedback: "TEAM FEELS YOU'RE DISMISSIVE.", 
            followUp: "A SECOND IS ALL IT TAKES, MATE.",
            meters: { trust: -10, growth: 0, safety: -10 } 
          },
        ]
      },
      {
        id: "1-2",
        messages: [
          "WATCH YOUR STEP!",
          "THAT TOOLBOX IS A TRIP HAZARD.",
          "IT'S RIGHT IN THE WALKWAY."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "MY BAD. MOVING IT NOW.",
            type: "positive", 
            feedback: "WALKWAY IS CLEAR. TRUST UP.", 
            followUp: "CHEERS. APPRECIATE IT.",
            meters: { trust: 10, growth: 5, safety: 10 } 
          },
          { 
            action: "UNDERSTAND",
            label: "WHERE SHOULD I STORE THIS INSTEAD?",
            type: "neutral", 
            feedback: "ORGANIZATION IMPROVED.", 
            followUp: "USE THE RACK BY THE DOOR.",
            meters: { trust: 5, growth: 10, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "I'M STILL USING IT.",
            type: "negative", 
            feedback: "OTHERS ARE NOW AT RISK.", 
            followUp: "STILL A HAZARD, REGARDLESS.",
            meters: { trust: -10, growth: 0, safety: -10 } 
          },
        ]
      },
      {
        id: "1-3",
        messages: [
          "YOU'RE LATE FOR THE HANDOVER.",
          "THE NIGHT SHIFT IS WAITING.",
          "WE NEED TO START THE BRIEFING."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "APOLOGIES. I'M READY TO START NOW.",
            type: "positive", 
            feedback: "ACCOUNTABILITY BUILDS RESPECT.", 
            followUp: "OKAY, LET'S GET THROUGH THIS QUICKLY.",
            meters: { trust: 10, growth: 5, safety: 5 } 
          },
          { 
            action: "UNDERSTAND",
            label: "DID I MISS ANY CRITICAL UPDATES YET?",
            type: "neutral", 
            feedback: "FOCUSING ON INFORMATION FLOW.", 
            followUp: "JUST THE WEATHER REPORT. SIT DOWN.",
            meters: { trust: 5, growth: 10, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "TRAFFIC WAS UNBELIEVABLE TODAY.",
            type: "negative", 
            feedback: "EXCUSES DON'T HELP THE TEAM.", 
            followUp: "WE ALL DEAL WITH TRAFFIC, MATE.",
            meters: { trust: -10, growth: 0, safety: -5 } 
          },
        ]
      }
    ],
    timer: 10
  },
  {
    id: 2,
    name: "LEVEL 2",
    label: "APPLIED THINKING",
    scenarios: [
      {
        id: "2-1",
        messages: [
          "STOP THE PUMP.",
          "YOU SKIPPED STEP 4 IN THE STARTUP.",
          "WE CAN'T BYPASS PROCEDURES."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "YOU'RE RIGHT. RESTARTING FROM STEP 1.",
            type: "positive", 
            feedback: "INTEGRITY MAINTAINED.", 
            followUp: "BETTER SAFE THAN SORRY.",
            meters: { trust: 5, growth: 5, safety: 15 } 
          },
          { 
            action: "UNDERSTAND",
            label: "WHY IS STEP 4 CRITICAL FOR THIS UNIT?",
            type: "neutral", 
            feedback: "SYSTEM KNOWLEDGE INCREASED.", 
            followUp: "IT PREVENTS PRESSURE SURGES.",
            meters: { trust: 5, growth: 15, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "IT'S A WASTE OF TIME. I KNOW THIS RIG.",
            type: "negative", 
            feedback: "OVERCONFIDENCE CREATES RISK.", 
            followUp: "COMPLACENCY KILLS, REMEMBER THAT.",
            meters: { trust: -15, growth: 0, safety: -15 } 
          },
        ]
      },
      {
        id: "2-2",
        messages: [
          "THE TEAM IS FRUSTRATED.",
          "YOU RUSHED THE SAFETY BRIEF.",
          "PEOPLE HAVE QUESTIONS YOU IGNORED."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "I WAS RUSHING. LET'S RE-OPEN THE FLOOR.",
            type: "positive", 
            feedback: "LEADERSHIP THROUGH HUMILITY.", 
            followUp: "THANKS. WE HAVE A FEW CONCERNS.",
            meters: { trust: 15, growth: 5, safety: 5 } 
          },
          { 
            action: "UNDERSTAND",
            label: "WHICH SPECIFIC POINTS WERE UNCLEAR?",
            type: "neutral", 
            feedback: "CLARITY IMPROVES EXECUTION.", 
            followUp: "THE LOCK-OUT PROCEDURE ON VALVE 2.",
            meters: { trust: 10, growth: 15, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "WE HAVE A DEADLINE TO HIT.",
            type: "negative", 
            feedback: "PRODUCTION OVER SAFETY IS RISKY.", 
            followUp: "DEADLINES DON'T MATTER IF WE'RE HURT.",
            meters: { trust: -20, growth: -5, safety: -5 } 
          },
        ]
      },
      {
        id: "2-3",
        messages: [
          "THIS LOG IS INCOMPLETE.",
          "TANK C DATA IS MISSING AGAIN.",
          "WE NEED THIS FOR THE AUDIT."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "I'LL GO BACK AND VERIFY THE SENSORS.",
            type: "positive", 
            feedback: "DILIGENCE PREVENTS AUDIT FAILS.", 
            followUp: "MAKE SURE YOU SIGN OFF ON IT.",
            meters: { trust: 10, growth: 5, safety: 5 } 
          },
          { 
            action: "UNDERSTAND",
            label: "IS THERE A NEW FORMAT I SHOULD BE USING?",
            type: "neutral", 
            feedback: "ADAPTING TO NEW STANDARDS.", 
            followUp: "YES, THE DIGITAL TABLET ON THE WALL.",
            meters: { trust: 5, growth: 15, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "THE SENSOR WAS FLICKERING ALL DAY.",
            type: "negative", 
            feedback: "BLAMING TOOLS WITHOUT REPORTING.", 
            followUp: "THEN YOU SHOULD HAVE LOGGED THE FAULT.",
            meters: { trust: -5, growth: 0, safety: -10 } 
          },
        ]
      }
    ],
    timer: 7
  },
  {
    id: 3,
    name: "BOSS LEVEL",
    label: "CRITICAL PRESSURE",
    scenarios: [
      {
        id: "3-1",
        messages: [
          "THAT WAS TOO SLOW.",
          "YOU HESITATED DURING THE ALARM.",
          "IN A REAL LEAK, WE'D BE IN TROUBLE."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "I FROZE. I NEED TO SHARPEN MY RESPONSE.",
            type: "positive", 
            feedback: "HONESTY BUILDS RESILIENCE.", 
            followUp: "LET'S RUN IT AGAIN UNTIL IT'S MUSCLE MEMORY.",
            meters: { trust: 10, growth: 10, safety: 20 } 
          },
          { 
            action: "UNDERSTAND",
            label: "WHAT WAS THE FIRST INDICATOR I MISSED?",
            type: "neutral", 
            feedback: "SITUATIONAL AWARENESS UP.", 
            followUp: "THE LOW-FLOW LIGHT ON PANEL B.",
            meters: { trust: 5, growth: 20, safety: 10 } 
          },
          { 
            action: "DEFEND",
            label: "THE ALARM WASN'T LOUD ENOUGH.",
            type: "negative", 
            feedback: "BLAMING TOOLS HIDES WEAKNESS.", 
            followUp: "THE ALARM IS FINE. YOUR FOCUS ISN'T.",
            meters: { trust: -10, growth: -5, safety: -20 } 
          },
        ]
      },
      {
        id: "3-2",
        messages: [
          "THIS IS THE THIRD TIME.",
          "VALVE 4 WAS LEFT OPEN AGAIN.",
          "THIS IS BECOMING A PATTERN."
        ],
        options: [
          { 
            action: "STAY OPEN",
            label: "I OWN THIS. I'LL SET A DOUBLE-CHECK.",
            type: "positive", 
            feedback: "OWNERSHIP BREAKS BAD PATTERNS.", 
            followUp: "GOOD. I'LL CHECK WITH YOU AT 14:00.",
            meters: { trust: 20, growth: 10, safety: 10 } 
          },
          { 
            action: "UNDERSTAND",
            label: "CAN WE ADD A PHYSICAL TAG TO THIS VALVE?",
            type: "neutral", 
            feedback: "SYSTEMIC SOLUTIONS OVER BLAME.", 
            followUp: "EXCELLENT IDEA. I'LL GET THE TAGS.",
            meters: { trust: 10, growth: 20, safety: 5 } 
          },
          { 
            action: "DEFEND",
            label: "I'M DOING THE WORK OF THREE PEOPLE.",
            type: "negative", 
            feedback: "STRESS ISN'T AN EXCUSE FOR SAFETY.", 
            followUp: "WE'RE ALL BUSY. SAFETY IS NON-NEGOTIABLE.",
            meters: { trust: -30, growth: -10, safety: -15 } 
          },
        ]
      }
    ],
    timer: 5
  }
];

export default function SimulationScreen({ playerName, onComplete }: SimulationScreenProps) {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [meters, setMeters] = useState({ safety: 50, trust: 50, growth: 50 });
  const [xp, setXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].timer);
  const [performance, setPerformance] = useState({ acknowledge: 0, clarify: 0, act: 0, sustain: 0 });
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [showLevelResult, setShowLevelResult] = useState(false);
  const [choicesMade, setChoicesMade] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isDecisionTime, setIsDecisionTime] = useState(false);
  const [followUpText, setFollowUpText] = useState<string | null>(null);

  const currentLevel = LEVELS[currentLevelIdx];
  const scenario = currentLevel.scenarios[currentScenarioIdx];

  // Progressive message reveal
  useEffect(() => {
    if (visibleMessages < scenario.messages.length && !showLevelResult && !followUpText) {
      const timer = setTimeout(() => setVisibleMessages(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    } else if (visibleMessages === scenario.messages.length && !isDecisionTime && !followUpText) {
      setIsDecisionTime(true);
    }
  }, [visibleMessages, scenario.messages.length, showLevelResult, isDecisionTime, followUpText]);

  const handleDecision = useCallback((option: any) => {
    setLastFeedback(option.feedback);
    setChoicesMade(prev => [...prev, option.action]);
    setIsDecisionTime(false);
    
    setMeters(prev => ({
      safety: Math.max(0, Math.min(100, prev.safety + option.meters.safety)),
      trust: Math.max(0, Math.min(100, prev.trust + option.meters.trust)),
      growth: Math.max(0, Math.min(100, prev.growth + option.meters.growth)),
    }));

    setPerformance(prev => ({
      ...prev,
      acknowledge: option.action === "STAY OPEN" ? prev.acknowledge + 1 : prev.acknowledge,
      clarify: option.action === "UNDERSTAND" ? prev.clarify + 1 : prev.clarify,
      act: option.type === "positive" ? prev.act + 1 : prev.act,
      sustain: option.type !== "negative" ? prev.sustain + 1 : prev.sustain,
    }));

    setXp(prev => prev + (option.type === "positive" ? 100 : 50));
    setFollowUpText(option.followUp);

    setTimeout(() => {
      setLastFeedback(null);
      setFollowUpText(null);
      setVisibleMessages(0);
      setIsDecisionTime(false);
      
      if (currentScenarioIdx < currentLevel.scenarios.length - 1) {
        setCurrentScenarioIdx(prev => prev + 1);
        setTimeLeft(currentLevel.timer);
      } else {
        setShowLevelResult(true);
      }
    }, 2500);
  }, [currentScenarioIdx, currentLevel, onComplete, meters, xp, performance]);

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setCurrentScenarioIdx(0);
      setTimeLeft(LEVELS[currentLevelIdx + 1].timer);
      setShowLevelResult(false);
      setVisibleMessages(0);
      setIsDecisionTime(false);
    } else {
      onComplete({ meters, xp, performance, choicesMade });
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !lastFeedback && !showLevelResult && isDecisionTime) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !lastFeedback && !showLevelResult && isDecisionTime) {
      handleDecision(scenario.options[2]); // Auto-defend on timeout
    }
  }, [timeLeft, lastFeedback, handleDecision, scenario, showLevelResult, isDecisionTime]);

  if (showLevelResult) {
    const levelChoices = choicesMade.slice(-currentLevel.scenarios.length);
    const defendCount = levelChoices.filter(c => c === "DEFEND").length;
    const openCount = levelChoices.filter(c => c === "STAY OPEN").length;
    
    let levelFeedback = "GOOD PROGRESS. NEXT LEVEL INCREASES COMPLEXITY.";
    if (defendCount > 1) levelFeedback = "WATCH YOUR DEFENSIVENESS. IT'S CREATING FRICTION IN THE TEAM.";
    if (openCount === currentLevel.scenarios.length) levelFeedback = "EXCELLENT ADAPTABILITY. YOU ARE BUILDING STRONG TRUST.";

    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black/20">
        <div className="pixel-card w-full max-w-lg space-y-8 text-center">
          <h2 className="text-3xl font-bold text-[#f7b500]">{currentLevel.name} COMPLETE</h2>
          <div className="h-1 w-full bg-black/10" />
          
          <div className="grid grid-cols-1 gap-4 text-left">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-black">
              <span className="font-bold">LEVEL TRUST</span>
              <span className="text-xl text-red-500">{meters.trust}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-black">
              <span className="font-bold">LEVEL SAFETY</span>
              <span className="text-xl text-blue-500">{meters.safety}</span>
            </div>
          </div>

          <p className="text-lg text-slate-700 font-bold bg-yellow-100 p-4 border-2 border-yellow-400">
            "{levelFeedback}"
          </p>

          <Button onClick={nextLevel} className="pixel-button h-20 w-full text-2xl">
            {currentLevelIdx < LEVELS.length - 1 ? "NEXT LEVEL" : "FINAL RESULTS"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col p-4">
      {/* HUD */}
      <div className="flex justify-between items-center bg-black/90 p-6 border-4 border-white text-white shadow-2xl">
        <div className="flex flex-col gap-3">
          <div className="text-[#f7b500] font-bold text-sm tracking-widest">{currentLevel.name}: {currentLevel.label}</div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-400" />
            <div className="w-32 h-3 bg-slate-700 border border-white/20">
              <div className="h-full bg-blue-400 transition-all duration-500" style={{ width: `${meters.safety}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-red-400" />
            <div className="w-32 h-3 bg-slate-700 border border-white/20">
              <div className="h-full bg-red-400 transition-all duration-500" style={{ width: `${meters.trust}%` }} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[#f7b500] text-xl font-bold">XP: {xp}</p>
          <p className="text-xs opacity-70">STEP {currentScenarioIdx + 1}/{currentLevel.scenarios.length}</p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 p-3 border-2 border-white/20">
          <Clock className="h-6 w-6 text-white" />
          <span className="text-2xl font-bold tabular-nums">{timeLeft}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-start space-y-6 overflow-y-auto py-8 px-2 scroll-smooth">
        <div className="w-full max-w-lg space-y-6">
          <AnimatePresence>
            {scenario.messages.slice(0, visibleMessages).map((msg, idx) => (
              <motion.div
                key={`${currentLevelIdx}-${currentScenarioIdx}-${idx}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="pixel-card bg-white p-5 max-w-[90%] self-start relative"
              >
                <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-4 border-b-4 border-black rotate-45" />
                <p className="text-lg font-medium leading-relaxed">{msg}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {followUpText && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="pixel-card bg-teal-50 p-5 max-w-[90%] self-start border-teal-600 relative"
            >
              <div className="absolute -left-2 top-4 w-4 h-4 bg-teal-50 border-l-4 border-b-4 border-teal-600 rotate-45" />
              <p className="text-lg font-bold leading-relaxed text-teal-800">{followUpText}</p>
            </motion.div>
          )}
        </div>

        {/* Decision Moment */}
        <AnimatePresence>
          {isDecisionTime && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-lg space-y-6 pb-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/30" />
                <p className="text-xl font-bold text-center text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-widest">WHAT DO YOU DO?</p>
                <div className="h-px flex-1 bg-white/30" />
              </div>
              <div className="grid gap-4">
                {scenario.options.map((option, i) => (
                  <Button
                    key={i}
                    onClick={() => handleDecision(option)}
                    className="pixel-button h-auto py-5 px-6 text-left flex flex-col items-start gap-2"
                    style={{ backgroundColor: i === 0 ? '#73bf2e' : i === 1 ? '#3498db' : '#e74c3c' }}
                  >
                    <span className="text-xs font-black uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-sm">{option.action}</span>
                    <span className="text-lg font-bold leading-tight">{option.label}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Feedback */}
      <AnimatePresence>
        {lastFeedback && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1.2, y: -50 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-black text-white border-4 border-white p-8 shadow-2xl">
              <p className="text-2xl font-bold text-center uppercase tracking-tighter">{lastFeedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
