
import { useInterpreter } from "@/context/InterpreterContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { StepBack, StepForward, Play, Pause } from "lucide-react";

const ExecutionControls = () => {
  const { 
    stepForward, 
    stepBack, 
    reset, 
    isPlaying,
    togglePlay,
    playbackSpeed,
    setPlaybackSpeed,
    canStepForward,
    canStepBack,
    currentStep,
    totalSteps
  } = useInterpreter();

  return (
    <Card>
      <CardHeader className="bg-slate-50 py-3 px-4 border-b">
        <CardTitle className="text-base">Execution Controls</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={stepBack} 
                disabled={!canStepBack}
              >
                <StepBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline" 
                size="icon"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={stepForward}
                disabled={!canStepForward}
              >
                <StepForward className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={reset}>
              Reset
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Speed:</span>
              <span>Step: {currentStep}/{totalSteps}</span>
            </div>
            <Slider 
              value={[playbackSpeed]} 
              min={1}
              max={10}
              step={1}
              onValueChange={(values) => setPlaybackSpeed(values[0])} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutionControls;
