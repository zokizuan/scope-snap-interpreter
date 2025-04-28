
// This is a simplified interpreter that simulates JavaScript execution
// It doesn't actually execute the code but returns pre-defined steps for visualization

interface ExecutionStep {
  line: number;
  nextLine: number | null;
  callStack: Array<{
    name: string;
    lineNumber?: number;
    type?: 'normal' | 'closure';
  }>;
  scopes: Record<string, {
    name: string;
    type: 'global' | 'function' | 'block' | 'closure';
    variables: Record<string, {
      value: any;
      hasChanged: boolean;
      isClosure?: boolean;
    }>;
    isActive: boolean;
    parentScope?: string;
  }>;
  state: Record<string, any>;
  explanation: string;
  consoleOutput: string[];
}

export function parseAndExecute(code: string): { executionSteps: ExecutionStep[] } {
  // For the MVP, we return pre-defined execution steps for the example code
  // In a real implementation, this would parse and interpret the JavaScript code
  
  // Check which example is being executed and return appropriate execution steps
  if (code.includes("function createCounter()") && code.includes("count++")) {
    return { executionSteps: counterClosureExample() };
  }
  
  return { executionSteps: defaultExample(code) };
}

function defaultExample(code: string): ExecutionStep[] {
  // A simple default example for any code
  const lines = code.split('\n');
  const steps: ExecutionStep[] = [];
  
  // Initial state
  steps.push({
    line: 1,
    nextLine: 2,
    callStack: [],
    scopes: {
      global: {
        name: 'Global Scope',
        type: 'global',
        variables: {},
        isActive: true
      }
    },
    state: {},
    explanation: 'Starting execution of the program',
    consoleOutput: []
  });

  // Generate a simple step for each line
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    steps.push({
      line: i + 1,
      nextLine: i + 2 < lines.length ? i + 2 : null,
      callStack: [],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {},
          isActive: true
        }
      },
      state: {},
      explanation: `Executing line ${i + 1}: ${lines[i].trim()}`,
      consoleOutput: lines[i].includes('console.log') 
        ? [`> ${lines[i].split('console.log(')[1].split(')')[0]}`] 
        : []
    });
  }
  
  return steps;
}

