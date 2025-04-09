"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog" // Adjusted path
import { Button } from "@/components/ui/button" // Adjusted path
import { Input } from "@/components/ui/input" // Adjusted path
import { Label } from "@/components/ui/label" // Adjusted path
import { Calendar } from "@/components/ui/calendar" // Adjusted path
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Adjusted path
import { prayerTimes, boardMembers } from "@/lib/data" // Adjusted path
import { ar } from "date-fns/locale"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea" // Adjusted path
import { useToast } from "@/components/ui/use-toast" // Adjusted path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Adjusted path
import { FileText, Plus, Trash2, Target, CalendarIcon, Users } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox" // Adjusted path

interface NewMeetingModalProps {
  onClose: () => void
  language: "en" | "ar"
  onCreateMeeting: (data: { meeting: any; documents: any[] }) => void // Corrected type
}

interface Goal {
    revenueTarget: string;
    timeline: string;
    stakeholderAlignment: string;
}

interface AgendaItem {
    title: string;
    goals: Goal;
}

interface DocumentItem {
    title: string;
    type: string;
    sensitive: boolean;
    watermarked: boolean;
}
interface VotingItem {
    title: string;
    category: string;
    notes: string;
}


export function NewMeetingModal({ onClose, language, onCreateMeeting }: NewMeetingModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("boardroom")
  const [status, setStatus] = useState("confirmed")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [agendaItems, setAgendaItems] = useState<{strategic: AgendaItem[], operational: AgendaItem[], governance: AgendaItem[]}>({ // Added type
    strategic: [],
    operational: [],
    governance: [],
  })
  const [summary, setSummary] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeAgendaTab, setActiveAgendaTab] = useState<"strategic" | "operational" | "governance">("strategic"); // Typed state


  // New agenda item with goals
  const [newAgendaItem, setNewAgendaItem] = useState<AgendaItem>({ // Added type
    title: "",
    goals: {
      revenueTarget: "",
      timeline: "",
      stakeholderAlignment: "",
    },
  })

  // Document state
  const [documents, setDocuments] = useState<DocumentItem[]>([]) // Added type
  const [newDocument, setNewDocument] = useState<DocumentItem>({ // Added type
    title: "",
    type: "PDF",
    sensitive: false,
    watermarked: false,
  })

  // Voting items state
  const [votingItems, setVotingItems] = useState<VotingItem[]>([]) // Added type
  const [newVotingItem, setNewVotingItem] = useState<VotingItem>({ // Added type
    title: "",
    category: "strategic",
    notes: "",
  })

  const { toast } = useToast(); // Get toast function

  const translations = {
    newMeeting: language === "en" ? "New Board Meeting" : "اجتماع مجلس إدارة جديد",
    title: language === "en" ? "Meeting Title" : "عنوان الاجتماع",
    date: language === "en" ? "Date" : "التاريخ",
    time: language === "en" ? "Time" : "الوقت",
    location: language === "en" ? "Location" : "الموقع",
    status: language === "en" ? "Status" : "الحالة",
    confirmed: language === "en" ? "Confirmed" : "مؤكد",
    tentative: language === "en" ? "Tentative" : "مؤقت",
    cancel: language === "en" ? "Cancel" : "إلغاء",
    create: language === "en" ? "Create Meeting" : "إنشاء اجتماع",
    prayerTimes: language === "en" ? "Prayer Times" : "أوقات الصلاة",
    startTime: language === "en" ? "Start Time" : "وقت البدء",
    endTime: language === "en" ? "End Time" : "وقت الانتهاء",
    boardroom: language === "en" ? "Main Boardroom" : "قاعة الاجتماعات الرئيسية",
    virtual: language === "en" ? "Virtual (Zoom)" : "افتراضي (زوم)",
    agenda: language === "en" ? "Agenda Items" : "بنود جدول الأعمال",
    strategicItems: language === "en" ? "Strategic Items" : "البنود الاستراتيجية",
    operationalItems: language === "en" ? "Operational Items" : "البنود التشغيلية",
    governanceItems: language === "en" ? "Governance Items" : "بنود الحوكمة",
    enterItems: language === "en" ? "Enter items separated by commas" : "أدخل العناصر مفصولة بفواصل",
    required: language === "en" ? "Required" : "مطلوب",
    meetingCreated: language === "en" ? "Meeting created successfully" : "تم إنشاء الاجتماع بنجاح",
    errorCreating: language === "en" ? "Please fill all required fields" : "يرجى ملء جميع الحقول المطلوبة",
    details: language === "en" ? "Details" : "التفاصيل",
    documents: language === "en" ? "Documents" : "المستندات",
    voting: language === "en" ? "Voting Items" : "بنود التصويت",
    summary: language === "en" ? "Meeting Summary" : "ملخص الاجتماع",
    documentTitle: language === "en" ? "Document Title" : "عنوان المستند",
    documentType: language === "en" ? "Document Type" : "نوع المستند",
    sensitive: language === "en" ? "Sensitive" : "حساس",
    watermarked: language === "en" ? "Watermarked" : "مائية",
    addDocument: language === "en" ? "Add Document" : "إضافة مستند",
    votingItemTitle: language === "en" ? "Voting Item Title" : "عنوان بند التصويت",
    votingCategory: language === "en" ? "Category" : "الفئة",
    votingNotes: language === "en" ? "Notes" : "ملاحظات",
    addVotingItem: language === "en" ? "Add Voting Item" : "إضافة بند تصويت",
    strategic: language === "en" ? "Strategic" : "استراتيجي",
    operational: language === "en" ? "Operational" : "تشغيلي",
    governance: language === "en" ? "Governance" : "حوكمة",
    summaryPlaceholder: language === "en" ? "Enter a brief summary of the meeting..." : "أدخل ملخصًا موجزًا للاجتماع...",
    remove: language === "en" ? "Remove" : "إزالة",
    agendaItemTitle: language === "en" ? "Agenda Item Title" : "عنوان بند جدول الأعمال",
    addAgendaItem: language === "en" ? "Add Agenda Item" : "إضافة بند جدول الأعمال",
    goals: language === "en" ? "Goals" : "الأهداف",
    revenueTarget: language === "en" ? "Revenue Target" : "هدف الإيرادات",
    timeline: language === "en" ? "Timeline" : "الجدول الزمني",
    stakeholderAlignment: language === "en" ? "Stakeholder Alignment" : "توافق أصحاب المصلحة",
    revenueTargetPlaceholder: language === "en" ? "e.g., SAR 500M by 2030" : "مثال: 500 مليون ريال بحلول 2030",
    timelinePlaceholder: language === "en" ? "e.g., Q2 2025 - Q4 2026" : "مثال: الربع الثاني 2025 - الربع الرابع 2026",
    stakeholderAlignmentPlaceholder: language === "en" ? "e.g., 5:0 (Fully Aligned)" : "مثال: 5:0 (توافق كامل)",
  }

  // Generate time slots for the day (30 min intervals)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        const time = `${formattedHour}:${formattedMinute}`

        // Check if time slot overlaps with prayer times
        const isPrayerTime = Object.values(prayerTimes).some((prayerTime) => {
          const [prayerHour, prayerMinute] = prayerTime.split(":").map(Number)
          const slotHour = Number.parseInt(formattedHour)
          const slotMinute = Number.parseInt(formattedMinute)

          // Consider 30 minutes before and after prayer time as blocked
          const prayerTimeInMinutes = prayerHour * 60 + prayerMinute
          const slotTimeInMinutes = slotHour * 60 + slotMinute

          return Math.abs(prayerTimeInMinutes - slotTimeInMinutes) <= 30
        })

        slots.push({ time, isPrayerTime })
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleAddDocument = () => {
    if (!newDocument.title) return

    setDocuments([...documents, { ...newDocument }])
    setNewDocument({
      title: "",
      type: "PDF",
      sensitive: false,
      watermarked: false,
    })
  }

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = [...documents]
    updatedDocuments.splice(index, 1)
    setDocuments(updatedDocuments)
  }

  const handleAddVotingItem = () => {
    if (!newVotingItem.title) return

    setVotingItems([...votingItems, { ...newVotingItem }])
    setNewVotingItem({
      title: "",
      category: "strategic",
      notes: "",
    })
  }

  const handleRemoveVotingItem = (index: number) => {
    const updatedVotingItems = [...votingItems]
    updatedVotingItems.splice(index, 1)
    setVotingItems(updatedVotingItems)
  }

  const handleAddAgendaItem = () => {
    if (!newAgendaItem.title) return

    const updatedAgendaItems = { ...agendaItems }
    updatedAgendaItems[activeAgendaTab] = [...updatedAgendaItems[activeAgendaTab], { ...newAgendaItem }]

    setAgendaItems(updatedAgendaItems)
    setNewAgendaItem({
      title: "",
      goals: {
        revenueTarget: "",
        timeline: "",
        stakeholderAlignment: "",
      },
    })
  }

  const handleRemoveAgendaItem = (category: string, index: number) => {
    const updatedAgendaItems = { ...agendaItems } as any // Use any temporarily or define a better type
    updatedAgendaItems[category].splice(index, 1)
    setAgendaItems(updatedAgendaItems)
  }

  const handleSubmit = () => {
    if (!title || !date || !startTime || !endTime) {
      toast({
        title: translations.errorCreating,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Create voting items with proper structure
    const formattedVotingItems = votingItems.map((item, index) => {
      // Create empty votes for each board member
      const votes = boardMembers.map((member) => ({
        memberId: member.id,
        vote: null,
      }))

      return {
        id: `d${Date.now()}-${index}`,
        title: item.title,
        category: item.category,
        outcome: null, // New items have no outcome yet
        notes: item.notes,
        voting: {
          status: "open",
          inFavor: 0,
          against: 0,
          abstain: 0,
          votes: votes,
        },
      }
    })

    // Create document items with proper structure
    const formattedDocuments = documents.map((doc, index) => ({
      id: 1000 + Date.now() + index,
      title: doc.title,
      type: doc.type,
      date: format(date!, "yyyy-MM-dd"),
      sensitive: doc.sensitive,
      watermarked: doc.watermarked,
      meetingId: Date.now(), // Will be updated after meeting creation
    }))

    // Create new meeting object
    const newMeeting = {
      id: Date.now(), // Generate a unique ID
      title,
      date: format(date!, "yyyy-MM-dd"),
      time: `${startTime} - ${endTime}`,
      location: location === "boardroom" ? translations.boardroom : translations.virtual,
      status,
      summary: summary,
      agenda: agendaItems,
      decisions: formattedVotingItems,
    }

    // Update document meetingId with the actual meeting ID
    const documentsWithCorrectId = formattedDocuments.map((doc) => ({
      ...doc,
      meetingId: newMeeting.id,
    }))

    // Call the onCreateMeeting callback with both meeting and documents
    onCreateMeeting({
      meeting: newMeeting,
      documents: documentsWithCorrectId,
    })

    // Show success message
    toast({
      title: translations.meetingCreated,
    })

    // Close the modal
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{translations.newMeeting}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details">{translations.details}</TabsTrigger>
            <TabsTrigger value="agenda">{translations.agenda}</TabsTrigger>
            <TabsTrigger value="documents">{translations.documents}</TabsTrigger>
            <TabsTrigger value="voting">{translations.voting}</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                {translations.title} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder={language === "en" ? "Enter meeting title" : "أدخل عنوان الاجتماع"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 block">
                  {translations.date} <span className="text-red-500">*</span>
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  locale={language === "ar" ? ar : undefined}
                  required
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">{translations.location}</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.location} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boardroom">{translations.boardroom}</SelectItem>
                      <SelectItem value="virtual">{translations.virtual}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">{translations.status}</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">{translations.confirmed}</SelectItem>
                      <SelectItem value="tentative">{translations.tentative}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">
                      {translations.startTime} <span className="text-red-500">*</span>
                    </Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="--:--" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {timeSlots.map((slot, index) => (
                          <SelectItem
                            key={`start-${index}`}
                            value={slot.time}
                            disabled={slot.isPrayerTime}
                            className={slot.isPrayerTime ? "bg-green-50 text-green-800" : ""}
                          >
                            {slot.time}
                            {slot.isPrayerTime && " 🕌"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="endTime">
                      {translations.endTime} <span className="text-red-500">*</span>
                    </Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="--:--" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {timeSlots.map((slot, index) => (
                          <SelectItem
                            key={`end-${index}`}
                            value={slot.time}
                            disabled={slot.isPrayerTime}
                            className={slot.isPrayerTime ? "bg-green-50 text-green-800" : ""}
                          >
                            {slot.time}
                            {slot.isPrayerTime && " 🕌"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-md border border-green-100">
                  <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                    <span className="inline-block w-3 h-3 bg-green-600 rounded-full mr-2"></span>
                    {translations.prayerTimes}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-green-800">
                    {Object.entries(prayerTimes).map(([name, time]) => (
                      <div key={name} className="flex justify-between">
                        <span>{name}</span>
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="summary">{translations.summary}</Label>
              <Textarea
                id="summary"
                placeholder={translations.summaryPlaceholder}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="h-24"
              />
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="space-y-4">
             <Tabs value={activeAgendaTab} onValueChange={(value) => setActiveAgendaTab(value as "strategic" | "operational" | "governance")}>
              <TabsList className="mb-4">
                <TabsTrigger value="strategic">{translations.strategicItems}</TabsTrigger>
                <TabsTrigger value="operational">{translations.operationalItems}</TabsTrigger>
                <TabsTrigger value="governance">{translations.governanceItems}</TabsTrigger>
              </TabsList>

              {/* Strategic Agenda Items */}
               <TabsContent value="strategic" className="space-y-4">
                 <div className="border rounded-md p-4 space-y-4">
                   <h3 className="font-medium">{translations.addAgendaItem}</h3>
                    {/* Input for new strategic item title */}
                   <div>
                     <Label htmlFor="strategic-agenda-title">{translations.agendaItemTitle}</Label>
                     <Input
                      id="strategic-agenda-title" // Unique ID
                      value={newAgendaItem.title}
                      onChange={(e) => setNewAgendaItem({...newAgendaItem, title: e.target.value})}
                     />
                   </div>
                    {/* Goal Inputs */}
                   <div className="space-y-3">
                       <h4 className="text-sm font-medium">{translations.goals}</h4>
                       <div>
                          <Label htmlFor="strategic-revenue-target" className="flex items-center text-sm"><Target className="h-4 w-4 mr-1 text-emerald-600" />{translations.revenueTarget}</Label>
                          <Input id="strategic-revenue-target" placeholder={translations.revenueTargetPlaceholder} value={newAgendaItem.goals.revenueTarget} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, revenueTarget: e.target.value}})} />
                       </div>
                       <div>
                           <Label htmlFor="strategic-timeline" className="flex items-center text-sm"><CalendarIcon className="h-4 w-4 mr-1 text-emerald-600" />{translations.timeline}</Label>
                           <Input id="strategic-timeline" placeholder={translations.timelinePlaceholder} value={newAgendaItem.goals.timeline} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, timeline: e.target.value}})} />
                       </div>
                       <div>
                           <Label htmlFor="strategic-stakeholder-alignment" className="flex items-center text-sm"><Users className="h-4 w-4 mr-1 text-emerald-600" />{translations.stakeholderAlignment}</Label>
                           <Input id="strategic-stakeholder-alignment" placeholder={translations.stakeholderAlignmentPlaceholder} value={newAgendaItem.goals.stakeholderAlignment} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, stakeholderAlignment: e.target.value}})} />
                       </div>
                   </div>
                   <Button type="button" variant="outline" onClick={handleAddAgendaItem} disabled={!newAgendaItem.title} className="w-full"><Plus className="h-4 w-4 mr-2" />{translations.addAgendaItem}</Button>
                 </div>
                 {agendaItems.strategic.length > 0 && (
                   <div className="space-y-3">
                     <h3 className="font-medium">{translations.strategicItems} ({agendaItems.strategic.length})</h3>
                     {agendaItems.strategic.map((item, index) => (
                       <div key={`strategic-${index}`} className="border rounded-md p-3 bg-emerald-50">
                         <div className="flex justify-between items-start">
                           <h4 className="font-medium text-emerald-800">{item.title}</h4>
                           <Button variant="ghost" size="sm" onClick={() => handleRemoveAgendaItem("strategic", index)} className="h-8 w-8 p-0">
                             <Trash2 className="h-4 w-4 text-gray-500" />
                           </Button>
                         </div>
                         {item.goals && (
                           <div className="mt-2 space-y-1 text-xs">
                                {item.goals.revenueTarget && <div className="flex items-start"><Target className="h-3 w-3 mr-1 mt-0.5 text-emerald-600" /><div><span className="font-medium text-emerald-700">{translations.revenueTarget}:</span>{" "}{item.goals.revenueTarget}</div></div>}
                                {item.goals.timeline && <div className="flex items-start"><CalendarIcon className="h-3 w-3 mr-1 mt-0.5 text-emerald-600" /><div><span className="font-medium text-emerald-700">{translations.timeline}:</span>{" "}{item.goals.timeline}</div></div>}
                                {item.goals.stakeholderAlignment && <div className="flex items-start"><Users className="h-3 w-3 mr-1 mt-0.5 text-emerald-600" /><div><span className="font-medium text-emerald-700">{translations.stakeholderAlignment}:</span>{" "}{item.goals.stakeholderAlignment}</div></div>}
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                 )}
               </TabsContent>

               {/* Operational Agenda Items */}
               <TabsContent value="operational" className="space-y-4">
                  <div className="border rounded-md p-4 space-y-4">
                      <h3 className="font-medium">{translations.addAgendaItem}</h3>
                      <div>
                         <Label htmlFor="operational-agenda-title">{translations.agendaItemTitle}</Label>
                         <Input id="operational-agenda-title" value={newAgendaItem.title} onChange={(e) => setNewAgendaItem({...newAgendaItem, title: e.target.value})} />
                      </div>
                       <div className="space-y-3">
                           <h4 className="text-sm font-medium">{translations.goals}</h4>
                           <div>
                              <Label htmlFor="operational-revenue-target" className="flex items-center text-sm"><Target className="h-4 w-4 mr-1 text-blue-600" />{translations.revenueTarget}</Label>
                              <Input id="operational-revenue-target" placeholder={translations.revenueTargetPlaceholder} value={newAgendaItem.goals.revenueTarget} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, revenueTarget: e.target.value}})} />
                           </div>
                           <div>
                               <Label htmlFor="operational-timeline" className="flex items-center text-sm"><CalendarIcon className="h-4 w-4 mr-1 text-blue-600" />{translations.timeline}</Label>
                               <Input id="operational-timeline" placeholder={translations.timelinePlaceholder} value={newAgendaItem.goals.timeline} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, timeline: e.target.value}})} />
                           </div>
                           <div>
                               <Label htmlFor="operational-stakeholder-alignment" className="flex items-center text-sm"><Users className="h-4 w-4 mr-1 text-blue-600" />{translations.stakeholderAlignment}</Label>
                               <Input id="operational-stakeholder-alignment" placeholder={translations.stakeholderAlignmentPlaceholder} value={newAgendaItem.goals.stakeholderAlignment} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, stakeholderAlignment: e.target.value}})} />
                           </div>
                       </div>
                      <Button type="button" variant="outline" onClick={handleAddAgendaItem} disabled={!newAgendaItem.title} className="w-full"><Plus className="h-4 w-4 mr-2" />{translations.addAgendaItem}</Button>
                  </div>
                  {agendaItems.operational.length > 0 && (
                     <div className="space-y-3">
                        <h3 className="font-medium">{translations.operationalItems} ({agendaItems.operational.length})</h3>
                         {agendaItems.operational.map((item, index) => (
                             <div key={`operational-${index}`} className="border rounded-md p-3 bg-blue-50">
                                <div className="flex justify-between items-start">
                                   <h4 className="font-medium text-blue-800">{item.title}</h4>
                                   <Button variant="ghost" size="sm" onClick={() => handleRemoveAgendaItem("operational", index)} className="h-8 w-8 p-0">
                                     <Trash2 className="h-4 w-4 text-gray-500" />
                                   </Button>
                                </div>
                                {item.goals && (
                                    <div className="mt-2 space-y-1 text-xs">
                                        {item.goals.revenueTarget && <div className="flex items-start"><Target className="h-3 w-3 mr-1 mt-0.5 text-blue-600" /><div><span className="font-medium text-blue-700">{translations.revenueTarget}:</span>{" "}{item.goals.revenueTarget}</div></div>}
                                        {item.goals.timeline && <div className="flex items-start"><CalendarIcon className="h-3 w-3 mr-1 mt-0.5 text-blue-600" /><div><span className="font-medium text-blue-700">{translations.timeline}:</span>{" "}{item.goals.timeline}</div></div>}
                                        {item.goals.stakeholderAlignment && <div className="flex items-start"><Users className="h-3 w-3 mr-1 mt-0.5 text-blue-600" /><div><span className="font-medium text-blue-700">{translations.stakeholderAlignment}:</span>{" "}{item.goals.stakeholderAlignment}</div></div>}
                                    </div>
                                )}
                            </div>
                         ))}
                    </div>
                  )}
               </TabsContent>

               {/* Governance Agenda Items */}
               <TabsContent value="governance" className="space-y-4">
                   <div className="border rounded-md p-4 space-y-4">
                      <h3 className="font-medium">{translations.addAgendaItem}</h3>
                      <div>
                         <Label htmlFor="governance-agenda-title">{translations.agendaItemTitle}</Label>
                         <Input id="governance-agenda-title" value={newAgendaItem.title} onChange={(e) => setNewAgendaItem({...newAgendaItem, title: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                           <h4 className="text-sm font-medium">{translations.goals}</h4>
                           <div>
                              <Label htmlFor="governance-revenue-target" className="flex items-center text-sm"><Target className="h-4 w-4 mr-1 text-amber-600" />{translations.revenueTarget}</Label>
                              <Input id="governance-revenue-target" placeholder={translations.revenueTargetPlaceholder} value={newAgendaItem.goals.revenueTarget} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, revenueTarget: e.target.value}})} />
                           </div>
                           <div>
                               <Label htmlFor="governance-timeline" className="flex items-center text-sm"><CalendarIcon className="h-4 w-4 mr-1 text-amber-600" />{translations.timeline}</Label>
                               <Input id="governance-timeline" placeholder={translations.timelinePlaceholder} value={newAgendaItem.goals.timeline} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, timeline: e.target.value}})} />
                           </div>
                           <div>
                               <Label htmlFor="governance-stakeholder-alignment" className="flex items-center text-sm"><Users className="h-4 w-4 mr-1 text-amber-600" />{translations.stakeholderAlignment}</Label>
                               <Input id="governance-stakeholder-alignment" placeholder={translations.stakeholderAlignmentPlaceholder} value={newAgendaItem.goals.stakeholderAlignment} onChange={(e) => setNewAgendaItem({...newAgendaItem, goals: {...newAgendaItem.goals, stakeholderAlignment: e.target.value}})} />
                           </div>
                      </div>
                      <Button type="button" variant="outline" onClick={handleAddAgendaItem} disabled={!newAgendaItem.title} className="w-full"><Plus className="h-4 w-4 mr-2" />{translations.addAgendaItem}</Button>
                   </div>
                    {agendaItems.governance.length > 0 && (
                       <div className="space-y-3">
                          <h3 className="font-medium">{translations.governanceItems} ({agendaItems.governance.length})</h3>
                          {agendaItems.governance.map((item, index) => (
                              <div key={`governance-${index}`} className="border rounded-md p-3 bg-amber-50">
                                  <div className="flex justify-between items-start">
                                     <h4 className="font-medium text-amber-800">{item.title}</h4>
                                     <Button variant="ghost" size="sm" onClick={() => handleRemoveAgendaItem("governance", index)} className="h-8 w-8 p-0">
                                       <Trash2 className="h-4 w-4 text-gray-500" />
                                     </Button>
                                  </div>
                                  {item.goals && (
                                      <div className="mt-2 space-y-1 text-xs">
                                          {item.goals.revenueTarget && <div className="flex items-start"><Target className="h-3 w-3 mr-1 mt-0.5 text-amber-600" /><div><span className="font-medium text-amber-700">{translations.revenueTarget}:</span>{" "}{item.goals.revenueTarget}</div></div>}
                                          {item.goals.timeline && <div className="flex items-start"><CalendarIcon className="h-3 w-3 mr-1 mt-0.5 text-amber-600" /><div><span className="font-medium text-amber-700">{translations.timeline}:</span>{" "}{item.goals.timeline}</div></div>}
                                          {item.goals.stakeholderAlignment && <div className="flex items-start"><Users className="h-3 w-3 mr-1 mt-0.5 text-amber-600" /><div><span className="font-medium text-amber-700">{translations.stakeholderAlignment}:</span>{" "}{item.goals.stakeholderAlignment}</div></div>}
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                    )}
               </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="doc-title">{translations.documentTitle}</Label>
                  <Input
                    id="doc-title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="doc-type">{translations.documentType}</Label>
                  <Select
                    value={newDocument.type}
                    onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="PPTX">PPTX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sensitive"
                    checked={newDocument.sensitive}
                    onCheckedChange={(checked) => setNewDocument({ ...newDocument, sensitive: checked === true })}
                  />
                  <Label htmlFor="sensitive">{translations.sensitive}</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watermarked"
                    checked={newDocument.watermarked}
                    onCheckedChange={(checked) => setNewDocument({ ...newDocument, watermarked: checked === true })}
                  />
                  <Label htmlFor="watermarked">{translations.watermarked}</Label>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleAddDocument}
                disabled={!newDocument.title}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                {translations.addDocument}
              </Button>
            </div>

            {documents.length > 0 && (
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">
                  {translations.documents} ({documents.length})
                </h3>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{doc.title}</span>
                        <span className="ml-2 text-xs text-gray-500">({doc.type})</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
             <div className="grid gap-4 mb-4">
               <div>
                 <Label htmlFor="voting-title">{translations.votingItemTitle}</Label>
                 <Input
                   id="voting-title"
                   value={newVotingItem.title}
                   onChange={(e) => setNewVotingItem({ ...newVotingItem, title: e.target.value })}
                 />
               </div>

               <div>
                 <Label htmlFor="voting-category">{translations.votingCategory}</Label>
                 <Select
                   value={newVotingItem.category}
                   onValueChange={(value) => setNewVotingItem({ ...newVotingItem, category: value })}
                 >
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="strategic">{translations.strategic}</SelectItem>
                     <SelectItem value="operational">{translations.operational}</SelectItem>
                     <SelectItem value="governance">{translations.governance}</SelectItem>
                   </SelectContent>
                 </Select>
               </div>

               <div>
                 <Label htmlFor="voting-notes">{translations.votingNotes}</Label>
                 <Textarea
                   id="voting-notes"
                   value={newVotingItem.notes}
                   onChange={(e) => setNewVotingItem({ ...newVotingItem, notes: e.target.value })}
                 />
               </div>

               <Button
                 type="button"
                 variant="outline"
                 onClick={handleAddVotingItem}
                 disabled={!newVotingItem.title}
                 className="w-full"
               >
                 <Plus className="h-4 w-4 mr-2" />
                 {translations.addVotingItem}
               </Button>
             </div>

              {votingItems.length > 0 && (
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">
                    {translations.voting} ({votingItems.length})
                  </h3>
                  <div className="space-y-2">
                    {votingItems.map((item, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">
                              {item.category === "strategic"
                                ? translations.strategic
                                : item.category === "operational"
                                  ? translations.operational
                                  : translations.governance}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveVotingItem(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                        {item.notes && <div className="text-sm mt-1">{item.notes}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            {translations.cancel}
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (language === "en" ? "Creating..." : "جاري الإنشاء...") : translations.create}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}