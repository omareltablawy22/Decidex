"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, Minus, Lock, AlertCircle } from "lucide-react";
import { boardMembers } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface VotingSystemProps {
  decision: any;
  language: "en" | "ar";
  onVoteSubmit: (decisionId: string, vote: string) => void;
}

export function VotingSystem({ decision, language, onVoteSubmit }: VotingSystemProps) {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [showVotingDetails, setShowVotingDetails] = useState(false);

  const translations = {
    voting: language === "en" ? "Voting" : "التصويت",
    voteNow: language === "en" ? "Vote Now" : "صوت الآن",
    viewResults: language === "en" ? "View Results" : "عرض النتائج",
    votingClosed: language === "en" ? "Voting Closed" : "التصويت مغلق",
    votingOpen: language === "en" ? "Voting Open" : "التصويت مفتوح",
    inFavor: language === "en" ? "In Favor" : "موافق",
    against: language === "en" ? "Against" : "معارض",
    abstain: language === "en" ? "Abstain" : "امتناع",
    submit: language === "en" ? "Submit Vote" : "إرسال التصويت",
    cancel: language === "en" ? "Cancel" : "إلغاء",
    votingDetails: language === "en" ? "Voting Details" : "تفاصيل التصويت",
    boardMembers: language === "en" ? "Board Members" : "أعضاء مجلس الإدارة",
    yourVote: language === "en" ? "Your Vote" : "تصويتك",
    notVoted: language === "en" ? "Not Voted" : "لم يصوت",
    votingResults: language === "en" ? "Voting Results" : "نتائج التصويت",
    close: language === "en" ? "Close" : "إغلاق",
  };

  const isVotingOpen = decision.voting.status === "open";
  const totalVotes = decision.voting.inFavor + decision.voting.against + decision.voting.abstain;
  const totalMembers = boardMembers.length;
  const votedCount = decision.voting.votes.filter((v: any) => v.vote !== null).length;

  // Calculate percentages
  const inFavorPercentage = totalVotes > 0 ? Math.round((decision.voting.inFavor / totalVotes) * 100) : 0;
  const againstPercentage = totalVotes > 0 ? Math.round((decision.voting.against / totalVotes) * 100) : 0;
  const abstainPercentage = totalVotes > 0 ? Math.round((decision.voting.abstain / totalVotes) * 100) : 0;

  // Find current user's vote
  const currentUserVote = decision.voting.votes.find(
    (v: any) => boardMembers.find((bm) => bm.id === v.memberId)?.isCurrentUser
  )?.vote;

  const handleVoteSelect = (vote: string) => {
    setSelectedVote(vote);
  };

  const handleVoteSubmit = () => {
    if (selectedVote) {
      onVoteSubmit(decision.id, selectedVote);
      setSelectedVote(null);
    }
  };

  const getVoteIcon = (vote: string | null) => {
    switch (vote) {
      case "in-favor":
        return <ThumbsUp className="h-4 w-4 text-emerald-500" />;
      case "against":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case "abstain":
        return <Minus className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVoteText = (vote: string | null) => {
    switch (vote) {
      case "in-favor":
        return translations.inFavor;
      case "against":
        return translations.against;
      case "abstain":
        return translations.abstain;
      default:
        return translations.notVoted;
    }
  };

  const getVoteClass = (vote: string | null) => {
    switch (vote) {
      case "in-favor":
        return "text-emerald-500";
      case "against":
        return "text-red-500";
      case "abstain":
        return "text-amber-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">{translations.voting}</h4>
        <Badge
          variant={isVotingOpen ? "outline" : "secondary"}
          className={isVotingOpen ? "border-emerald-500 text-emerald-700" : ""}
        >
          {isVotingOpen ? translations.votingOpen : translations.votingClosed}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            {translations.inFavor} ({decision.voting.inFavor})
          </span>
          <span>{inFavorPercentage}%</span>
        </div>
        <Progress value={inFavorPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-emerald-500" />

        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            {translations.against} ({decision.voting.against})
          </span>
          <span>{againstPercentage}%</span>
        </div>
        <Progress value={againstPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />

        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            {translations.abstain} ({decision.voting.abstain})
          </span>
          <span>{abstainPercentage}%</span>
        </div>
        <Progress value={abstainPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
      </div>

      <div className="text-xs text-gray-500 mb-4">
        {votedCount} / {totalMembers} {language === "en" ? "members voted" : "عضو صوت"}
      </div>

      <div className="flex gap-2">
        {isVotingOpen ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                {translations.voteNow}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{decision.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{translations.yourVote}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      {getVoteIcon(currentUserVote)}
                      <span className={getVoteClass(currentUserVote)}>{getVoteText(currentUserVote)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
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
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedVote(null)}>
                  {translations.cancel}
                </Button>
                <Button onClick={handleVoteSubmit} disabled={!selectedVote}>
                  {translations.submit}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button variant="outline" size="sm" className="flex-1" disabled>
            <Lock className="h-4 w-4 mr-2" />
            {translations.votingClosed}
          </Button>
        )}

        <Dialog open={showVotingDetails} onOpenChange={setShowVotingDetails}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="flex-1">
              {translations.viewResults}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {translations.votingDetails}: {decision.title}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <h4 className="text-sm font-medium mb-3">{translations.votingResults}</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-emerald-50 rounded-md">
                  <span className="text-2xl font-bold text-emerald-600">{decision.voting.inFavor}</span>
                  <span className="text-sm text-emerald-700">{translations.inFavor}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-red-50 rounded-md">
                  <span className="text-2xl font-bold text-red-600">{decision.voting.against}</span>
                  <span className="text-sm text-red-700">{translations.against}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-amber-50 rounded-md">
                  <span className="text-2xl font-bold text-amber-600">{decision.voting.abstain}</span>
                  <span className="text-sm text-amber-700">{translations.abstain}</span>
                </div>
              </div>

              <h4 className="text-sm font-medium mb-3">{translations.boardMembers}</h4>
              <div className="space-y-3 max-h-[200px] overflow-y-auto">
                {decision.voting.votes.map((vote: any) => {
                  const member = boardMembers.find((bm) => bm.id === vote.memberId);
                  if (!member) return null;

                  return (
                    <div key={vote.memberId} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {member.name}
                            {member.isCurrentUser && (
                              <span className="text-xs text-gray-500 ml-1">({translations.yourVote})</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getVoteIcon(vote.vote)}
                        <span className={`text-sm ${getVoteClass(vote.vote)}`}>{getVoteText(vote.vote)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowVotingDetails(false)} variant="secondary">
                {translations.close}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}