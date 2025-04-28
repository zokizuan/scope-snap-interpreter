
import { useInterpreter } from "@/context/InterpreterContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { StepBack, StepForward, Play, Pause, SkipForward, SkipBack, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={stepBack} 
                        disabled={!canStepBack}
                      >
                        <StepBack className="h-4 w-4" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Step Back</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="outline" 
                        size="icon"
                        onClick={togglePlay}
                        className={isPlaying ? "bg-slate-100" : ""}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying ? "Pause" : "Play"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={stepForward}
                        disabled={!canStepForward}
                      >
                        <StepForward className="h-4 w-4" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Step Forward</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={reset}>
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Reset
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Execution</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Speed: {playbackSpeed}x</span>
              <span>Step: {currentStep}/{totalSteps}</span>
            </div>
            <Slider 
              value={[playbackSpeed]} 
              min={1}
              max={10}
              step={1}
              onValueChange={(values) => setPlaybackSpeed(values[0])} 
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-sm mb-1">
              <h4 className="font-medium">Debugging Controls</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" disabled={!canStepForward}>
                Step Over
              </Button>
              <Button variant="outline" size="sm" disabled={!canStepForward}>
                Step Into
              </Button>
              <Button variant="outline" size="sm" disabled={!canStepBack}>
                Step Out
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutionControls;
