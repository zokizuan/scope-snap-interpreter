
import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import VisualizationState from "@/components/VisualizationState";
import ExecutionControls from "@/components/ExecutionControls";
import ExplanationOutput from "@/components/ExplanationOutput";
import { InterpreterProvider } from "@/context/InterpreterContext";
import { examples } from "@/lib/codeExamples";

const Index = () => {
  const [selectedExample, setSelectedExample] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Scope Snap Interpreter</h1>
          <div className="space-x-2">
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
