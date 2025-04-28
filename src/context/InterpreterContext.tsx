
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { parseAndExecute } from '@/lib/interpreter';

interface CallStackFrame {
  name: string;
  lineNumber?: number;
  type?: 'normal' | 'closure';
}

interface Variable {
  value: any;
  hasChanged: boolean;
  isClosure?: boolean;
}

interface Scope {
  name: string;
  type: 'global' | 'function' | 'block' | 'closure';
  variables: Record<string, Variable>;
  isActive: boolean;
  parentScope?: string;
}

interface InterpreterContextType {
  code: string;
  setCode: (code: string) => void;
  currentStep: number;
  totalSteps: number;
  stepForward: () => void;
  stepBack: () => void;
  reset: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  highlightedLine: number;
  nextHighlightedLine: number | null;
  callStack: CallStackFrame[];
  scopes: Record<string, Scope>;
  executionState: Record<string, any>;
  currentStepExplanation: string;
  consoleOutput: string[];
  canStepForward: boolean;
  canStepBack: boolean;
}

const InterpreterContext = createContext<InterpreterContextType | undefined>(undefined);

export const useInterpreter = () => {
  const context = useContext(InterpreterContext);
  if (context === undefined) {
    throw new Error('useInterpreter must be used within an InterpreterProvider');
  }
  return context;
};

interface InterpreterProviderProps {
  children: ReactNode;
  initialCode: string;
}

export const InterpreterProvider = ({ children, initialCode }: InterpreterProviderProps) => {
  const [code, setCode] = useState(initialCode);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [highlightedLine, setHighlightedLine] = useState(1);
  const [nextHighlightedLine, setNextHighlightedLine] = useState<number | null>(null);
  const [callStack, setCallStack] = useState<CallStackFrame[]>([]);
  const [scopes, setScopes] = useState<Record<string, Scope>>({});
  const [executionState, setExecutionState] = useState<Record<string, any>>({});
  const [currentStepExplanation, setCurrentStepExplanation] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(5);
  const [executionHistory, setExecutionHistory] = useState<any[]>([]);
  
  // Initialize the interpreter with the code
  useEffect(() => {
    reset();
  }, [code]);
  
  // Handle auto-play mode
  useEffect(() => {
    let playInterval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      playInterval = setInterval(() => {
        if (currentStep < totalSteps) {
          stepForward();
        } else {
          setIsPlaying(false);
        }
      }, 1000 / playbackSpeed);
    }
    
    return () => {
      if (playInterval) {
        clearInterval(playInterval);
      }
    };
  }, [isPlaying, currentStep, totalSteps, playbackSpeed]);
  
  const reset = () => {
    try {
      const result = parseAndExecute(code);
      
      setExecutionHistory(result.executionSteps);
      setTotalSteps(result.executionSteps.length - 1);
      setCurrentStep(0);
      
      // Set initial state
      const initialState = result.executionSteps[0];
      setHighlightedLine(initialState.line || 1);
      setNextHighlightedLine(initialState.nextLine || null);
      setCallStack(initialState.callStack || []);
      setScopes(initialState.scopes || {});
      setExecutionState(initialState.state || {});
      setCurrentStepExplanation(initialState.explanation || '');
      setConsoleOutput(initialState.consoleOutput || []);
      
      setIsPlaying(false);
    } catch (error) {
      console.error("Error parsing code:", error);
      setCurrentStepExplanation(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  const stepForward = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      const stepState = executionHistory[nextStep];
      
      setCurrentStep(nextStep);
      setHighlightedLine(stepState.line || highlightedLine);
      setNextHighlightedLine(stepState.nextLine || null);
      setCallStack(stepState.callStack || callStack);
      setScopes(stepState.scopes || scopes);
      setExecutionState(stepState.state || executionState);
      setCurrentStepExplanation(stepState.explanation || '');
      setConsoleOutput(stepState.consoleOutput || consoleOutput);
    }
  };
  
  const stepBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const stepState = executionHistory[prevStep];
      
      setCurrentStep(prevStep);
      setHighlightedLine(stepState.line || highlightedLine);
      setNextHighlightedLine(stepState.nextLine || null);
      setCallStack(stepState.callStack || callStack);
      setScopes(stepState.scopes || scopes);
      setExecutionState(stepState.state || executionState);
      setCurrentStepExplanation(stepState.explanation || '');
      setConsoleOutput(stepState.consoleOutput || consoleOutput);
    }
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const canStepForward = currentStep < totalSteps;
  const canStepBack = currentStep > 0;
  
  return (
    <InterpreterContext.Provider
      value={{
        code,
        setCode,
        currentStep,
        totalSteps,
        stepForward,
        stepBack,
        reset,
        isPlaying,
        togglePlay,
        playbackSpeed,
        setPlaybackSpeed,
        highlightedLine,
        nextHighlightedLine,
        callStack,
        scopes,
        executionState,
        currentStepExplanation,
        consoleOutput,
        canStepForward,
        canStepBack
      }}
    >
      {children}
    </InterpreterContext.Provider>
  );
};
