
import React, { useEffect, useRef, useState } from 'react';
import { useInterpreter } from '@/context/InterpreterContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

const CodeEditor = () => {
  const { 
    code, 
    setCode, 
    currentStep,
    highlightedLine,
    nextHighlightedLine,
    reset
  } = useInterpreter();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const [edited, setEdited] = useState(false);
  
  useEffect(() => {
    // Reset edited state when code is reset externally
    setEdited(false);
  }, [reset]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setEdited(true);
  };

  const handleReset = () => {
    reset();
    setEdited(false);
  };

  const getLineBackgroundColor = (lineNum: number) => {
    if (lineNum === highlightedLine) {
      return "bg-green-100 border-l-4 border-green-500";
    }
    if (lineNum === nextHighlightedLine) {
      return "bg-blue-50 border-l-4 border-blue-300";
    }
    return "border-l-4 border-transparent";
  };
  
  const getLineAnnotation = (lineNum: number, line: string) => {
    // Add contextual inline annotations based on the current line content and state
    // This is simplified - in a real implementation we'd get this from the interpreter
    if (lineNum === highlightedLine) {
      if (line.includes('function') && line.includes('return')) {
        return <span className="text-xs text-amber-600 ml-2">[Returning Function (Closure)]</span>;
      } else if (line.includes('count++')) {
        return <span className="text-xs text-amber-600 ml-2">[Accessing Closure Var: count]</span>;
      } else if (line.includes('let count')) {
        return <span className="text-xs text-amber-600 ml-2">[Local Variable]</span>;
      } else if (line.includes('myCounter(')) {
        return <span className="text-xs text-amber-600 ml-2">[Calling Closure]</span>;
      }
    }
    return null;
  };

  // Create line numbers and highlighted lines display
  const codeLines = code.split('\n');
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 py-3 px-4 border-b flex flex-row justify-between items-center">
        <CardTitle className="text-base">Code Editor</CardTitle>
        {edited && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Code
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col relative">
          <div className="overflow-x-auto">
            <div className="flex min-h-[300px] max-h-[500px]">
              {/* Line numbers with execution markers */}
              <div className="bg-slate-50 text-slate-500 text-right pr-2 py-2 select-none border-r min-w-[3rem]">
                {codeLines.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "px-2 leading-6 flex items-center justify-end",
                      i + 1 === highlightedLine && "text-green-800 font-medium",
                      i + 1 === nextHighlightedLine && "text-blue-600"
                    )}
                  >
                    {i + 1 === nextHighlightedLine && (
                      <div className="mr-1 text-blue-600">▶</div>
                    )}
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {/* Code with highlighting */}
              <div ref={codeContainerRef} className="flex-1 overflow-auto relative font-mono text-sm">
                <div className="py-2 px-4">
                  {codeLines.map((line, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "leading-6 whitespace-pre flex items-center",
                        getLineBackgroundColor(i + 1)
                      )}
                    >
                      <span className="pl-2">{line || " "}</span>
                      {getLineAnnotation(i + 1, line)}
                    </div>
                  ))}
                </div>
                
                {/* Editable textarea that overlays the highlighted code */}
                <textarea
                  ref={textareaRef}
                  className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 p-2 px-4 py-2 font-mono resize-none outline-none border-0"
                  value={code}
                  onChange={handleCodeChange}
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
