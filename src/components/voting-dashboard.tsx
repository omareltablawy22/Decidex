"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DecisionOutcomes } from "./decision-outcomes";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Clock, ThumbsUp, ThumbsDown, Minus } from "lucide-react";

// Helper component for compact voting cards
interface DecisionVotingCardProps {
  decision: any;
  language: "en" | "ar";
  onVoteSubmit: (decisionId: string, vote: string) => void;
  compact?: boolean;
}

function DecisionVotingCard({ decision, language, onVoteSubmit, compact = false }: DecisionVotingCardProps) {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  const translations = {
    inFavor: language === "en" ? "In Favor" : "موافق",
    against: language === "en" ? "Against" : "معارض",
    abstain: language === "en" ? "Abstain" : "امتناع",
    submit: language === "en" ? "Submit" : "إرسال",
  };

  const handleVoteSelect = (vote: string) => {
    setSelectedVote(vote);
  };

  const handleVoteSubmit = () => {
    if (selectedVote) {
      onVoteSubmit(decision.id, selectedVote);
      setSelectedVote(null);
    }
  };

  return (
    <div className={compact ? "scale-90 origin-left" : ""}>
      <div className="flex gap-2 mb-2">
        <Button
          variant="outline"
          size="sm"
          className={`flex-1 ${selectedVote === "in-favor" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : ""}`}
          onClick={() => handleVoteSelect("in-favor")}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          {translations.inFavor}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`flex-1 ${selectedVote === "against" ? "bg-red-50 border-red-200 text-red-700" : ""}`}
          onClick={() => handleVoteSelect("against")}
        >
          <ThumbsDown className="h-4 w-4 mr-2" />
          {translations.against}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`flex-1 ${selectedVote === "abstain" ? "bg-amber-50 border-amber-200 text-amber-700" : ""}`}
          onClick={() => handleVoteSelect("abstain")}
        >
          <Minus className="h-4 w-4 mr-2" />
          {translations.abstain}
        </Button>
      </div>

      {selectedVote && (
        <Button className="w-full" size="sm" onClick={handleVoteSubmit}>
          {translations.submit}
        </Button>
      )}
    </div>
  );
}

interface VotingDashboardProps {
  language: "en" | "ar";
  meetings: any[];
  onVoteSubmit: (decisionId: string, vote: string) => void;
}

export function VotingDashboard({ language, meetings, onVoteSubmit }: VotingDashboardProps) {
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    meetings.length > 0 ? meetings[0].id : null
  );

  const translations = {
    votingDashboard: language === "en" ? "Voting Dashboard" : "لوحة التصويت",
    openVotes: language === "en" ? "Open Votes" : "التصويتات المفتوحة",
    allDecisions: language === "en" ? "All Decisions" : "جميع القرارات",
    meetingTitle: language === "en" ? "Meeting" : "الاجتماع",
    noOpenVotes: language === "en" ? "No open votes available" : "لا توجد تصويتات مفتوحة",
    success: language === "en" ? "Success" : "ناجح",
    failure: language === "en" ? "Failure" : "فاشل",
    needsReview: language === "en" ? "Needs Review" : "يحتاج مراجعة",
    pending: language === "en" ? "Pending" : "قيد الانتظار",
    votingStats: language === "en" ? "Voting Statistics" : "إحصائيات التصويت",
    totalDecisions: language === "en" ? "Total Decisions" : "إجمالي القرارات",
    awaitingYourVote: language === "en" ? "Awaiting Your Vote" : "بانتظار تصويتك",
  };

  // Get all decisions from all meetings
  const allDecisions = meetings.flatMap((meeting) =>
    (meeting.decisions || []).map((decision: any) => ({
      ...decision,
      meetingTitle: meeting.title,
      meetingId: meeting.id,
    }))
  );

  // Get open votes
  const openVotes = allDecisions.filter((decision) => decision.voting?.status === "open");

  // Get decisions awaiting current user's vote
  const awaitingUserVote = openVotes.filter((decision) => {
    const userVote = decision.voting?.votes?.find((v: any) => v.memberId === "bm1");
    return userVote && userVote.vote === null;
  });

  // Count decisions by outcome
  const successCount = allDecisions.filter((d) => d.outcome === "success").length;
  const failureCount = allDecisions.filter((d) => d.outcome === "failure").length;
  const reviewCount = allDecisions.filter((d) => d.outcome === "needs-review").length;
  const pendingCount = allDecisions.filter((d) => d.outcome === null).length;

  // Get decisions for the selected meeting
  const selectedMeeting = meetings.find((m) => m.id === selectedMeetingId);
  const meetingDecisions = selectedMeeting
    ? (selectedMeeting.decisions || []).map((decision: any) => ({
        ...decision,
        meetingTitle: selectedMeeting.title,
        meetingId: selectedMeeting.id,
      }))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">{translations.votingDashboard}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="open">
              <TabsList className="mb-4">
                <TabsTrigger value="open" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {translations.openVotes}
                  <Badge variant="secondary" className="ml-1">
                    {openVotes.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="all">{translations.allDecisions}</TabsTrigger>
              </TabsList>

              <TabsContent value="open">
                {openVotes.length > 0 ? (
                  <div className="space-y-4">
                    {openVotes.map((decision) => (
                      <div key={decision.id} className="p-4 border rounded-md bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{decision.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {decision.meetingTitle}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{decision.notes}</p>

                        <DecisionVotingCard 
                          decision={decision} 
                          language={language} 
                          onVoteSubmit={onVoteSubmit}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500">{translations.noOpenVotes}</div>
                )}
              </TabsContent>

              <TabsContent value="all">
                <div className="mb-4">
                  <TabsList className="w-full">
                    {meetings.map((meeting) => (
                      <TabsTrigger
                        key={meeting.id}
                        value={meeting.id.toString()}
                        onClick={() => setSelectedMeetingId(meeting.id)}
                        className={selectedMeetingId === meeting.id ? "bg-primary text-primary-foreground" : ""}
                      >
                        {meeting.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {selectedMeeting && (
                  <DecisionOutcomes decisions={meetingDecisions} language={language} onVoteSubmit={onVoteSubmit} />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{translations.votingStats}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-3xl font-bold text-gray-800">{allDecisions.length}</div>
                <div className="text-sm text-gray-500">{translations.totalDecisions}</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-md text-center">
                <div className="text-3xl font-bold text-amber-600">{awaitingUserVote.length}</div>
                <div className="text-sm text-amber-700">{translations.awaitingYourVote}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">{translations.success}</span>
                </div>
                <span className="text-lg font-bold text-emerald-600">{successCount}</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-red-700">{translations.failure}</span>
                </div>
                <span className="text-lg font-bold text-red-600">{failureCount}</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="font-medium text-amber-700">{translations.needsReview}</span>
                </div>
                <span className="text-lg font-bold text-amber-600">{reviewCount}</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-700">{translations.pending}</span>
                </div>
                <span className="text-lg font-bold text-gray-600">{pendingCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {awaitingUserVote.length > 0 && (
          <Card className="shadow-sm border-t-4 border-t-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{translations.awaitingYourVote}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {awaitingUserVote.map((decision) => (
                  <div key={decision.id} className="p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm">{decision.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{decision.meetingTitle}</p>
                    <DecisionVotingCard
                      decision={decision}
                      language={language}
                      onVoteSubmit={onVoteSubmit}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}