"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar" // Adjusted path
import { MeetingDetails } from "@/components/meeting-details" // Adjusted path
import { DocumentsList } from "@/components/documents-list" // Adjusted path
import { UpcomingMeetings } from "@/components/upcoming-meetings" // Adjusted path
import { NewMeetingModal } from "@/components/new-meeting-modal" // Adjusted path
import { VoterRankings } from "@/components/voter-rankings" // Adjusted path
import { Button } from "@/components/ui/button" // Adjusted path
import { Card, CardContent } from "@/components/ui/card" // Adjusted path
import { Progress } from "@/components/ui/progress" // Adjusted path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Adjusted path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Adjusted path
import { Plus, Target, TrendingUp, Users, Trophy } from "lucide-react"
import { format, parse } from "date-fns"
import { ar } from "date-fns/locale"
import { upcomingMeetings, boardMembers } from "@/lib/data" // Adjusted path

interface BoardCalendarProps {
  language: "en" | "ar"
  meetings: any[]
  selectedMeeting: any | null
  onMeetingSelect: (meeting: any | null) => void
  onCreateMeeting: (data: { meeting: any; documents: any[] }) => void // Corrected type
  documents: any[]
}

export function BoardCalendar({
  language,
  meetings,
  selectedMeeting,
  onMeetingSelect,
  onCreateMeeting,
  documents,
}: BoardCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false)
  const [hoverDate, setHoverDate] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("metrics")

  // Combine regular meetings with upcoming meetings for display
  const allMeetings = [...meetings, ...upcomingMeetings]

  // Convert meeting dates to Date objects for the calendar
  const meetingDates = allMeetings.map((meeting) => {
    try {
        return parse(meeting.date, "yyyy-MM-dd", new Date());
    } catch (e) {
        console.error("Error parsing meeting date:", meeting.date, e);
        return null; // Return null for invalid dates
    }
  }).filter(date => date !== null) as Date[]; // Filter out nulls and assert type


  const handleDateSelect = (selectedDate: Date | undefined) => { // Renamed parameter
    if (!selectedDate) return

    const formattedDate = format(selectedDate, "yyyy-MM-dd")
    const meeting = allMeetings.find((m) => m.date === formattedDate)

    if (meeting) {
      onMeetingSelect(meeting)
    } else {
      onMeetingSelect(null)
    }

    setDate(selectedDate)
  }

  const handleDateMouseEnter = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    const meeting = allMeetings.find((m) => m.date === formattedDate)

    if (meeting) {
      setHoverDate(formattedDate)
    }
  }

  const handleDateMouseLeave = () => {
    setHoverDate(null)
  }

  // Calculate metrics across all meetings
  const calculateMetrics = () => {
    // Collect all agenda items with goals from all meetings
    const allAgendaItems = allMeetings
      .flatMap((meeting) => {
        const agenda = meeting.agenda || { strategic: [], operational: [], governance: [] }
        return [...(agenda.strategic || []), ...(agenda.operational || []), ...(agenda.governance || [])]
      })
      .filter((item) => item && item.goals) // Added check for item existence

    // Count items with each type of goal
    const revenueTargetItems = allAgendaItems.filter((item) => item.goals?.revenueTarget)
    const timelineItems = allAgendaItems.filter((item) => item.goals?.timeline)
    const stakeholderAlignmentItems = allAgendaItems.filter((item) => item.goals?.stakeholderAlignment)

    // Calculate success rates (for demo purposes)
    const revenueSuccessRate = Math.floor(Math.random() * 31) + 70 // 70-100%
    const timelineSuccessRate = Math.floor(Math.random() * 31) + 65 // 65-95%
    const alignmentSuccessRate = Math.floor(Math.random() * 31) + 60 // 60-90%

    // Get top supporters (for demo purposes)
    const getTopSupporters = () => {
      return boardMembers.slice(0, 3) // Just take first 3 board members for demo
    }

    return {
      revenue: {
        count: revenueTargetItems.length,
        successRate: revenueSuccessRate,
        supporters: getTopSupporters(),
      },
      timeline: {
        count: timelineItems.length,
        successRate: timelineSuccessRate,
        supporters: getTopSupporters(),
      },
      alignment: {
        count: stakeholderAlignmentItems.length,
        successRate: alignmentSuccessRate,
        supporters: getTopSupporters(),
      },
    }
  }

  const metrics = calculateMetrics()

  const translations = {
    boardMeetingCalendar: language === "en" ? "Board Meeting Calendar" : "تقويم اجتماع مجلس الإدارة",
    newMeeting: language === "en" ? "New Meeting" : "اجتماع جديد",
    clickToViewDetails: language === "en" ? "Click to view details" : "انقر لعرض التفاصيل",
    revenueTargets: language === "en" ? "Revenue Targets" : "أهداف الإيرادات",
    timelineTargets: language === "en" ? "Timeline Targets" : "أهداف الجدول الزمني",
    stakeholderAlignment: language === "en" ? "Stakeholder Alignment" : "توافق أصحاب المصلحة",
    successRate: language === "en" ? "Success Rate" : "معدل النجاح",
    supporters: language === "en" ? "Top Supporters" : "أبرز المؤيدين",
    totalCount: language === "en" ? "Total Count" : "العدد الإجمالي",
    metrics: language === "en" ? "Metrics" : "المقاييس",
    voterRankings: language === "en" ? "Voter Rankings" : "تصنيفات المصوتين",
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            {translations.metrics}
          </TabsTrigger>
          <TabsTrigger value="rankings" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            {translations.voterRankings}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Revenue Targets Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Target className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="font-medium text-emerald-800">{translations.revenueTargets}</h4>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-emerald-700">{translations.totalCount}</div>
                  <div className="text-2xl font-bold text-emerald-800">{metrics.revenue.count}</div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-emerald-700 mb-1">
                    <span>{translations.successRate}</span>
                    <span>{metrics.revenue.successRate}%</span>
                  </div>
                  <Progress value={metrics.revenue.successRate} className="h-2" indicatorClassName="bg-emerald-500" />
                </div>

                <div>
                  <div className="text-xs text-emerald-700 mb-2">{translations.supporters}</div>
                  <div className="flex -space-x-2">
                    {metrics.revenue.supporters.map((member, index) => (
                      <Avatar key={`revenue-${member.id}-${index}`} className="h-7 w-7 border-2 border-white">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-emerald-200 text-emerald-800 text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Targets Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-800">{translations.timelineTargets}</h4>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-blue-700">{translations.totalCount}</div>
                  <div className="text-2xl font-bold text-blue-800">{metrics.timeline.count}</div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-blue-700 mb-1">
                    <span>{translations.successRate}</span>
                    <span>{metrics.timeline.successRate}%</span>
                  </div>
                  <Progress value={metrics.timeline.successRate} className="h-2" indicatorClassName="bg-blue-500" />
                </div>

                <div>
                  <div className="text-xs text-blue-700 mb-2">{translations.supporters}</div>
                  <div className="flex -space-x-2">
                    {metrics.timeline.supporters.map((member, index) => (
                      <Avatar key={`timeline-${member.id}-${index}`} className="h-7 w-7 border-2 border-white">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-blue-200 text-blue-800 text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stakeholder Alignment Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 text-amber-600 mr-2" />
                  <h4 className="font-medium text-amber-800">{translations.stakeholderAlignment}</h4>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-amber-700">{translations.totalCount}</div>
                  <div className="text-2xl font-bold text-amber-800">{metrics.alignment.count}</div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-amber-700 mb-1">
                    <span>{translations.successRate}</span>
                    <span>{metrics.alignment.successRate}%</span>
                  </div>
                  <Progress value={metrics.alignment.successRate} className="h-2" indicatorClassName="bg-amber-500" />
                </div>

                <div>
                  <div className="text-xs text-amber-700 mb-2">{translations.supporters}</div>
                  <div className="flex -space-x-2">
                    {metrics.alignment.supporters.map((member, index) => (
                      <Avatar key={`alignment-${member.id}-${index}`} className="h-7 w-7 border-2 border-white">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-amber-200 text-amber-800 text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">{translations.boardMeetingCalendar}</h2>
                  <Button onClick={() => setShowNewMeetingModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {translations.newMeeting}
                  </Button>
                </div>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  locale={language === "ar" ? ar : undefined}
                  modifiers={{
                    meeting: meetingDates,
                  }}
                  modifiersStyles={{
                    meeting: {
                      fontWeight: "bold",
                      backgroundColor: "#e6f7ef",
                      color: "#047857",
                      borderRadius: "4px",
                    },
                  }}
                  components={{
                    DayContent: (props) => {
                      const formattedDate = format(props.date, "yyyy-MM-dd")
                      const isMeeting = allMeetings.some((m) => m.date === formattedDate)
                      const isHovered = hoverDate === formattedDate

                      return (
                        <div
                          className="relative w-full h-full flex items-center justify-center"
                          onMouseEnter={() => handleDateMouseEnter(props.date)}
                          onMouseLeave={handleDateMouseLeave}
                        >
                          <div>{props.date.getDate()}</div>
                          {isMeeting && (
                            <div
                              className={`absolute bottom-0 left-0 right-0 text-[8px] text-center ${isHovered ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"} rounded-b-sm py-0.5 px-1 transition-colors`}
                            >
                              {isHovered ? translations.clickToViewDetails : ""}
                            </div>
                          )}
                        </div>
                      )
                    },
                  }}
                />
              </div>

              {selectedMeeting && (
                <MeetingDetails
                  meeting={selectedMeeting}
                  language={language}
                  showVoting={false} // Assuming voting is handled elsewhere or within MeetingDetails if needed
                  documents={documents}
                  onVoteSubmit={onCreateMeeting} // Pass the function if MeetingDetails needs to trigger updates
                />
              )}
            </div>

            <div className="space-y-6">
              <UpcomingMeetings meetings={upcomingMeetings} language={language} onMeetingSelect={onMeetingSelect} />

              <DocumentsList
                documents={documents}
                language={language}
                selectedMeeting={selectedMeeting}
                selectedDate={date}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rankings">
          <VoterRankings language={language} boardMembers={boardMembers} />
        </TabsContent>
      </Tabs>

      {showNewMeetingModal && (
        <NewMeetingModal
          onClose={() => setShowNewMeetingModal(false)}
          language={language}
          onCreateMeeting={onCreateMeeting}
        />
      )}
    </div>
  )
}