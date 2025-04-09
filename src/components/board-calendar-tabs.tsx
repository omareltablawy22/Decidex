"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Adjusted path
import { CalendarIcon, ClipboardCheck, Bell } from "lucide-react"
import { Vote } from "@/components/icons/vote-icon" // Adjusted path
import { BoardCalendar } from "@/components/board-calendar" // Adjusted path
import { VotingDashboard } from "@/components/voting-dashboard" // Adjusted path
import { GovernanceCompliance } from "@/components/governance-compliance" // Adjusted path
import { NeomTenders } from "@/components/neom-tenders" // Adjusted path
import { meetings, documents as initialDocuments } from "@/lib/data" // Adjusted path
import { Toaster } from "@/components/ui/toaster" // Adjusted path
import { getNewTendersCount, markTenderAsViewed } from "@/lib/neom-data" // Adjusted path
import React from "react" // Added React import

export function BoardCalendarTabs() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null)
  const [meetingsData, setMeetingsData] = useState(meetings)
  const [documentsData, setDocumentsData] = useState(initialDocuments)
  const [newTendersCount, setNewTendersCount] = useState(getNewTendersCount())

  const handleMeetingSelect = (meeting: any | null) => {
    setSelectedMeeting(meeting)
  }

 const handleCreateMeeting = (data: { meeting: any; documents: any[] }) => {
     // Ensure meeting and documents have IDs before adding
     const newMeetingWithId = { ...data.meeting, id: data.meeting.id || Date.now() }; // Use existing or generate new ID
     const documentsWithMeetingId = data.documents.map(doc => ({
         ...doc,
         meetingId: newMeetingWithId.id // Ensure documents link to the new meeting
     }));

     setMeetingsData(prevMeetings => [...prevMeetings, newMeetingWithId]);

     if (documentsWithMeetingId && documentsWithMeetingId.length > 0) {
         setDocumentsData(prevDocs => [...prevDocs, ...documentsWithMeetingId]);
     }

     setSelectedMeeting(newMeetingWithId); // Select the newly created meeting
 };


  const handleVoteSubmit = (decisionId: string, vote: string) => {
    // Create a deep copy of the meetings data
    const updatedMeetings = JSON.parse(JSON.stringify(meetingsData))

    // Find the meeting containing the decision
    let targetMeeting = null
    let targetDecision = null

    for (const meeting of updatedMeetings) {
      if (meeting.decisions) { // Check if decisions exist
          const decision = meeting.decisions.find((d: any) => d.id === decisionId)
          if (decision) {
            targetMeeting = meeting
            targetDecision = decision
            break
          }
       }
    }

    if (!targetMeeting || !targetDecision || !targetDecision.voting || !targetDecision.voting.votes) return // Added checks

    // Find the current user's vote
    const currentUserVoteIndex = targetDecision.voting.votes.findIndex(
      (v: any) => v.memberId === "bm1", // Assuming bm1 is the current user
    )

    if (currentUserVoteIndex === -1) return // User not found

    const previousVote = targetDecision.voting.votes[currentUserVoteIndex].vote;

    // Update vote counts
    if (previousVote) {
      // Decrement previous vote count
      switch (previousVote) {
        case "in-favor": targetDecision.voting.inFavor = Math.max(0, targetDecision.voting.inFavor - 1); break;
        case "against": targetDecision.voting.against = Math.max(0, targetDecision.voting.against - 1); break;
        case "abstain": targetDecision.voting.abstain = Math.max(0, targetDecision.voting.abstain - 1); break;
      }
    }

    // Update to new vote
    targetDecision.voting.votes[currentUserVoteIndex].vote = vote

    // Increment new vote count
    switch (vote) {
      case "in-favor": targetDecision.voting.inFavor++; break;
      case "against": targetDecision.voting.against++; break;
      case "abstain": targetDecision.voting.abstain++; break;
    }

    setMeetingsData(updatedMeetings)

    // If a meeting is currently selected, update it
    if (selectedMeeting && selectedMeeting.id === targetMeeting.id) {
       setSelectedMeeting(targetMeeting); // Update the selected meeting state directly
    }
  }

  const handleViewTender = (tenderId: string) => {
    markTenderAsViewed(tenderId)
    setNewTendersCount(getNewTendersCount())
  }

  const translations = {
    calendarAndMeetings: language === "en" ? "Calendar & Meetings" : "التقويم والاجتماعات",
    votingAndDecisions: language === "en" ? "Voting & Decisions" : "التصويت والقرارات",
    governanceCompliance: language === "en" ? "Governance & Compliance" : "الحوكمة والامتثال",
    neomTenders: language === "en" ? "NEOM Tenders" : "مناقصات نيوم",
  }

  // TODO: Implement actual language toggle logic
  // This function currently only logs to console
  const toggleLanguage = () => {
     const newLang = language === 'en' ? 'ar' : 'en';
     setLanguage(newLang);
     console.log("Language toggled to:", newLang);
     // Add logic here to update document direction if needed:
     // document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }


  return (
    <>
      {/* Pass language and toggle function to Header if needed */}
      {/* <Header language={language} onToggleLanguage={toggleLanguage} /> */}

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {translations.calendarAndMeetings}
          </TabsTrigger>
          <TabsTrigger value="voting" className="flex items-center gap-2">
            <Vote className="h-4 w-4" />
            {translations.votingAndDecisions}
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            {translations.governanceCompliance}
          </TabsTrigger>
          <TabsTrigger value="neom-tenders" className="flex items-center gap-2 relative">
            <Bell className="h-4 w-4" />
            {translations.neomTenders}
            {newTendersCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {newTendersCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <BoardCalendar
            language={language}
            meetings={meetingsData}
            selectedMeeting={selectedMeeting}
            onMeetingSelect={handleMeetingSelect}
            onCreateMeeting={handleCreateMeeting}
            documents={documentsData}
          />
        </TabsContent>

        <TabsContent value="voting">
          <VotingDashboard language={language} meetings={meetingsData} onVoteSubmit={handleVoteSubmit} />
        </TabsContent>

        <TabsContent value="governance">
          <GovernanceCompliance language={language} />
        </TabsContent>

        <TabsContent value="neom-tenders">
          <NeomTenders language={language} onViewTender={handleViewTender} />
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  )
}