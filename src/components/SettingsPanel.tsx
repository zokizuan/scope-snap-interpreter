
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useInterpreter } from "@/context/InterpreterContext";
import { Separator } from "@/components/ui/separator";

const SettingsPanel = () => {
  const { playbackSpeed, setPlaybackSpeed } = useInterpreter();
  // Add these to InterpreterContext in a future update
  const [showInlineHints, setShowInlineHints] = useState(true);
  const [explanationDetail, setExplanationDetail] = useState("detailed");
  const [stepGranularity, setStepGranularity] = useState("line");
  
  return (
    <div className="py-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Visual Settings</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="inline-hints">Show Inline Code Hints</Label>
          <Switch 
            id="inline-hints" 
            checked={showInlineHints}
            onCheckedChange={setShowInlineHints}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Execution Settings</h3>
        
        <div className="space-y-2">
          <Label>Execution Speed</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Slow</span>
            <Slider
              value={[playbackSpeed]}
              min={1}
              max={10}
              step={1}
              onValueChange={(values) => setPlaybackSpeed(values[0])}
              className="flex-1"
            />
            <span className="text-sm text-gray-500">Fast</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Step Granularity</Label>
          <RadioGroup 
            value={stepGranularity}
            onValueChange={setStepGranularity}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line" id="line" />
              <Label htmlFor="line">Line by line</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expression" id="expression" />
              <Label htmlFor="expression">Expression by expression</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Explanation Settings</h3>
        
        <div className="space-y-2">
          <Label>Detail Level</Label>
          <RadioGroup 
            value={explanationDetail}
            onValueChange={setExplanationDetail}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="simple" id="simple" />
              <Label htmlFor="simple">Simple (beginner-friendly)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="detailed" id="detailed" />
              <Label htmlFor="detailed">Detailed (technical)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
