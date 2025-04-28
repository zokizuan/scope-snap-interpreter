
import { useInterpreter } from "@/context/InterpreterContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ExplanationOutput = () => {
  const { 
    currentStepExplanation, 
    consoleOutput,
    currentStep,
    totalSteps,
    highlightedLine
  } = useInterpreter();

  return (
    <Card>
      <CardHeader className="bg-slate-50 py-3 px-4 border-b flex justify-between items-center">
        <CardTitle className="text-base">Explanation / Output</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Line {highlightedLine}
          </Badge>
          <div className="text-sm text-gray-500">
            Step {currentStep}/{totalSteps}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="explanation">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent border-b h-auto p-0">
              <TabsTrigger 
                value="explanation"
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Explanation
              </TabsTrigger>
              <TabsTrigger 
                value="output" 
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Console Output
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="explanation" className="p-0 m-0">
            <div className="p-4 text-sm">
              {currentStepExplanation ? (
                <div className="space-y-2">
                  <div className="font-medium">Step {currentStep}/{totalSteps}: Executing line {highlightedLine}</div>
                  <p>{currentStepExplanation}</p>
                  
                  {/* Additional explanations for closures when relevant */}
                  {currentStepExplanation.includes("closure") && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <h4 className="font-medium text-amber-800 mb-1">Closure Explained</h4>
                      <p className="text-amber-700 text-xs">
                        A closure is formed when a function accesses variables from its outer (enclosing) scope,
                        even after the outer function has returned. This creates a persistent link to those variables,
                        keeping them alive in memory.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No explanation for current step.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="output" className="p-0 m-0">
            <div className="p-4 font-mono text-sm bg-slate-900 text-white min-h-[100px] max-h-[200px] overflow-y-auto">
              {consoleOutput.length > 0 ? (
                consoleOutput.map((output, index) => (
                  <div key={index} className="mb-1">
                    {output}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No console output yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExplanationOutput;
