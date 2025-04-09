import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileIcon as FilePresentation, File, Lock } from "lucide-react";
import { format, parse, isSameMonth } from "date-fns";
import { ar } from "date-fns/locale";

interface DocumentsListProps {
  documents: any[];
  language: "en" | "ar";
  selectedMeeting: any | null;
  selectedDate: Date | undefined;
}

export function DocumentsList({ documents, language, selectedMeeting, selectedDate }: DocumentsListProps) {
  const translations = {
    documents: language === "en" ? "Documents" : "المستندات",
    private: language === "en" ? "Private" : "خاص",
    dateFormat: language === "en" ? "MMM d, yyyy" : "d MMM yyyy",
    noDocuments: language === "en" ? "No documents available for this date" : "لا توجد مستندات متاحة لهذا التاريخ",
    meetingDocuments: language === "en" ? "Meeting Documents" : "مستندات الاجتماع",
    otherDocuments: language === "en" ? "Other Documents" : "مستندات أخرى",
  };

  // Filter documents based on selected meeting or date
  const getFilteredDocuments = () => {
    if (selectedMeeting) {
      // If a meeting is selected, show documents for that meeting
      return documents.filter((doc) => doc.meetingId === selectedMeeting.id);
    } else if (selectedDate) {
      // If only a date is selected (no meeting), show documents from that month
      return documents.filter((doc) => {
        try {
          const docDate = parse(doc.date, "yyyy-MM-dd", new Date());
          return isSameMonth(docDate, selectedDate);
        } catch (error) {
          console.error("Error parsing document date:", doc.date, error);
          return false;
        }
      });
    }
    // Default: show all documents
    return documents;
  };

  const filteredDocuments = getFilteredDocuments();
  const meetingDocs = filteredDocuments.filter((doc) => doc.meetingId !== null);
  const otherDocs = filteredDocuments.filter((doc) => doc.meetingId === null);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "PPTX":
        return <FilePresentation className="h-5 w-5 text-orange-500" />;
      case "DOCX":
        return <File className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{translations.documents}</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredDocuments.length === 0 ? (
          <div className="py-8 text-center text-gray-500">{translations.noDocuments}</div>
        ) : (
          <div className="space-y-6">
            {meetingDocs.length > 0 && (
              <div>
                {selectedMeeting && (
                  <h3 className="text-sm font-medium text-gray-500 mb-3">{translations.meetingDocuments}</h3>
                )}
                <div className="space-y-4">
                  {meetingDocs.map((doc) => {
                    let dateObj: Date | null = null;
                    try {
                      dateObj = parse(doc.date, "yyyy-MM-dd", new Date());
                    } catch (error) {
                      console.error("Error parsing document date:", doc.date, error);
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
                              {dateObj
                                ? format(dateObj, translations.dateFormat, {
                                    locale: language === "ar" ? ar : undefined,
                                  })
                                : "Invalid Date"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {otherDocs.length > 0 && (
              <div>
                {meetingDocs.length > 0 && (
                  <h3 className="text-sm font-medium text-gray-500 mb-3">{translations.otherDocuments}</h3>
                )}
                <div className="space-y-4">
                  {otherDocs.map((doc) => {
                    let dateObj: Date | null = null;
                    try {
                      dateObj = parse(doc.date, "yyyy-MM-dd", new Date());
                    } catch (error) {
                      console.error("Error parsing document date:", doc.date, error);
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
                              {dateObj
                                ? format(dateObj, translations.dateFormat, {
                                    locale: language === "ar" ? ar : undefined,
                                  })
                                : "Invalid Date"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}