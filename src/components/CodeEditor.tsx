
import React, { useEffect, useRef } from 'react';
import { useInterpreter } from '@/context/InterpreterContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CodeEditor = () => {
  const { 
    code, 
    setCode, 
    currentStep,
    highlightedLine,
    nextHighlightedLine
  } = useInterpreter();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    updateLineNumbers();
  }, [code]);

  const updateLineNumbers = () => {
    if (!textareaRef.current || !lineNumbersRef.current) return;
    
    const lineCount = code.split('\n').length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);
    
    lineNumbersRef.current.innerHTML = lineNumbers
      .map(num => `<div class="${num === highlightedLine ? 'bg-green-200' : ''}">${num}</div>`)
      .join('');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const getLineBackgroundColor = (lineNum: number) => {
    if (lineNum === highlightedLine) {
      return "bg-green-100";
    }
    if (lineNum === nextHighlightedLine) {
      return "bg-blue-50";
    }
    return "";
  };

  // Create line numbers and highlighted lines display
  const codeLines = code.split('\n');
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 py-3 px-4 border-b">
        <CardTitle className="text-base">Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col relative">
          <div className="overflow-x-auto">
            <div className="flex min-h-[300px] max-h-[500px]">
              {/* Line numbers */}
              <div className="bg-slate-50 text-slate-500 text-right pr-2 py-2 select-none border-r min-w-[3rem]">
                {codeLines.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "px-2 leading-6",
                      i + 1 === highlightedLine && "bg-green-200 text-green-800 font-medium",
                      i + 1 === nextHighlightedLine && "bg-blue-50"
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {/* Code with highlighting */}
              <div className="flex-1 overflow-auto relative font-mono text-sm">
                <div className="py-2 px-4">
                  {codeLines.map((line, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "leading-6 whitespace-pre",
                        getLineBackgroundColor(i + 1)
                      )}
                    >
                      {line || " "}
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
