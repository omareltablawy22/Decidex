// src/components/governance-compliance.tsx
"use client";

import type React from "react"; // Added React import
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format, parse, isAfter, differenceInDays } from "date-fns";
import { ar } from "date-fns/locale";
// Import ComplianceStatus from data.ts, remove TenderStatus/Category import
import { complianceItems, type ComplianceStatus } from "@/lib/data";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator" // Adjusted path

interface GovernanceComplianceProps {
  language: "en" | "ar";
}

// Define ComplianceItem type using the imported ComplianceStatus
interface ComplianceItem {
  id: string;
  portalName: string;
  impact: string;
  requiredForPublic: boolean;
  requiredForPrivate: boolean;
  purpose: string;
  link: string;
  status: ComplianceStatus; // Use ComplianceStatus here
  lastSubmission: string | null;
  nextDue: string;
  template: string;
  receipt: string | null;
}

export function GovernanceCompliance({ language }: GovernanceComplianceProps) {
  // Use ComplianceStatus for filter state
  const [filter, setFilter] = useState<ComplianceStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  // Use ComplianceItem[] for data state
  const [complianceData, setComplianceData] = useState<ComplianceItem[]>(complianceItems);

  const { toast } = useToast();

  const translations = {
    governanceCompliance: language === "en" ? "Governance & Compliance" : "الحوكمة والامتثال",
    all: language === "en" ? "All" : "الكل",
    completed: language === "en" ? "Completed" : "مكتمل",
    pending: language === "en" ? "Pending" : "قيد الانتظار",
    overdue: language === "en" ? "Overdue" : "متأخر",
    portalName: language === "en" ? "Portal Name" : "اسم البوابة",
    impact: language === "en" ? "Impact of UBO Rules" : "تأثير قواعد المستفيد الحقيقي",
    requiredForPublic: language === "en" ? "Required for Public Companies" : "مطلوب للشركات العامة",
    requiredForPrivate: language === "en" ? "Required for Private Companies" : "مطلوب للشركات الخاصة",
    purpose: language === "en" ? "Purpose" : "الغرض",
    status: language === "en" ? "Status" : "الحالة",
    lastSubmission: language === "en" ? "Last Submission" : "آخر تقديم",
    nextDue: language === "en" ? "Next Due" : "الاستحقاق التالي",
    actions: language === "en" ? "Actions" : "الإجراءات",
    downloadTemplate: language === "en" ? "Download Template" : "تنزيل النموذج",
    uploadReceipt: language === "en" ? "Upload Receipt" : "تحميل الإيصال",
    viewReceipt: language === "en" ? "View Receipt" : "عرض الإيصال",
    search: language === "en" ? "Search..." : "بحث...",
    uploadReceiptFor: language === "en" ? "Upload Receipt for" : "تحميل الإيصال لـ",
    selectFile: language === "en" ? "Select File" : "اختر ملف",
    noFileSelected: language === "en" ? "No file selected" : "لم يتم اختيار ملف",
    upload: language === "en" ? "Upload" : "تحميل",
    cancel: language === "en" ? "Cancel" : "إلغاء",
    uploadSuccess: language === "en" ? "Receipt uploaded successfully" : "تم تحميل الإيصال بنجاح",
    required: language === "en" ? "Required" : "مطلوب",
    maybeRequired: language === "en" ? "Maybe Required" : "قد يكون مطلوبًا",
    no: language === "en" ? "No" : "لا",
    yes: language === "en" ? "Yes" : "نعم",
    visitPortal: language === "en" ? "Visit Portal" : "زيارة البوابة",
    dateFormat: language === "en" ? "MMM d, yyyy" : "d MMM yyyy",
    filterBy: language === "en" ? "Filter by" : "تصفية حسب",
    complianceStats: language === "en" ? "Compliance Statistics" : "إحصائيات الامتثال",
    totalItems: language === "en" ? "Total Items" : "إجمالي العناصر",
    upcomingDeadlines: language === "en" ? "Upcoming Deadlines" : "المواعيد النهائية القادمة",
    // Add missing translations if needed, though they seem unused now
    awarded: language === "en" ? "Awarded" : "تم الترسية",
    cancelled: language === "en" ? "Cancelled" : "ملغي",
  };

  // Use ComplianceStatus in the function signature
  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {translations.completed}
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-amber-200 text-amber-800">
            <Clock className="h-3 w-3" />
            {translations.pending}
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {translations.overdue}
          </Badge>
        );
      // Remove cases for awarded/cancelled unless they are added to ComplianceStatus
      // case "awarded":
      //   return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{translations.awarded}</Badge>;
      // case "cancelled":
      //   return <Badge variant="destructive">{translations.cancelled}</Badge>;
      default:
        // This should ideally not happen if status is correctly typed
        const _exhaustiveCheck: never = status;
        return null;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "Required":
        return <Badge className="bg-red-100 text-red-800 border-red-200">{translations.required}</Badge>;
      case "Maybe Required":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">{translations.maybeRequired}</Badge>;
      case "No":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{translations.no}</Badge>;
      default:
        return null;
    }
  };

  const getRequiredBadge = (required: boolean) => {
    return required ? (
      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{translations.yes}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">{translations.no}</Badge>
    );
  };

  const handleUpload = (item: ComplianceItem) => {
    setSelectedItem(item);
    setUploadDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleSubmitUpload = () => {
    if (!uploadFile || !selectedItem) return;

    const updatedData = complianceData.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          status: "completed" as ComplianceStatus, // No need to assert type if 'complianceItems' uses correct statuses
          lastSubmission: format(new Date(), "yyyy-MM-dd"),
          receipt: uploadFile.name,
        };
      }
      return item;
    });

    setComplianceData(updatedData);
    setUploadDialogOpen(false);
    setUploadFile(null);

    toast({
      title: translations.uploadSuccess,
      description: `${selectedItem.portalName}: ${uploadFile.name}`,
    });
  };

  const filteredItems = complianceData.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      item.portalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = complianceData.filter((item) => item.status === "completed").length;
  const pendingCount = complianceData.filter((item) => item.status === "pending").length;
  const overdueCount = complianceData.filter((item) => item.status === "overdue").length;

  const today = new Date();
  const upcomingDeadlines = complianceData
    .filter((item) => {
      try {
         const dueDate = parse(item.nextDue, "yyyy-MM-dd", new Date());
         const thirtyDaysFromNow = new Date();
         thirtyDaysFromNow.setDate(today.getDate() + 30);
         // Use ComplianceStatus for comparison
         return item.status !== "completed" && isAfter(dueDate, today) && !isAfter(dueDate, thirtyDaysFromNow);
       } catch(e) {
         console.error("Error parsing date in upcoming deadlines filter:", item.nextDue, e);
         return false;
       }
    })
    .sort((a, b) => {
       try {
         const dateA = parse(a.nextDue, "yyyy-MM-dd", new Date());
         const dateB = parse(b.nextDue, "yyyy-MM-dd", new Date());
         return dateA.getTime() - dateB.getTime();
       } catch(e) {
         return 0;
       }
    });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{translations.governanceCompliance}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={translations.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{translations.filterBy}:</span>
                <Tabs
                  value={filter}
                  // Use ComplianceStatus for filter state change
                  onValueChange={(value) => setFilter(value as ComplianceStatus | "all")}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="all" className="text-xs">
                      {translations.all}
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="text-xs">
                      {translations.completed}
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="text-xs">
                      {translations.pending}
                    </TabsTrigger>
                    <TabsTrigger value="overdue" className="text-xs">
                      {translations.overdue}
                    </TabsTrigger>
                    {/* Remove Awarded/Cancelled unless needed for compliance */}
                    {/* <TabsTrigger value="awarded" className="text-xs">{translations.awarded}</TabsTrigger> */}
                    {/* <TabsTrigger value="cancelled" className="text-xs">{translations.cancelled}</TabsTrigger> */}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.portalName}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.impact}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.status}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.nextDue}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                     let nextDueDate: Date | null = null;
                     let isOverdueItem = false; // Renamed to avoid conflict with state variable
                     try {
                         nextDueDate = parse(item.nextDue, "yyyy-MM-dd", new Date());
                         // Use ComplianceStatus for comparison
                         isOverdueItem = isAfter(today, nextDueDate) && item.status !== "completed";
                     } catch(e) {
                         console.error("Error parsing nextDue date:", item.nextDue, e);
                     }

                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{item.portalName}</div>
                          <div className="text-xs text-gray-500 mt-1">{item.purpose}</div>
                        </td>
                        <td className="py-3 px-4">{getImpactBadge(item.impact)}</td>
                        {/* Use ComplianceStatus */}
                        <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                        <td className="py-3 px-4">
                           {nextDueDate ? (
                              <div className={`text-sm ${isOverdueItem ? "text-red-600 font-medium" : ""}`}>
                                {format(nextDueDate, translations.dateFormat, {
                                  locale: language === "ar" ? ar : undefined,
                                })}
                              </div>
                           ) : <div className="text-sm text-gray-400">Invalid Date</div>}
                          {item.lastSubmission && (
                            <div className="text-xs text-gray-500 mt-1">
                              {translations.lastSubmission}:{" "}
                              {format(parse(item.lastSubmission, "yyyy-MM-dd", new Date()), translations.dateFormat, {
                                locale: language === "ar" ? ar : undefined,
                              })}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                              <Download className="h-3 w-3 mr-1" />
                              {translations.downloadTemplate}
                            </Button>
                            {item.receipt ? (
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {translations.viewReceipt}
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleUpload(item)}>
                                <Upload className="h-3 w-3 mr-1" />
                                {translations.uploadReceipt}
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => window.open(item.link, "_blank")}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {translations.visitPortal}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{translations.complianceStats}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{translations.totalItems}</span>
                  <span className="text-xl font-bold">{complianceData.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-emerald-50 p-2 rounded-md text-center">
                    <div className="text-emerald-600 text-lg font-bold">{completedCount}</div>
                    <div className="text-xs text-emerald-800">{translations.completed}</div>
                  </div>
                  <div className="bg-amber-50 p-2 rounded-md text-center">
                    <div className="text-amber-600 text-lg font-bold">{pendingCount}</div>
                    <div className="text-xs text-amber-800">{translations.pending}</div>
                  </div>
                  <div className="bg-red-50 p-2 rounded-md text-center">
                    <div className="text-red-600 text-lg font-bold">{overdueCount}</div>
                    <div className="text-xs text-red-800">{translations.overdue}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{translations.upcomingDeadlines}</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-3">
                  {upcomingDeadlines.map((item) => (
                    <div key={item.id} className="border rounded-md p-2 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">{item.portalName}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                             {format(parse(item.nextDue, "yyyy-MM-dd", new Date()), translations.dateFormat, {
                              locale: language === "ar" ? ar : undefined,
                             })}
                          </div>
                        </div>
                        {/* Use ComplianceStatus */}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  {language === "en"
                    ? "No upcoming deadlines in the next 30 days"
                    : "لا توجد مواعيد نهائية قادمة في الـ 30 يومًا القادمة"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {translations.uploadReceiptFor} {selectedItem?.portalName}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">{translations.selectFile}</Label>
              <Input id="file" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
              {!uploadFile && <p className="text-xs text-gray-500">{translations.noFileSelected}</p>}
              {uploadFile && <p className="text-xs text-emerald-600">{uploadFile.name}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              {translations.cancel}
            </Button>
            <Button onClick={handleSubmitUpload} disabled={!uploadFile}>
              {translations.upload}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}