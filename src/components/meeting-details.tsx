"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  FileText,
  File,
  FileIcon as FilePresentation,
  Lock,
  Info,
  Target,
  Calendar,
  Users,
} from "lucide-react"
import { DecisionOutcomes } from "./decision-outcomes" // Corrected path if necessary
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format, parse } from "date-fns"
import { ar } from "date-fns/locale"
import { VotingSystem } from "./voting-system"; // Import VotingSystem if used separately

interface MeetingDetailsProps {
  meeting: any
  language: "en" | "ar"
  showVoting?: boolean
  onVoteSubmit?: (decisionId: string, vote: string) => void
  documents?: any[]
}

// Define Goal and AgendaItem interfaces if not imported
interface Goal {
    revenueTarget: string;
    timeline: string;
    stakeholderAlignment: string;
}

interface AgendaItem {
    title: string;
    goals?: Goal; // Make goals optional if some items might not have them
}


export function MeetingDetails({
  meeting: initialMeeting,
  language,
  showVoting = false, // Voting handled within DecisionOutcomes, maybe remove prop?
  onVoteSubmit = () => {},
  documents = [],
}: MeetingDetailsProps) {
  const [meeting, setMeeting] = useState(initialMeeting)
  const [activeTab, setActiveTab] = useState<string>("overview")

  const translations = {
    strategic: language === "en" ? "Strategic" : "استراتيجي",
    operational: language === "en" ? "Operational" : "تشغيلي",
    governance: language === "en" ? "Governance" : "حوكمة",
    location: language === "en" ? "Location" : "الموقع",
    time: language === "en" ? "Time" : "الوقت",
    status: language === "en" ? "Status" : "الحالة",
    confirmed: language === "en" ? "Confirmed" : "مؤكد",
    tentative: language === "en" ? "Tentative" : "مؤقت",
    agenda: language === "en" ? "Agenda" : "جدول الأعمال",
    overview: language === "en" ? "Overview" : "نظرة عامة",
    decisions: language === "en" ? "Decisions" : "القرارات",
    documents: language === "en" ? "Documents" : "المستندات",
    summary: language === "en" ? "Summary" : "ملخص",
    votingSummary: language === "en" ? "Voting Summary" : "ملخص التصويت",
    supportingDocuments: language === "en" ? "Supporting Documents" : "المستندات الداعمة",
    noDocuments: language === "en" ? "No supporting documents" : "لا توجد مستندات داعمة",
    dateFormat: language === "en" ? "MMM d, yyyy" : "d MMM yyyy",
    private: language === "en" ? "Private" : "خاص",
    inFavor: language === "en" ? "In Favor" : "موافق",
    against: language === "en" ? "Against" : "معارض",
    abstain: language === "en" ? "Abstain" : "امتناع",
    notVoted: language === "en" ? "Not Voted" : "لم يصوت",
    votingStatus: language === "en" ? "Voting Status" : "حالة التصويت",
    open: language === "en" ? "Open" : "مفتوح",
    closed: language === "en" ? "Closed" : "مغلق",
    noSummary: language === "en" ? "No meeting summary available" : "لا يوجد ملخص متاح للاجتماع",
    goals: language === "en" ? "Goals" : "الأهداف",
    revenueTarget: language === "en" ? "Revenue Target" : "هدف الإيرادات",
    timeline: language === "en" ? "Timeline" : "الجدول الزمني",
    stakeholderAlignment: language === "en" ? "Stakeholder Alignment" : "توافق أصحاب المصلحة",
    noAgenda: language === "en" ? "No agenda available for this meeting" : "لا يوجد جدول أعمال متاح لهذا الاجتماع",
    canceled: language === "en" ? "Canceled" : "ملغى",
  }

  // Ensure agenda structure exists with default empty arrays
  const agenda = meeting.agenda || { strategic: [], operational: [], governance: [] }
  const strategicItems: AgendaItem[] = agenda.strategic || []
  const operationalItems: AgendaItem[] = agenda.operational || []
  const governanceItems: AgendaItem[] = agenda.governance || []

  // Calculate percentages for agenda categories
  const strategicCount = strategicItems.length
  const operationalCount = operationalItems.length
  const governanceCount = governanceItems.length
  const totalCount = strategicCount + operationalCount + governanceCount

  const strategicPercentage = totalCount > 0 ? Math.round((strategicCount / totalCount) * 100) : 0
  const operationalPercentage = totalCount > 0 ? Math.round((operationalCount / totalCount) * 100) : 0
  const governancePercentage = totalCount > 0 ? Math.round((governanceCount / totalCount) * 100) : 0

  // Get documents for this meeting
  const meetingDocuments = documents.filter((doc) => doc.meetingId === meeting.id)

  // Get documents for a specific decision
  const getDecisionDocuments = (decisionId: string) => {
    return meetingDocuments.filter((doc) => {
      const decision = meeting.decisions?.find((d: any) => d.id === decisionId)
      if (!decision || !decision.title || !doc.title) return false; // Added checks
      return (
        doc.title.toLowerCase().includes(decision.title.toLowerCase()) ||
        decision.title.toLowerCase().includes(doc.title.toLowerCase())
      )
    })
  }

    const handleInternalVoteSubmit = (decisionId: string, vote: string) => {
      // Create a deep copy of the meeting object to avoid direct state mutation
      const updatedMeeting = JSON.parse(JSON.stringify(meeting));

      // Find the decision within the copied meeting data
      const decision = updatedMeeting.decisions?.find((d: any) => d.id === decisionId);
      if (!decision || !decision.voting || !decision.voting.votes) return;

      // Find the current user's vote within the copied decision data
      const currentUserVoteIndex = decision.voting.votes.findIndex(
        (v: any) => v.memberId === "bm1" // Assuming bm1 is the current user
      );

      if (currentUserVoteIndex === -1) return; // User not found in votes array

      const previousVote = decision.voting.votes[currentUserVoteIndex].vote;

      // Update vote counts based on previous vote
      if (previousVote) {
        switch (previousVote) {
          case "in-favor": decision.voting.inFavor = Math.max(0, decision.voting.inFavor - 1); break;
          case "against": decision.voting.against = Math.max(0, decision.voting.against - 1); break;
          case "abstain": decision.voting.abstain = Math.max(0, decision.voting.abstain - 1); break;
        }
      }

      // Update the vote in the copied data
      decision.voting.votes[currentUserVoteIndex].vote = vote;

      // Increment the new vote count in the copied data
      switch (vote) {
        case "in-favor": decision.voting.inFavor++; break;
        case "against": decision.voting.against++; break;
        case "abstain": decision.voting.abstain++; break;
      }

      // Update the local state with the modified meeting data
      setMeeting(updatedMeeting);

      // Propagate the vote submission to the parent if the prop exists
      if(onVoteSubmit) {
          onVoteSubmit(decisionId, vote);
      }
  };


  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "PPTX":
        return <FilePresentation className="h-5 w-5 text-orange-500" />
      case "DOCX":
        return <File className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  // Calculate voting statistics
  const decisions = meeting.decisions || []
  const votingStats = {
    total: decisions.length,
    open: decisions.filter((d: any) => d.voting?.status === "open").length,
    closed: decisions.filter((d: any) => d.voting?.status === "closed").length,
    inFavor: decisions.reduce((acc: number, d: any) => acc + (d.voting?.inFavor || 0), 0),
    against: decisions.reduce((acc: number, d: any) => acc + (d.voting?.against || 0), 0),
    abstain: decisions.reduce((acc: number, d: any) => acc + (d.voting?.abstain || 0), 0),
  }

  // Format summary with paragraphs
  const formatSummary = (summary: string | null | undefined): React.ReactNode => { // Added return type
    if (!summary) return null
    return summary.split("\\n\\n").map((paragraph, index) => ( // Escaped newline
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-emerald-600">{translations.confirmed}</Badge>
      case "tentative":
        return <Badge variant="outline">{translations.tentative}</Badge>
      case "canceled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            {translations.canceled}
          </Badge>
        )
      default:
        return <Badge variant="outline">{translations.tentative}</Badge> // Default or handle unknown
    }
  }


  if (!meeting) {
     return null; // Or a loading/placeholder state
  }


  return (
    <>
      <Card className="border-t-4 border-t-emerald-600 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">{meeting.title}</CardTitle>
            {getStatusBadge(meeting.status)}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-500 mt-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {meeting.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              {meeting.time}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">{translations.overview}</TabsTrigger>
              <TabsTrigger value="decisions">{translations.decisions}</TabsTrigger>
              <TabsTrigger value="documents">{translations.documents}</TabsTrigger>
              <TabsTrigger value="summary">{translations.summary}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <h3 className="font-medium text-gray-800 mb-3">{translations.agenda}</h3>

              {totalCount > 0 ? (
                <>
                  <div className="flex gap-2 mb-4">
                    {strategicPercentage > 0 && (
                      <div
                        className="h-2 bg-emerald-600 rounded-full"
                        style={{ width: `${strategicPercentage}%` }}
                      ></div>
                    )}
                    {operationalPercentage > 0 && (
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${operationalPercentage}%` }}
                      ></div>
                    )}
                    {governancePercentage > 0 && (
                      <div
                        className="h-2 bg-amber-500 rounded-full"
                        style={{ width: `${governancePercentage}%` }}
                      ></div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {strategicCount > 0 && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center mb-2">
                          <span className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></span>
                          {translations.strategic} ({strategicPercentage}%)
                        </h4>
                        <div className="space-y-4">
                          {strategicItems.map((item, index) => (
                            <div key={`strategic-${index}`} className="border rounded-md p-3 bg-emerald-50">
                              <h5 className="font-medium text-sm text-emerald-800">{item.title}</h5>

                              {item.goals && (
                                <div className="mt-2 space-y-1 text-xs">
                                  {item.goals.revenueTarget && <div className="flex items-start"><Target className="h-3 w-3 mr-1 mt-0.5 text-emerald-600" /><div><span className="font-medium text-emerald-700">{translations.revenueTarget}:</span>{" "}{item.goals.revenueTarget}</div></div>}
                                  {item.goals.timeline && <div className="flex items-start"><Calendar className="h-3 w-3 mr-1 mt-0.5 text-emerald-600" /><div><span className="font-medium text-emerald-700">{translations.timeline}:</span>{" "}{item.goals.timeline}</div></div>}
                                  {item.goals.stakeholderAlignment && <div className="flex items-start"><Users className="h-3 w-3 mr-1 mt-0.5 text-emerald-600" /><div><span className="font-medium text-emerald-700">{translations.stakeholderAlignment}:</span>{" "}{item.goals.stakeholderAlignment}</div></div>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {operationalCount > 0 && (
                       <div>
                         <h4 className="text-sm font-medium flex items-center mb-2">
                           <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                           {translations.operational} ({operationalPercentage}%)
                         </h4>
                         <div className="space-y-4">
                           {operationalItems.map((item, index) => (
                             <div key={`operational-${index}`} className="border rounded-md p-3 bg-blue-50">
                               <h5 className="font-medium text-sm text-blue-800">{item.title}</h5>
                                {item.goals && (
                                   <div className="mt-2 space-y-1 text-xs">
                                       {item.goals.revenueTarget && <div className="flex items-start"><Target className="h-3 w-3 mr-1 mt-0.5 text-blue-600" /><div><span className="font-medium text-blue-700">{translations.revenueTarget}:</span>{" "}{item.goals.revenueTarget}</div></div>}
                                       {item.goals.timeline && <div className="flex items-start"><Calendar className="h-3 w-3 mr-1 mt-0.5 text-blue-600" /><div><span className="font-medium text-blue-700">{translations.timeline}:</span>{" "}{item.goals.timeline}</div></div>}
                                       {item.goals.stakeholderAlignment && <div className="flex items-start"><Users className="h-3 w-3 mr-1 mt-0.5 text-blue-600" /><div><span className="font-medium text-blue-700">{translations.stakeholderAlignment}:</span>{" "}{item.goals.stakeholderAlignment}</div></div>}
                                   </div>
                               )}
                             </div>
                           ))}
                         </div>
                       </div>
                    )}

                    {governanceCount > 0 && (
                        <div>
                          <h4 className="text-sm font-medium flex items-center mb-2">
                            <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                            {translations.governance} ({governancePercentage}%)
                          </h4>
                          <div className="space-y-4">
                            {governanceItems.map((item, index) => (
                              <div key={`governance-${index}`} className="border rounded-md p-3 bg-amber-50">
                                <h5 className="font-medium text-sm text-amber-800">{item.title}</h5>
                                 {item.goals && (
                                     <div className="mt-2 space-y-1 text-xs">
                                         {item.goals.revenueTarget && <div className="flex items-start"><Target className="h-3 w-3 mr-1 mt-0.5 text-amber-600" /><div><span className="font-medium text-amber-700">{translations.revenueTarget}:</span>{" "}{item.goals.revenueTarget}</div></div>}
                                         {item.goals.timeline && <div className="flex items-start"><Calendar className="h-3 w-3 mr-1 mt-0.5 text-amber-600" /><div><span className="font-medium text-amber-700">{translations.timeline}:</span>{" "}{item.goals.timeline}</div></div>}
                                         {item.goals.stakeholderAlignment && <div className="flex items-start"><Users className="h-3 w-3 mr-1 mt-0.5 text-amber-600" /><div><span className="font-medium text-amber-700">{translations.stakeholderAlignment}:</span>{" "}{item.goals.stakeholderAlignment}</div></div>}
                                     </div>
                                 )}
                              </div>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-gray-500">{translations.noAgenda}</div>
              )}

              {/* Voting Summary */}
              {decisions.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-3">{translations.votingSummary}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500">{translations.votingStatus}</div>
                      <div className="flex justify-between mt-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          <span className="text-xs">{translations.open}</span>
                        </div>
                        <span className="font-medium">{votingStats.open}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                          <span className="text-xs">{translations.closed}</span>
                        </div>
                        <span className="font-medium">{votingStats.closed}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500">{translations.decisions}</div>
                      <div className="text-xl font-bold mt-1">{votingStats.total}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md col-span-2 md:col-span-1">
                      <div className="text-sm text-gray-500">{translations.votingSummary}</div>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="text-center">
                          <div className="text-xs text-emerald-600">{translations.inFavor}</div>
                          <div className="font-medium">{votingStats.inFavor}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-red-600">{translations.against}</div>
                          <div className="font-medium">{votingStats.against}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-amber-600">{translations.abstain}</div>
                          <div className="font-medium">{votingStats.abstain}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="decisions">
               {decisions.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {decisions.map((decision: any) => {
                    const decisionDocuments = getDecisionDocuments(decision.id)

                    return (
                      <AccordionItem key={decision.id} value={decision.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex flex-col items-start text-left">
                            <div className="font-medium">{decision.title}</div>
                            <div className="text-xs text-gray-500">
                              {decision.category === "strategic"
                                ? translations.strategic
                                : decision.category === "operational"
                                  ? translations.operational
                                  : translations.governance}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm">{decision.notes}</div>
                            </div>

                            {/* Voting information */}
                            {decision.voting && (
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="text-sm font-medium mb-2">{translations.votingStatus}</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="text-center p-2 bg-emerald-50 rounded">
                                    <div className="text-xs text-emerald-600">{translations.inFavor}</div>
                                    <div className="font-medium">{decision.voting.inFavor}</div>
                                  </div>
                                  <div className="text-center p-2 bg-red-50 rounded">
                                    <div className="text-xs text-red-600">{translations.against}</div>
                                    <div className="font-medium">{decision.voting.against}</div>
                                  </div>
                                  <div className="text-center p-2 bg-amber-50 rounded">
                                    <div className="text-xs text-amber-600">{translations.abstain}</div>
                                    <div className="font-medium">{decision.voting.abstain}</div>
                                  </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  {translations.votingStatus}:{" "}
                                  <Badge
                                    variant={decision.voting.status === "open" ? "outline" : "secondary"}
                                    className="ml-1"
                                  >
                                    {decision.voting.status === "open" ? translations.open : translations.closed}
                                  </Badge>
                                </div>
                              </div>
                            )}

                            {/* Supporting documents */}
                            <div>
                              <h4 className="text-sm font-medium mb-2">{translations.supportingDocuments}</h4>
                              {decisionDocuments.length > 0 ? (
                                <div className="space-y-2">
                                  {decisionDocuments.map((doc: any) => {
                                      let dateObj: Date | null = null;
                                      try {
                                          dateObj = parse(doc.date, "yyyy-MM-dd", new Date());
                                      } catch (e) {
                                          console.error("Error parsing document date:", doc.date, e);
                                      }
                                    return (
                                      <div
                                        key={doc.id}
                                        className="p-2 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer relative"
                                      >
                                        {doc.watermarked && (
                                          <div className="absolute inset-0 flex items-center justify-center opacity-10 rotate-[-30deg] text-lg font-bold text-gray-800 pointer-events-none">
                                            Abdullah Al-Qahtani
                                          </div>
                                        )}
                                        <div className="flex items-start">
                                          <div className="mr-3">{getDocumentIcon(doc.type)}</div>
                                          <div className="flex-1">
                                            <div className="flex justify-between">
                                              <h3 className="font-medium text-gray-800">{doc.title}</h3>
                                              {doc.sensitive && (
                                                <span className="flex items-center text-xs text-gray-500">
                                                  <Lock className="h-3 w-3 mr-1" />
                                                  {translations.private}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                              {dateObj ? format(dateObj, translations.dateFormat, { locale: language === "ar" ? ar : undefined }) : "Invalid Date"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500">{translations.noDocuments}</div>
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Info className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  {language === "en" ? "No decisions have been made yet" : "لم يتم اتخاذ أي قرارات بعد"}
                </div>
              )}
            </TabsContent>

             <TabsContent value="documents">
              {meetingDocuments.length > 0 ? (
                <div className="space-y-3">
                  {meetingDocuments.map((doc: any) => {
                     let dateObj: Date | null = null;
                     try {
                        dateObj = parse(doc.date, "yyyy-MM-dd", new Date());
                     } catch(e) {
                        console.error("Error parsing document date in map:", doc.date, e);
                     }

                    return (
                      <div
                        key={doc.id}
                        className="p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer relative"
                      >
                        {doc.watermarked && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-10 rotate-[-30deg] text-lg font-bold text-gray-800 pointer-events-none">
                            Abdullah Al-Qahtani
                          </div>
                        )}
                        <div className="flex items-start">
                          <div className="mr-3">{getDocumentIcon(doc.type)}</div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-800">{doc.title}</h3>
                              {doc.sensitive && (
                                <span className="flex items-center text-xs text-gray-500">
                                  <Lock className="h-3 w-3 mr-1" />
                                  {translations.private}
                                </span>
                              )}
                            </div>
                             <p className="text-xs text-gray-500 mt-1">
                              {dateObj ? format(dateObj, translations.dateFormat, { locale: language === "ar" ? ar : undefined }) : "Invalid Date"}
                             </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Info className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  {language === "en"
                    ? "No documents available for this meeting"
                    : "لا توجد مستندات متاحة لهذا الاجتماع"}
                </div>
              )}
            </TabsContent>

             <TabsContent value="summary">
              {meeting.summary ? (
                <div className="prose max-w-none">{formatSummary(meeting.summary)}</div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Info className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  {translations.noSummary}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* This DecisionOutcomes rendering logic might be redundant if VotingDashboard handles it */}
      {/* Consider removing this if VotingDashboard already shows outcomes for the selected meeting */}
      {/* {showVoting && decisions.length > 0 && activeTab !== "decisions" && (
        <DecisionOutcomes decisions={decisions} language={language} onVoteSubmit={handleInternalVoteSubmit} />
      )} */}
    </>
  )
}