function counterClosureExample(): ExecutionStep[] {
  return [
    // Step 0: Initial state
    {
      line: 1,
      nextLine: 2,
      callStack: [],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {},
          isActive: true
        }
      },
      state: {},
      explanation: 'Starting execution. About to define the createCounter function.',
      consoleOutput: []
    },
    
    // Step 1: Function declaration - createCounter
    {
      line: 1,
      nextLine: 9,
      callStack: [],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: true
            }
          },
          isActive: true
        }
      },
      state: {},
      explanation: 'Defined function createCounter in the global scope. Functions are hoisted to the top of their scope.',
      consoleOutput: []
    },
    
    // Step 2: Call createCounter()
    {
      line: 9,
      nextLine: 11,
      callStack: [
        {
          name: 'createCounter',
          lineNumber: 9,
          type: 'normal'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope',
          type: 'function',
          variables: {},
          isActive: true
        }
      },
      state: {},
      explanation: 'Calling createCounter function from line 9. This creates a new function execution context.',
      consoleOutput: []
    },
    
    // Step 3: Initialize count inside createCounter
    {
      line: 2,
      nextLine: 3,
      callStack: [
        {
          name: 'createCounter',
          lineNumber: 9,
          type: 'normal'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope',
          type: 'function',
          variables: {
            'count': {
              value: 0,
              hasChanged: true
            }
          },
          isActive: true
        }
      },
      state: {},
      explanation: 'Initializing count variable with value 0 inside the createCounter function scope.',
      consoleOutput: []
    },
    
    // Step 4: Return anonymous function
    {
      line: 3,
      nextLine: 9,
      callStack: [
        {
          name: 'createCounter',
          lineNumber: 9,
          type: 'normal'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope',
          type: 'function',
          variables: {
            'count': {
              value: 0,
              hasChanged: false
            }
          },
          isActive: true
        }
      },
      state: {},
      explanation: 'Defining and returning an anonymous function. This function forms a closure around the count variable.',
      consoleOutput: []
    },
    
    // Step 5: createCounter() returns, assign to myCounter
    {
      line: 9,
      nextLine: 11,
      callStack: [],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: true
            }
          },
          isActive: true
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 0,
              hasChanged: false
            }
          },
          isActive: false
        }
      },
      state: {},
      explanation: 'The createCounter function has returned, and its return value (an anonymous function) is assigned to myCounter. The createCounter scope remains alive as a closure because the returned function references variables from it.',
      consoleOutput: []
    },
    
    // Step 6: First call to myCounter()
    {
      line: 11,
      nextLine: 4,
      callStack: [
        {
          name: 'anonymous (myCounter)',
          lineNumber: 11,
          type: 'closure'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 0,
              hasChanged: false
            }
          },
          isActive: false
        },
        'anonymous-scope': {
          name: 'Anonymous Function Scope',
          type: 'function',
          variables: {},
          isActive: true,
          parentScope: 'createCounter-scope'
        }
      },
      state: {},
      explanation: 'Calling myCounter() which is the anonymous function returned by createCounter. This function has access to the count variable from the createCounter scope through a closure.',
      consoleOutput: []
    },
    
    // Step 7: Increment count
    {
      line: 4,
      nextLine: 5,
      callStack: [
        {
          name: 'anonymous (myCounter)',
          lineNumber: 11,
          type: 'closure'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 1,
              hasChanged: true,
              isClosure: true
            }
          },
          isActive: false
        },
        'anonymous-scope': {
          name: 'Anonymous Function Scope',
          type: 'function',
          variables: {},
          isActive: true,
          parentScope: 'createCounter-scope'
        }
      },
      state: {},
      explanation: 'Incrementing the count variable. Even though the createCounter function has returned, its scope is still alive and the count variable can be accessed and modified through closure.',
      consoleOutput: []
    },
    
    // Step 8: Log count value
    {
      line: 5,
      nextLine: 11,
      callStack: [
        {
          name: 'anonymous (myCounter)',
          lineNumber: 11,
          type: 'closure'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 1,
              hasChanged: false,
              isClosure: true
            }
          },
          isActive: false
        },
        'anonymous-scope': {
          name: 'Anonymous Function Scope',
          type: 'function',
          variables: {},
          isActive: true,
          parentScope: 'createCounter-scope'
        }
      },
      state: {},
      explanation: 'Logging the current value of count (1) to the console.',
      consoleOutput: ['> 1']
    },
    
    // Step 9: First myCounter call returns
    {
      line: 11,
      nextLine: 12,
      callStack: [],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: true
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 1,
              hasChanged: false
            }
          },
          isActive: false
        }
      },
      state: {},
      explanation: 'The myCounter function has completed execution and returned. The closure scope is preserved for future calls.',
      consoleOutput: ['> 1']
    },
    
    // Step 10: Second call to myCounter()
    {
      line: 12,
      nextLine: 4,
      callStack: [
        {
          name: 'anonymous (myCounter)',
          lineNumber: 12,
          type: 'closure'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 1,
              hasChanged: false,
              isClosure: true
            }
          },
          isActive: false
        },
        'anonymous-scope': {
          name: 'Anonymous Function Scope',
          type: 'function',
          variables: {},
          isActive: true,
          parentScope: 'createCounter-scope'
        }
      },
      state: {},
      explanation: 'Calling myCounter() for the second time. It will use the same closure scope where count is now 1.',
      consoleOutput: ['> 1']
    },
    
    // Step 11: Increment count again
    {
      line: 4,
      nextLine: 5,
      callStack: [
        {
          name: 'anonymous (myCounter)',
          lineNumber: 12,
          type: 'closure'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 2,
              hasChanged: true,
              isClosure: true
            }
          },
          isActive: false
        },
        'anonymous-scope': {
          name: 'Anonymous Function Scope',
          type: 'function',
          variables: {},
          isActive: true,
          parentScope: 'createCounter-scope'
        }
      },
      state: {},
      explanation: 'Incrementing the count variable again through the closure. The count is now 2.',
      consoleOutput: ['> 1']
    },
    
    // Step 12: Log count value again
    {
      line: 5,
      nextLine: null,
      callStack: [
        {
          name: 'anonymous (myCounter)',
          lineNumber: 12,
          type: 'closure'
        }
      ],
      scopes: {
        global: {
          name: 'Global Scope',
          type: 'global',
          variables: {
            'createCounter': {
              value: '[Function]',
              hasChanged: false
            },
            'myCounter': {
              value: '[Function]',
              hasChanged: false
            }
          },
          isActive: false
        },
        'createCounter-scope': {
          name: 'createCounter() Scope [Persists]',
          type: 'closure',
          variables: {
            'count': {
              value: 2,
              hasChanged: false,
              isClosure: true
            }
          },
          isActive: false
        },
        'anonymous-scope': {
          name: 'Anonymous Function Scope',
          type: 'function',
          variables: {},
          isActive: true,
          parentScope: 'createCounter-scope'
        }
      },
      state: {},
      explanation: 'Logging the current value of count (2) to the console. This demonstrates that the count variable persisted its value between function calls because of closure.',
      consoleOutput: ['> 1', '> 2']
    }
  ];
}
