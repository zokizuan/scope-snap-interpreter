
import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import VisualizationState from "@/components/VisualizationState";
import ExecutionControls from "@/components/ExecutionControls";
import ExplanationOutput from "@/components/ExplanationOutput";
import SettingsPanel from "@/components/SettingsPanel";
import { InterpreterProvider } from "@/context/InterpreterContext";
import { examples } from "@/lib/codeExamples";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Scope Snap Interpreter</h1>
          <div className="flex items-center space-x-3">
            <select 
              className="border rounded px-3 py-1.5 text-sm bg-white"
              value={selectedExample}
              onChange={(e) => setSelectedExample(parseInt(e.target.value))}
            >
              {examples.map((example, index) => (
                <option key={index} value={index}>
                  {example.name}
                </option>
              ))}
            </select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Visualization Settings</SheetTitle>
                  <SheetDescription>
                    Customize the interpreter visualization experience
                  </SheetDescription>
                </SheetHeader>
                <SettingsPanel />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        <InterpreterProvider initialCode={examples[selectedExample].code}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <CodeEditor />
              <ExecutionControls />
            </div>
            <div className="space-y-6">
              <VisualizationState />
              <ExplanationOutput />
            </div>
          </div>
        </InterpreterProvider>
      </main>
      
      <footer className="bg-white border-t p-4 text-center text-gray-600 text-sm">
        <p>Scope Snap Interpreter - Visualize JavaScript Scope and Closures</p>
      </footer>
    </div>
  );
};

export default Index;
