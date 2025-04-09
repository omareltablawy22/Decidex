"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VotingSystem } from "./voting-system";

interface DecisionOutcomesProps {
  decisions: any[];
  language: "en" | "ar";
  onVoteSubmit: (decisionId: string, vote: string) => void;
}

export function DecisionOutcomes({ decisions, language, onVoteSubmit }: DecisionOutcomesProps) {
  const translations = {
    decisionOutcomes: language === "en" ? "Decision Outcomes" : "نتائج القرارات",
    success: language === "en" ? "Success" : "ناجح",
    failure: language === "en" ? "Failure" : "فاشل",
    needsReview: language === "en" ? "Needs Review" : "يحتاج مراجعة",
    pending: language === "en" ? "Pending" : "قيد الانتظار",
    all: language === "en" ? "All" : "الكل",
    strategic: language === "en" ? "Strategic" : "استراتيجي",
    operational: language === "en" ? "Operational" : "تشغيلي",
    governance: language === "en" ? "Governance" : "حوكمة",
    notes: language === "en" ? "Notes" : "ملاحظات",
  };

  const getOutcomeIcon = (outcome: string | null) => {
    switch (outcome) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "failure":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "needs-review":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getOutcomeText = (outcome: string | null) => {
    switch (outcome) {
      case "success":
        return translations.success;
      case "failure":
        return translations.failure;
      case "needs-review":
        return translations.needsReview;
      default:
        return translations.pending;
    }
  };

  const getOutcomeClass = (outcome: string | null) => {
    switch (outcome) {
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "failure":
        return "bg-red-50 text-red-700 border-red-200";
      case "needs-review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "strategic":
        return translations.strategic;
      case "operational":
        return translations.operational;
      case "governance":
        return translations.governance;
      default:
        return "";
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case "strategic":
        return "bg-emerald-100 text-emerald-800";
      case "operational":
        return "bg-blue-100 text-blue-800";
      case "governance":
        return "bg-amber-100 text-amber-800";
      default:
        return "";
    }
  };

  // Count outcomes by type
  const successCount = decisions.filter((d) => d.outcome === "success").length;
  const failureCount = decisions.filter((d) => d.outcome === "failure").length;
  const reviewCount = decisions.filter((d) => d.outcome === "needs-review").length;
  const pendingCount = decisions.filter((d) => d.outcome === null).length;

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{translations.decisionOutcomes}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between mb-6 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm">
              {translations.success} ({successCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">
              {translations.failure} ({failureCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm">
              {translations.needsReview} ({reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm">
              {translations.pending} ({pendingCount})
            </span>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">{translations.all}</TabsTrigger>
            <TabsTrigger value="strategic">{translations.strategic}</TabsTrigger>
            <TabsTrigger value="operational">{translations.operational}</TabsTrigger>
            <TabsTrigger value="governance">{translations.governance}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {decisions.map((decision) => (
              <div key={decision.id} className={`p-4 border rounded-md ${getOutcomeClass(decision.outcome)}`}>
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{getOutcomeIcon(decision.outcome)}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-medium">{decision.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryClass(decision.category)}`}>
                        {getCategoryText(decision.category)}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{decision.notes}</p>

                    {decision.voting && (
                      <VotingSystem decision={decision} language={language} onVoteSubmit={onVoteSubmit} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="strategic" className="space-y-4">
            {decisions
              .filter((decision) => decision.category === "strategic")
              .map((decision) => (
                <div key={decision.id} className={`p-4 border rounded-md ${getOutcomeClass(decision.outcome)}`}>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{getOutcomeIcon(decision.outcome)}</div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <h3 className="font-medium">{decision.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          {translations.strategic}
                        </span>
                      </div>
                      <p className="text-sm mt-2">{decision.notes}</p>

                      {decision.voting && (
                        <VotingSystem decision={decision} language={language} onVoteSubmit={onVoteSubmit} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="operational" className="space-y-4">
            {decisions
              .filter((decision) => decision.category === "operational")
              .map((decision) => (
                <div key={decision.id} className={`p-4 border rounded-md ${getOutcomeClass(decision.outcome)}`}>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{getOutcomeIcon(decision.outcome)}</div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <h3 className="font-medium">{decision.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {translations.operational}
                        </span>
                      </div>
                      <p className="text-sm mt-2">{decision.notes}</p>

                      {decision.voting && (
                        <VotingSystem decision={decision} language={language} onVoteSubmit={onVoteSubmit} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="governance" className="space-y-4">
            {decisions
              .filter((decision) => decision.category === "governance")
              .map((decision) => (
                <div key={decision.id} className={`p-4 border rounded-md ${getOutcomeClass(decision.outcome)}`}>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{getOutcomeIcon(decision.outcome)}</div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <h3 className="font-medium">{decision.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                          {translations.governance}
                        </span>
                      </div>
                      <p className="text-sm mt-2">{decision.notes}</p>

                      {decision.voting && (
                        <VotingSystem decision={decision} language={language} onVoteSubmit={onVoteSubmit} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}