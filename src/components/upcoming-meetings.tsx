"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Adjusted path
import { Badge } from "@/components/ui/badge" // Adjusted path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Adjusted path
import { CalendarIcon, Clock, MapPin, Users, CheckCircle2, XCircle } from "lucide-react"
import { format, parse, isBefore } from "date-fns"
import { ar } from "date-fns/locale"
import { boardMembers } from "@/lib/data" // Adjusted path

interface UpcomingMeetingsProps {
  meetings: any[]
  language: "en" | "ar"
  onMeetingSelect: (meeting: any) => void
}

export function UpcomingMeetings({ meetings, language, onMeetingSelect }: UpcomingMeetingsProps) {
  const translations = {
    upcomingMeetings: language === "en" ? "Upcoming Meetings" : "الاجتماعات القادمة",
    confirmed: language === "en" ? "Confirmed" : "مؤكد",
    tentative: language === "en" ? "Tentative" : "مؤقت",
    canceled: language === "en" ? "Canceled" : "ملغى",
    attendees: language === "en" ? "Attendees" : "الحضور",
    dateFormat: language === "en" ? "MMM d, yyyy" : "d MMM yyyy",
    noMeetings: language === "en" ? "No upcoming meetings" : "لا توجد اجتماعات قادمة",
  }

  // Sort meetings by date (closest first)
  const sortedMeetings = [...meetings].sort((a, b) => {
    const dateA = parse(a.date, "yyyy-MM-dd", new Date())
    const dateB = parse(b.date, "yyyy-MM-dd", new Date())
    return dateA.getTime() - dateB.getTime()
  })

  // Filter to only show upcoming meetings (today and future)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingMeetings = sortedMeetings.filter((meeting) => {
      try { // Add error handling for parse
        const meetingDate = parse(meeting.date, "yyyy-MM-dd", new Date())
        return !isBefore(meetingDate, today)
      } catch(e) {
        console.error("Error parsing meeting date:", meeting.date, e);
        return false; // Exclude invalid dates
      }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{translations.confirmed}</Badge>
      case "tentative":
        return (
          <Badge variant="outline" className="border-amber-200 text-amber-800">
            {translations.tentative}
          </Badge>
        )
      case "canceled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            {translations.canceled}
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{translations.upcomingMeetings}</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => {
              let meetingDate: Date | null = null;
              try {
                  meetingDate = parse(meeting.date, "yyyy-MM-dd", new Date());
              } catch (e) {
                  console.error("Error parsing meeting date in map:", meeting.date, e);
              }
              const confirmedAttendees = meeting.attendees?.filter((a: any) => a.confirmed).length ?? 0; // Added optional chaining and default

              return (
                <div
                  key={meeting.id}
                  className={`p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors ${
                    meeting.status === "canceled" ? "opacity-60" : ""
                  }`}
                  onClick={() => meeting.status !== "canceled" && onMeetingSelect(meeting)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{meeting.title}</h3>
                    {getStatusBadge(meeting.status)}
                  </div>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {meetingDate ? format(meetingDate, translations.dateFormat, { locale: language === "ar" ? ar : undefined }) : "Invalid Date"}
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {meeting.time}
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {meeting.location}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Users className="h-3 w-3 mr-1" />
                      {translations.attendees}: {confirmedAttendees}/{meeting.attendees?.length ?? 0} {/* Added optional chaining and default */}
                    </div>

                    <div className="flex -space-x-2 overflow-hidden">
                      {meeting.attendees?.map((attendee: any) => { // Added optional chaining
                        const member = boardMembers.find((m) => m.id === attendee.id)
                        if (!member) return null

                        return (
                          <div key={attendee.id} className="relative">
                            <Avatar
                              className={`h-8 w-8 border-2 ${attendee.confirmed ? "border-emerald-200" : "border-gray-200"}`}
                            >
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {attendee.confirmed && (
                              <CheckCircle2 className="h-3 w-3 text-emerald-500 absolute -bottom-0.5 -right-0.5 bg-white rounded-full" />
                            )}
                            {meeting.status === "canceled" && (
                              <XCircle className="h-3 w-3 text-red-500 absolute -bottom-0.5 -right-0.5 bg-white rounded-full" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">{translations.noMeetings}</div>
        )}
      </CardContent>
    </Card>
  )
}