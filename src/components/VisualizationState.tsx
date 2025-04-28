
import { useInterpreter } from "@/context/InterpreterContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const VisualizationState = () => {
  const { 
    currentStep, 
    callStack,
    scopes,
    executionState
  } = useInterpreter();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 py-3 px-4 border-b">
        <CardTitle className="text-base">Visualization State</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="multiple" defaultValue={["call-stack", "scopes"]} className="w-full">
          <AccordionItem value="call-stack" className="border-0">
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-slate-50">
              <h3 className="text-sm font-semibold">Call Stack</h3>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="px-4 py-2 border-t">
                {callStack.length === 0 ? (
                  <div className="text-sm text-gray-500 py-2">Stack empty</div>
                ) : (
                  <div className="space-y-1 max-h-[200px] overflow-y-auto">
                    {callStack.map((frame, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md",
                          index === 0 ? "bg-blue-50 border border-blue-100" : "bg-slate-50"
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {frame.name || "anonymous"}
                            {frame.lineNumber && ` @ line ${frame.lineNumber}`}
                          </span>
                        </div>
                        {frame.type && (
                          <Badge variant={frame.type === "closure" ? "outline" : "default"} className="text-xs">
                            {frame.type}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="scopes" className="border-0">
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-slate-50">
              <h3 className="text-sm font-semibold">Scopes & Memory</h3>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="px-4 py-2 border-t max-h-[300px] overflow-y-auto">
                {Object.entries(scopes).map(([scopeId, scope]) => (
                  <div key={scopeId} className="mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className={cn(
                        "font-medium text-sm",
                        scope.isActive && "text-blue-800"
                      )}>
                        {scope.name}
                        {scope.type === "closure" && (
                          <span className="ml-2 text-xs">
                            <Badge variant="outline" className="border-amber-300 text-amber-700">
                              Persists 🔗
                            </Badge>
                          </span>
                        )}
                      </h4>
                    </div>
                    
                    <div className="mt-1 pl-4 border-l-2 border-slate-200">
                      {Object.entries(scope.variables).length === 0 ? (
                        <div className="text-sm text-gray-500 py-1">No variables</div>
                      ) : (
                        <div className="space-y-1">
                          {Object.entries(scope.variables).map(([varName, variable], varIdx) => (
                            <div 
                              key={varIdx} 
                              className={cn(
                                "flex justify-between py-1 px-2 rounded",
                                variable.hasChanged ? "bg-green-50 animate-pulse" : "",
                                variable.isClosure ? "border-l-2 border-amber-300" : ""
                              )}
                            >
                              <div className="flex items-center">
                                <span className="text-sm">
                                  {variable.isClosure && "🔗 "}
                                  {varName}:
                                </span>
                              </div>
                              <div className="text-sm font-mono bg-slate-50 px-1.5 py-0.5 rounded">
                                {typeof variable.value === "function" 
                                  ? "[Function]" 
                                  : JSON.stringify(variable.value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default VisualizationState;
