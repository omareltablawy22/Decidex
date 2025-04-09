"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { boardMember } from "@/lib/data";

export function Header() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLang;
    }
    // In a full implementation, this would trigger a context update
    // to propagate language change to all components
    console.log(`Language changed to ${newLang}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="absolute inset-0 opacity-5 pattern-islamic" />
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
              DX
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">DecideX</h1>
              <p className="text-sm text-gray-500">
                {language === "en" ? "Transparency that creates Trust" : "الشفافية التي تخلق الثقة"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">{boardMember.name}</p>
              <p className="text-sm text-gray-500">{boardMember.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}