"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Adjusted path
import { Badge } from "@/components/ui/badge" // Adjusted path
import { Button } from "@/components/ui/button" // Adjusted path
import { Input } from "@/components/ui/input" // Adjusted path
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs" // Adjusted path
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog" // Adjusted path
import { Separator } from "@/components/ui/separator" // Adjusted path
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  FileText,
  Download,
  Building2,
  Banknote,
  ListChecks,
  ExternalLink,
} from "lucide-react"
import { format, parse, differenceInDays } from "date-fns"
import { ar } from "date-fns/locale"
import { neomTenders, type Tender, type TenderStatus, type TenderCategory } from "@/lib/neom-data" // Adjusted path
import { useToast } from "@/components/ui/use-toast" // Adjusted path
import React from "react" // Added React import


interface NeomTendersProps {
  language: "en" | "ar"
  onViewTender: (tenderId: string) => void
}

export function NeomTenders({ language, onViewTender }: NeomTendersProps) {
  const [tenders] = useState<Tender[]>(neomTenders) // Added type
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TenderStatus | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<TenderCategory | "all">("all")
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null)
  const [showTenderDetails, setShowTenderDetails] = useState(false)

  const { toast } = useToast(); // Destructure toast

  const translations = {
    neomTenders: language === "en" ? "NEOM Tenders" : "مناقصات نيوم",
    search: language === "en" ? "Search tenders..." : "البحث في المناقصات...",
    all: language === "en" ? "All" : "الكل",
    open: language === "en" ? "Open" : "مفتوح",
    closingSoon: language === "en" ? "Closing Soon" : "يغلق قريبًا",
    closed: language === "en" ? "Closed" : "مغلق",
    awarded: language === "en" ? "Awarded" : "تم الترسية",
    cancelled: language === "en" ? "Cancelled" : "ملغي",
    filterByStatus: language === "en" ? "Filter by Status" : "تصفية حسب الحالة",
    filterByCategory: language === "en" ? "Filter by Category" : "تصفية حسب الفئة",
    tenderDetails: language === "en" ? "Tender Details" : "تفاصيل المناقصة",
    publishDate: language === "en" ? "Publish Date" : "تاريخ النشر",
    closingDate: language === "en" ? "Closing Date" : "تاريخ الإغلاق",
    estimatedValue: language === "en" ? "Estimated Value" : "القيمة التقديرية",
    location: language === "en" ? "Location" : "الموقع",
    contactPerson: language === "en" ? "Contact Person" : "الشخص المسؤول",
    contactEmail: language === "en" ? "Contact Email" : "البريد الإلكتروني للتواصل",
    documents: language === "en" ? "Documents" : "المستندات",
    requirements: language === "en" ? "Requirements" : "المتطلبات",
    close: language === "en" ? "Close" : "إغلاق",
    expressInterest: language === "en" ? "Express Interest" : "إبداء الاهتمام",
    visitPortal: language === "en" ? "Visit NEOM Tender Portal" : "زيارة بوابة مناقصات نيوم",
    daysLeft: language === "en" ? "days left" : "أيام متبقية",
    dayLeft: language === "en" ? "day left" : "يوم متبقي",
    closed_status: language === "en" ? "Closed" : "مغلق", // Separate translation for 'Closed' status
    new: language === "en" ? "NEW" : "جديد",
    dateFormat: language === "en" ? "MMM d, yyyy" : "d MMM yyyy",
    noTendersFound:
      language === "en" ? "No tenders found matching your criteria" : "لم يتم العثور على مناقصات تطابق معاييرك",
    interestSubmitted: language === "en" ? "Interest submitted successfully" : "تم تقديم الاهتمام بنجاح",
  }

  const handleViewTender = (tender: Tender) => {
    setSelectedTender(tender)
    setShowTenderDetails(true)

    if (tender.isNew && !tender.isViewed) {
      onViewTender(tender.id)
    }
  }

  const handleExpressInterest = () => {
    if (!selectedTender) return; // Add null check
    toast({
      title: translations.interestSubmitted,
      description: selectedTender.title, // Removed optional chaining as selectedTender is guaranteed here
    })
    setShowTenderDetails(false)
  }

  const getStatusBadge = (status: TenderStatus) => {
    switch (status) {
      case "open":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{translations.open}</Badge>
      case "closing-soon":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">{translations.closingSoon}</Badge>
      case "closed":
        return <Badge variant="outline">{translations.closed_status}</Badge>
      case "awarded":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{translations.awarded}</Badge>
      case "cancelled":
        return <Badge variant="destructive">{translations.cancelled}</Badge>
      default:
        return null
    }
  }

  const getDaysRemaining = (closingDate: string) => {
    const today = new Date()
    let closeDate: Date | null = null;
    try {
        closeDate = parse(closingDate, "yyyy-MM-dd", new Date());
    } catch (e) {
        console.error("Error parsing closing date:", closingDate, e);
        return "Invalid Date"; // Or handle appropriately
    }

    const daysLeft = differenceInDays(closeDate, today)

    if (daysLeft <= 0) return null // Return null or specific text like "Closed"

    return daysLeft === 1 ? `1 ${translations.dayLeft}` : `${daysLeft} ${translations.daysLeft}`
  }

  // Filter tenders based on search term and filters
  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tender.status === statusFilter
    const matchesCategory = categoryFilter === "all" || tender.category === categoryFilter

    return matchesSearch && matchesStatus // && matchesCategory; // Category filter UI not implemented yet
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Building2 className="h-6 w-6 mr-2 text-emerald-600" />
            {translations.neomTenders}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder={translations.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500 mr-2">{translations.filterByStatus}:</span>
                <Tabs
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as TenderStatus | "all")}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="all" className="text-xs">
                      {translations.all}
                    </TabsTrigger>
                    <TabsTrigger value="open" className="text-xs">
                      {translations.open}
                    </TabsTrigger>
                    <TabsTrigger value="closing-soon" className="text-xs">
                      {translations.closingSoon}
                    </TabsTrigger>
                    <TabsTrigger value="closed" className="text-xs">
                      {translations.closed_status}
                    </TabsTrigger>
                    <TabsTrigger value="awarded" className="text-xs">
                      {translations.awarded}
                    </TabsTrigger>
                     <TabsTrigger value="cancelled" className="text-xs"> {/* Added cancelled filter */}
                       {translations.cancelled}
                     </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
               {/* TODO: Add Category Filter UI similar to Status Filter */}
            </div>
          </div>

          {filteredTenders.length > 0 ? (
            <div className="space-y-4">
              {filteredTenders.map((tender) => {
                    let closingDateParsed: Date | null = null;
                    let publishDateParsed: Date | null = null;
                    let daysRemainingStr: string | null = null;
                    try {
                        closingDateParsed = parse(tender.closingDate, "yyyy-MM-dd", new Date());
                        publishDateParsed = parse(tender.publishDate, "yyyy-MM-dd", new Date());
                        daysRemainingStr = getDaysRemaining(tender.closingDate);
                    } catch (e) {
                         console.error("Error parsing date for tender:", tender.id, e);
                    }

                return (
                <div
                  key={tender.id}
                  className={`p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors relative ${
                    tender.isNew && !tender.isViewed ? "border-l-4 border-l-emerald-500" : ""
                  }`}
                  onClick={() => handleViewTender(tender)}
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <h3 className="font-medium text-lg flex-1">{tender.title}</h3>
                        {tender.isNew && !tender.isViewed && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white ml-2">
                            {translations.new}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tender.description}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {getStatusBadge(tender.status)}
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {closingDateParsed ? format(closingDateParsed, translations.dateFormat, {
                            locale: language === "ar" ? ar : undefined,
                          }) : 'Invalid Date'}
                        </div>
                         {/* Display Category Badge Here if needed */}
                        {/* <Badge variant="outline" className="text-xs capitalize">{tender.category}</Badge> */}
                      </div>
                    </div>

                    <div className="mt-3 md:mt-0 md:ml-4 flex flex-col items-end justify-between">
                      <div className="text-right">
                        <div className="font-medium text-emerald-700">{tender.estimatedValue}</div>
                        <div className="text-sm text-gray-500">{tender.location}</div>
                      </div>

                      {(tender.status === "open" || tender.status === "closing-soon") && daysRemainingStr && (
                        <div className="mt-2">
                            <div className="text-xs font-medium text-amber-600">
                                {daysRemainingStr}
                            </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )})}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">{translations.noTendersFound}</div>
          )}
        </CardContent>
      </Card>

      {/* Tender Details Dialog */}
      {selectedTender && (
        <Dialog open={showTenderDetails} onOpenChange={setShowTenderDetails}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{translations.tenderDetails}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <h2 className="text-xl font-bold">{selectedTender.title}</h2>
              <p className="text-gray-700">{selectedTender.description}</p>

              <div className="flex flex-wrap gap-2">
                <div className="text-sm">{getStatusBadge(selectedTender.status)}</div>
                 {/* Display Category Badge Here if needed */}
                 {/* <Badge variant="outline" className="text-sm capitalize">{selectedTender.category}</Badge> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">{translations.publishDate}</div>
                      <div className="font-medium">
                        {format(parse(selectedTender.publishDate, "yyyy-MM-dd", new Date()), translations.dateFormat, {
                          locale: language === "ar" ? ar : undefined,
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">{translations.closingDate}</div>
                      <div className="font-medium">
                        {format(parse(selectedTender.closingDate, "yyyy-MM-dd", new Date()), translations.dateFormat, {
                          locale: language === "ar" ? ar : undefined,
                        })}
                        {getDaysRemaining(selectedTender.closingDate) && (
                          <span className="ml-2 text-xs font-medium text-amber-600">
                            ({getDaysRemaining(selectedTender.closingDate)})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Banknote className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">{translations.estimatedValue}</div>
                      <div className="font-medium">{selectedTender.estimatedValue}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">{translations.location}</div>
                      <div className="font-medium">{selectedTender.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">{translations.contactPerson}</div>
                      <div className="font-medium">{selectedTender.contactPerson}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">{translations.contactEmail}</div>
                      <div className="font-medium">{selectedTender.contactEmail}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  {translations.documents}
                </h3>
                <div className="space-y-2">
                  {selectedTender.documents.map((doc, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{doc.name}</span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({doc.type}, {doc.size})
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => alert('Download not implemented in reconstruction')}>
                        <Download className="h-4 w-4 mr-1" />
                        {language === "en" ? "Download" : "تنزيل"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <ListChecks className="h-5 w-5 mr-2 text-gray-500" />
                  {translations.requirements}
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  {selectedTender.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2">
              <Button variant="outline" onClick={() => setShowTenderDetails(false)}>
                {translations.close}
              </Button>
              {(selectedTender.status === "open" || selectedTender.status === "closing-soon") && (
                <>
                  <Button variant="outline" onClick={() => window.open("https://neom.com/tenders", "_blank")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {translations.visitPortal}
                  </Button>
                  <Button onClick={handleExpressInterest}>{translations.expressInterest}</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}