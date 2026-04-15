import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Background from "./components/Background";
import LandingScreen from "./components/LandingScreen";
import BriefingScreen from "./components/BriefingScreen";
import SimulationScreen from "./components/SimulationScreen";
import ResultScreen from "./components/ResultScreen";

type Screen = "landing" | "briefing" | "simulation" | "result";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [playerData, setPlayerData] = useState({ name: "", avatar: "" });
  const [finalStats, setFinalStats] = useState<any>(null);

  const handleStartMission = (name: string, avatar: string) => {
    setPlayerData({ name, avatar });
    setCurrentScreen("briefing");
  };

  const handleBeginSimulation = () => {
    setCurrentScreen("simulation");
  };

  const handleSimulationComplete = (stats: any) => {
    setFinalStats(stats);
    setCurrentScreen("result");
  };

  const handleReplay = () => {
    setCurrentScreen("landing");
    setFinalStats(null);
  };

  return (
    <main className="relative min-h-screen w-full font-sans selection:bg-teal-200 selection:text-teal-900">
      <Background />
      
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && (
          <LandingScreen key="landing" onStart={handleStartMission} />
        )}
        
        {currentScreen === "briefing" && (
          <BriefingScreen 
            key="briefing" 
            playerName={playerData.name} 
            onBegin={handleBeginSimulation} 
          />
        )}

        {currentScreen === "simulation" && (
          <SimulationScreen 
            key="simulation"
            playerName={playerData.name}
            onComplete={handleSimulationComplete}
          />
        )}

        {currentScreen === "result" && finalStats && (
          <ResultScreen 
            key="result"
            playerName={playerData.name}
            stats={finalStats}
            onReplay={handleReplay}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
