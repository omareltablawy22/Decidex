"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  BarChart3,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  ThumbsUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface VoterRankingsProps {
  language: "en" | "ar"
  boardMembers: any[]
}

export function VoterRankings({ language, boardMembers }: VoterRankingsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")

  const translations = {
    voterRankings: language === "en" ? "Voter Rankings" : "تصنيفات المصوتين",
    topPerformers: language === "en" ? "Top Performers" : "أفضل المؤدين",
    mostActive: language === "en" ? "Most Active" : "الأكثر نشاطًا",
    keyAreas: language === "en" ? "Key Areas" : "المجالات الرئيسية",
    all: language === "en" ? "All" : "الكل",
    strategic: language === "en" ? "Strategic" : "استراتيجي",
    operational: language === "en" ? "Operational" : "تشغيلي",
    governance: language === "en" ? "Governance" : "حوكمة",
    rank: language === "en" ? "Rank" : "المرتبة",
    member: language === "en" ? "Member" : "العضو",
    successRate: language === "en" ? "Success Rate" : "معدل النجاح",
    totalVotes: language === "en" ? "Total Votes" : "إجمالي الأصوات",
    correctVotes: language === "en" ? "Correct Votes" : "الأصوات الصحيحة",
    search: language === "en" ? "Search..." : "بحث...",
    filterBy: language === "en" ? "Filter by" : "تصفية حسب",
    votingInsights: language === "en" ? "Voting Insights" : "رؤى التصويت",
    votingTrends: language === "en" ? "Voting Trends" : "اتجاهات التصويت",
    recentVotes: language === "en" ? "Recent Votes" : "الأصوات الأخيرة",
    viewAll: language === "en" ? "View All" : "عرض الكل",
    you: language === "en" ? "You" : "أنت",
  }

  // Sort board members by success rate
  const sortedBySuccessRate = [...boardMembers].sort((a, b) => (b.votingStats?.successRate ?? 0) - (a.votingStats?.successRate ?? 0)) // Added optional chaining

  // Sort board members by total votes (most active)
  const sortedByActivity = [...boardMembers].sort((a, b) => (b.votingStats?.totalVotes ?? 0) - (a.votingStats?.totalVotes ?? 0)) // Added optional chaining

  // Filter board members based on search term
  const filteredMembers = sortedBySuccessRate.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Generate mock recent votes data
  const generateRecentVotes = () => {
    const decisions = [
      "Digital Transformation Budget",
      "Expansion into Asian Markets",
      "Quarterly Financial Report",
      "HR Policy Updates",
      "Risk Management Framework",
      "Crisis Response Plan",
      "Emergency Fund Allocation",
      "Public Statement Release",
      "Cybersecurity Response Plan",
      "Third-Party Risk Assessment",
    ]

    return boardMembers.slice(0, 5).map((member, index) => {
      const isCorrect = Math.random() > 0.3 // 70% chance of being correct
      return {
        id: `vote-${index}`,
        memberId: member.id,
        decision: decisions[index % decisions.length],
        vote: Math.random() > 0.5 ? "in-favor" : "against",
        isCorrect,
        timestamp: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(), // Last few days
      }
    })
  }

  const recentVotes = generateRecentVotes()

  // Calculate top areas of expertise across all board members
  const calculateTopAreas = () => {
    const areaCount: Record<string, number> = {}

    boardMembers.forEach((member) => {
      if (member.votingStats?.keyAreas) { // Added optional chaining
        member.votingStats.keyAreas.forEach((area: string) => {
          areaCount[area] = (areaCount[area] || 0) + 1
        })
      }
    })

    return Object.entries(areaCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([area, count]) => ({ area, count }))
  }

  const topAreas = calculateTopAreas()

  return (
    <div className="space-y-6">
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
          <Tabs value={filterBy} onValueChange={setFilterBy} className="w-auto">
            <TabsList>
              <TabsTrigger value="all" className="text-xs">
                {translations.all}
              </TabsTrigger>
              <TabsTrigger value="strategic" className="text-xs">
                {translations.strategic}
              </TabsTrigger>
              <TabsTrigger value="operational" className="text-xs">
                {translations.operational}
              </TabsTrigger>
              <TabsTrigger value="governance" className="text-xs">
                {translations.governance}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                {translations.topPerformers}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.rank}</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.member}</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.successRate}</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.correctVotes}</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">{translations.keyAreas}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member, index) => (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {index === 0 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800">
                              <Trophy className="h-4 w-4" />
                            </div>
                          ) : index === 1 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800">
                              <span className="font-bold">2</span>
                            </div>
                          ) : index === 2 ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-700">
                              <span className="font-bold">3</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-600">
                              <span>{index + 1}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {member.name}
                                {member.isCurrentUser && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {translations.you}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">{member.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <div className="font-medium text-emerald-600">{member.votingStats?.successRate ?? 'N/A'}%</div>
                            <Progress
                              value={member.votingStats?.successRate ?? 0} // Handle potential null
                              className="h-1.5 w-24 mt-1"
                              indicatorClassName="bg-emerald-500"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium">
                            {member.votingStats?.correctVotes ?? 'N/A'}/{member.votingStats?.totalVotes ?? 'N/A'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {member.votingStats?.keyAreas?.map((area: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            )) ?? <span className="text-xs text-gray-400">N/A</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
                {translations.mostActive}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedByActivity.slice(0, 6).map((member, index) => (
                  <div key={member.id} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {member.name}
                            {member.isCurrentUser && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {translations.you}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{member.role}</div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          {member.votingStats?.totalVotes ?? 'N/A'} {language === "en" ? "votes" : "صوت"}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{translations.successRate}</span>
                          <span>{member.votingStats?.successRate ?? 'N/A'}%</span>
                        </div>
                        <Progress
                          value={member.votingStats?.successRate ?? 0} // Handle potential null
                          className="h-1.5"
                          indicatorClassName="bg-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{translations.votingInsights}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">{translations.keyAreas}</h3>
                  <div className="space-y-2">
                    {topAreas.map((area, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="text-sm">{area.area}</div>
                        <div className="flex items-center">
                          <Progress
                            value={(area.count / boardMembers.length) * 100}
                            className="h-2 w-24 mr-2"
                            indicatorClassName={
                              index === 0
                                ? "bg-emerald-500"
                                : index === 1
                                  ? "bg-blue-500"
                                  : index === 2
                                    ? "bg-amber-500"
                                    : "bg-gray-500"
                            }
                          />
                          <span className="text-xs text-gray-500">{area.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">{translations.votingTrends}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-emerald-50 rounded-md">
                      <div className="flex items-center text-emerald-700 mb-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">{language === "en" ? "Improving" : "تحسن"}</span>
                      </div>
                      <div className="text-lg font-bold text-emerald-800">
                        {Math.round(
                          (boardMembers.filter((m) => (m.votingStats?.successRate ?? 0) > 80).length / boardMembers.length) *
                            100,
                        )}
                        %
                      </div>
                      <div className="text-xs text-emerald-600">{language === "en" ? "of members" : "من الأعضاء"}</div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-md">
                      <div className="flex items-center text-amber-700 mb-1">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">
                          {language === "en" ? "Needs Attention" : "يحتاج اهتمام"}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-amber-800">
                        {Math.round(
                          (boardMembers.filter((m) => (m.votingStats?.successRate ?? 100) < 70).length / boardMembers.length) * // Check < 70
                            100,
                        )}
                        %
                      </div>
                      <div className="text-xs text-amber-600">{language === "en" ? "of members" : "من الأعضاء"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{translations.recentVotes}</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  {translations.viewAll}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentVotes.map((vote) => {
                  const member = boardMembers.find((m) => m.id === vote.memberId)
                  if (!member) return null

                  return (
                    <div key={vote.id} className="flex items-start p-2 border rounded-md hover:bg-gray-50">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium text-sm">
                            {member.name}
                            {member.isCurrentUser && (
                              <Badge variant="outline" className="ml-1 text-[10px]">
                                {translations.you}
                              </Badge>
                            )}
                          </div>
                          {vote.isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{vote.decision}</div>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              vote.vote === "in-favor"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {vote.vote === "in-favor" ? (
                              <ThumbsUp className="h-2.5 w-2.5 mr-1" />
                            ) : (
                              <XCircle className="h-2.5 w-2.5 mr-1" />
                            )}
                            {vote.vote === "in-favor"
                              ? language === "en"
                                ? "In Favor"
                                : "موافق"
                              : language === "en"
                                ? "Against"
                                : "معارض"}
                          </Badge>
                          <span className="text-[10px] text-gray-400 ml-2">
                            {new Date(vote.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}