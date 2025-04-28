
import { useInterpreter } from "@/context/InterpreterContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExplanationOutput = () => {
  const { 
    currentStepExplanation, 
    consoleOutput,
    currentStep,
    totalSteps
  } = useInterpreter();

  return (
    <Card>
      <CardHeader className="bg-slate-50 py-3 px-4 border-b flex justify-between items-center">
        <CardTitle className="text-base">Explanation / Output</CardTitle>
        <div className="text-sm text-gray-500">
          Step {currentStep}/{totalSteps}
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
                <p>{currentStepExplanation}</p>
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
