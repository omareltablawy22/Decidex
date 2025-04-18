export const boardMember = {
    name: "Abdullah Al-Qahtani",
    role: "Executive Director",
    email: "abdullah.qahtani@company.sa",
  }

  

  // Add more board members and expand existing ones with voting stats
  export const boardMembers = [
    {
      id: "bm1",
      name: "Abdullah Al-Qahtani",
      role: "Executive Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: true,
      votingStats: {
        totalVotes: 28,
        correctVotes: 22,
        successRate: 78.6,
        keyAreas: ["Digital Transformation", "Strategic Planning"],
      },
    },
    {
      id: "bm2",
      name: "Fatima Al-Saud",
      role: "Chairperson",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 30,
        correctVotes: 27,
        successRate: 90.0,
        keyAreas: ["Governance", "Strategic Planning"],
      },
    },
    {
      id: "bm3",
      name: "Mohammed Al-Ghamdi",
      role: "Non-Executive Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 25,
        correctVotes: 19,
        successRate: 76.0,
        keyAreas: ["Financial Oversight", "Risk Management"],
      },
    },
    {
      id: "bm4",
      name: "Layla Al-Rashid",
      role: "Independent Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 27,
        correctVotes: 23,
        successRate: 85.2,
        keyAreas: ["Regulatory Compliance", "Corporate Governance"],
      },
    },
    {
      id: "bm5",
      name: "Omar Al-Farsi",
      role: "CFO",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 29,
        correctVotes: 21,
        successRate: 72.4,
        keyAreas: ["Financial Strategy", "Investment"],
      },
    },
    // Adding more board members
    {
      id: "bm6",
      name: "Nora Al-Zahrani",
      role: "Independent Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 26,
        correctVotes: 24,
        successRate: 92.3,
        keyAreas: ["Sustainability", "Corporate Social Responsibility"],
      },
    },
    {
      id: "bm7",
      name: "Khalid Al-Otaibi",
      role: "Technology Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 24,
        correctVotes: 20,
        successRate: 83.3,
        keyAreas: ["Digital Innovation", "Cybersecurity"],
      },
    },
    {
      id: "bm8",
      name: "Aisha Al-Harbi",
      role: "HR Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 22,
        correctVotes: 17,
        successRate: 77.3,
        keyAreas: ["Talent Management", "Organizational Development"],
      },
    },
    {
      id: "bm9",
      name: "Saad Al-Malki",
      role: "Operations Director",
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: false,
      votingStats: {
        totalVotes: 28,
        correctVotes: 18,
        successRate: 64.3,
        keyAreas: ["Supply Chain", "Operational Efficiency"],
      },
    },
  ]

  export const meetings = [
    {
      id: 1,
      title: "Q1 Strategic Review",
      date: "2025-03-28",
      time: "10:00 - 12:00",
      location: "Main Boardroom",
      status: "confirmed",
      summary:
        "The Q1 Strategic Review meeting was held on March 28, 2025, with all board members present. The meeting focused on three key areas: financial performance, strategic initiatives, and governance updates.\\n\\nFinancial Performance: The CFO presented Q1 financial results, which exceeded projections by 12%. Revenue growth was primarily driven by the new digital product line (+18% YoY) and expansion in the GCC market (+15% YoY). Operating expenses remained within budget, with a slight decrease in marketing costs due to the shift toward digital channels.\\n\\nStrategic Initiatives: The Digital Transformation budget was unanimously approved with a 15% increase from the initial proposal. The board recognized the critical importance of accelerating our technology capabilities to maintain competitive advantage. The Asian market expansion proposal received mixed feedback, with concerns raised about regulatory challenges and market saturation. The board requested additional market research and a revised proposal for the next meeting.\\n\\nGovernance: The Risk Management Framework was approved and will be implemented starting next quarter. The board also reviewed the committee structure and agreed to establish a dedicated Technology Committee to oversee digital transformation initiatives.\\n\\nKey Decisions: Five voting items were presented, with three approved, one rejected, and one pending further review. The HR Policy updates were rejected due to compliance concerns and will be revised for the next meeting.\\n\\nNext Steps: The executive team will provide a revised Asian market expansion proposal and updated HR policies for the next board meeting. The Technology Committee will be formed within the next two weeks, with Mohammed Al-Ghamdi appointed as the interim chair.",
      agenda: {
        strategic: [
          {
            title: "Vision 2030 Alignment Update",
            goals: {
              revenueTarget: "SAR 500M by 2030",
              timeline: "Q2 2025 - Q4 2030",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Digital Transformation Roadmap",
            goals: {
              revenueTarget: "SAR 120M in new digital revenue streams",
              timeline: "Q2 2025 - Q4 2026",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "International Expansion Plans",
            goals: {
              revenueTarget: "SAR 200M from international markets",
              timeline: "Q3 2025 - Q2 2027",
              stakeholderAlignment: "3:1 (Mostly Aligned)",
            },
          },
        ],
        operational: [
          {
            title: "Q1 Financial Performance",
            goals: {
              revenueTarget: "SAR 85M for Q1 (achieved SAR 92M)",
              timeline: "Q1 2025 (Completed)",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "HR Policy Review",
            goals: {
              revenueTarget: "Cost savings of SAR 5M annually",
              timeline: "Q2 2025 - Q3 2025",
              stakeholderAlignment: "1:3 (Not Aligned)",
            },
          },
          {
            title: "IT Infrastructure Upgrade",
            goals: {
              revenueTarget: "Indirect impact - SAR 15M in operational efficiency",
              timeline: "Q2 2025 - Q4 2025",
              stakeholderAlignment: "4:1 (Well Aligned)",
            },
          },
          {
            title: "Supply Chain Optimization",
            goals: {
              revenueTarget: "Cost reduction of SAR 12M annually",
              timeline: "Q2 2025 - Q1 2026",
              stakeholderAlignment: "4:0 (Fully Aligned)",
            },
          },
        ],
        governance: [
          {
            title: "Regulatory Compliance Update",
            goals: {
              revenueTarget: "Risk mitigation - SAR 30M potential penalties avoided",
              timeline: "Ongoing",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Risk Management Framework",
            goals: {
              revenueTarget: "Indirect impact - SAR 25M risk exposure reduction",
              timeline: "Q2 2025 - Q3 2025",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Committee Structure Review",
            goals: {
              revenueTarget: "Indirect impact - improved governance",
              timeline: "Q2 2025",
              stakeholderAlignment: "4:1 (Well Aligned)",
            },
          },
        ],
      },
      decisions: [
        {
          id: "d1",
          title: "Approve Digital Transformation Budget",
          category: "strategic",
          outcome: "success",
          notes: "Unanimously approved with 15% increase from initial proposal",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
        {
          id: "d2",
          title: "Expansion into Asian Markets",
          category: "strategic",
          outcome: "needs-review",
          notes: "Further market research required before final decision",
          voting: {
            status: "open",
            inFavor: 2,
            against: 1,
            abstain: 1,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "against" },
              { memberId: "bm4", vote: "abstain" },
              { memberId: "bm5", vote: null },
            ],
          },
        },
        {
          id: "d3",
          title: "Quarterly Financial Report Approval",
          category: "operational",
          outcome: "success",
          notes: "Approved with minor adjustments to Q2 projections",
          voting: {
            status: "closed",
            inFavor: 4,
            against: 0,
            abstain: 1,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "abstain" },
            ],
          },
        },
        {
          id: "d4",
          title: "HR Policy Updates",
          category: "operational",
          outcome: "failure",
          notes: "Rejected due to compliance concerns, needs revision",
          voting: {
            status: "closed",
            inFavor: 1,
            against: 3,
            abstain: 1,
            votes: [
              { memberId: "bm1", vote: "against" },
              { memberId: "bm2", vote: "against" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "against" },
              { memberId: "bm5", vote: "abstain" },
            ],
          },
        },
        {
          id: "d5",
          title: "Risk Management Framework",
          category: "governance",
          outcome: "success",
          notes: "Approved with implementation to begin next quarter",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
      ],
    },
    {
      id: 2,
      title: "Emergency Board Meeting",
      date: "2025-04-05",
      time: "14:30 - 16:00",
      location: "Virtual (Zoom)",
      status: "tentative",
      agenda: {
        strategic: [
          {
            title: "Market Response Strategy",
            goals: {
              revenueTarget: "Protect SAR 150M in at-risk revenue",
              timeline: "Immediate - Q2 2025",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Crisis Management Plan",
            goals: {
              revenueTarget: "Mitigate potential revenue loss of SAR 75M",
              timeline: "Immediate - Q2 2025",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
        ],
        operational: [
          {
            title: "Impact Assessment",
            goals: {
              revenueTarget: "Identify affected revenue streams (SAR 200M potentially impacted)",
              timeline: "Immediate - 1 week",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Resource Allocation",
            goals: {
              revenueTarget: "Optimize SAR 25M emergency budget for maximum impact",
              timeline: "Immediate - 2 weeks",
              stakeholderAlignment: "4:1 (Well Aligned)",
            },
          },
          {
            title: "Communication Plan",
            goals: {
              revenueTarget: "Maintain customer confidence (SAR 120M in recurring revenue)",
              timeline: "Immediate - 3 days",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
        ],
        governance: [
          {
            title: "Shareholder Communication",
            goals: {
              revenueTarget: "Maintain market valuation and investor confidence",
              timeline: "Within 24 hours",
              stakeholderAlignment: "3:0 (Fully Aligned)",
            },
          },
          {
            title: "Regulatory Disclosure Requirements",
            goals: {
              revenueTarget: "Avoid penalties and maintain compliance",
              timeline: "Within 48 hours",
              stakeholderAlignment: "3:0 (Fully Aligned)",
            },
          },
        ],
      },
      decisions: [
        {
          id: "d6",
          title: "Crisis Response Plan Activation",
          category: "strategic",
          outcome: "success",
          notes: "Immediate implementation approved",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
        {
          id: "d7",
          title: "Emergency Fund Allocation",
          category: "operational",
          outcome: "success",
          notes: "SAR 5M allocated for immediate response",
          voting: {
            status: "closed",
            inFavor: 4,
            against: 1,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "against" },
            ],
          },
        },
        {
          id: "d8",
          title: "Public Statement Release",
          category: "governance",
          outcome: "needs-review",
          notes: "Draft approved with legal review pending",
          voting: {
            status: "open",
            inFavor: 2,
            against: 0,
            abstain: 1,
            votes: [
              { memberId: "bm1", vote: null },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "abstain" },
              { memberId: "bm5", vote: null },
            ],
          },
        },
        {
          id: "d9",
          title: "Temporary Leadership Restructuring",
          category: "governance",
          outcome: null,
          notes: "Proposal to temporarily reassign leadership responsibilities",
          voting: {
            status: "open",
            inFavor: 0,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: null },
              { memberId: "bm2", vote: null },
              { memberId: "bm3", vote: null },
              { memberId: "bm4", vote: null },
              { memberId: "bm5", vote: null },
            ],
          },
        },
      ],
    },
    {
      id: 3,
      title: "Urgent Cybersecurity Incident Response",
      date: "2025-03-13",
      time: "09:00 - 11:30",
      location: "Virtual (Zoom)",
      status: "confirmed",
      summary:
        "An emergency board meeting was convened on March 13, 2025, to address a critical cybersecurity incident detected in our core systems. All board members attended virtually, along with the CISO, CTO, and external cybersecurity consultants.\\n\\nIncident Overview: The CISO reported that a sophisticated threat actor gained unauthorized access to certain parts of our network approximately 36 hours ago. The attack vector appears to be a zero-day vulnerability in our third-party supply chain management software. The incident response team has contained the breach, and there is currently no evidence of data exfiltration, but forensic analysis is ongoing.\\n\\nImmediate Actions: The board unanimously approved the activation of our Cybersecurity Incident Response Plan. The CISO has already isolated affected systems, engaged our external security partners, and implemented enhanced monitoring across the network. The board approved an emergency allocation of SAR 3.5M for immediate incident response activities, including forensic investigation, remediation, and security enhancements.\\n\\nRegulatory Compliance: Our legal counsel advised on notification requirements under applicable data protection regulations. The board approved a preliminary notification to the relevant regulatory authorities, with a more detailed report to follow once the investigation provides additional findings.\\n\\nCommunication Strategy: The board reviewed and approved a communication plan for key stakeholders, including employees, customers, and partners. The plan emphasizes transparency while being careful not to disclose information that could compromise the ongoing investigation or remediation efforts.\\n\\nBusiness Continuity: The CTO presented the business impact assessment and continuity plan. Critical business operations have been maintained with minimal disruption. The board approved temporary operational changes to ensure business continuity while security measures are being implemented.\\n\\nNext Steps: The incident response team will provide daily updates to the executive committee. A follow-up board meeting is scheduled for March 20 to review the complete forensic analysis, finalize the remediation plan, and approve long-term security enhancements. The Risk Committee will conduct a comprehensive review of our cybersecurity posture and third-party risk management processes.",
      agenda: {
        strategic: [
          {
            title: "Incident Overview and Impact Assessment",
            goals: {
              revenueTarget: "Protect SAR 350M in annual recurring revenue",
              timeline: "Immediate assessment within 24 hours",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Long-term Security Strategy",
            goals: {
              revenueTarget: "Safeguard SAR 1.2B in total company revenue",
              timeline: "Initial plan within 1 week, full implementation over 6 months",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Reputation Management",
            goals: {
              revenueTarget: "Prevent customer churn worth SAR 75M",
              timeline: "Immediate and ongoing for 3 months",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
        ],
        operational: [
          {
            title: "Immediate Response Actions",
            goals: {
              revenueTarget: "Minimize operational disruption (SAR 2M per day at risk)",
              timeline: "Within 12 hours",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Business Continuity Plan",
            goals: {
              revenueTarget: "Maintain critical business functions (SAR 5M daily revenue)",
              timeline: "Immediate implementation, review after 48 hours",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Resource Allocation",
            goals: {
              revenueTarget: "Optimize emergency budget of SAR 3.5M for maximum impact",
              timeline: "Immediate allocation, review after 1 week",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
        ],
        governance: [
          {
            title: "Regulatory Compliance",
            goals: {
              revenueTarget: "Avoid penalties up to SAR 20M",
              timeline: "Initial notification within 48 hours, complete reporting within 30 days",
              stakeholderAlignment: "4:0 (Fully Aligned)",
            },
          },
          {
            title: "Stakeholder Communication",
            goals: {
              revenueTarget: "Maintain investor confidence (market cap protection)",
              timeline: "Initial communication within 24 hours, regular updates for 2 weeks",
              stakeholderAlignment: "5:0 (Fully Aligned)",
            },
          },
          {
            title: "Risk Management Review",
            goals: {
              revenueTarget: "Identify and mitigate risks to SAR 500M in future revenue",
              timeline: "Initial review within 1 week, comprehensive assessment within 1 month",
              stakeholderAlignment: "3:0 (Fully Aligned)",
            },
          },
        ],
      },
      decisions: [
        {
          id: "d10",
          title: "Cybersecurity Incident Response Plan Activation",
          category: "strategic",
          outcome: "success",
          notes: "Unanimously approved with immediate implementation",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
        {
          id: "d11",
          title: "Emergency Cybersecurity Budget Allocation",
          category: "operational",
          outcome: "success",
          notes: "SAR 3.5M approved for immediate incident response activities",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
        {
          id: "d12",
          title: "Regulatory Notification Approval",
          category: "governance",
          outcome: "success",
          notes: "Preliminary notification to regulatory authorities approved",
          voting: {
            status: "closed",
            inFavor: 4,
            against: 0,
            abstain: 1,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "abstain" },
            ],
          },
        },
        {
          id: "d13",
          title: "Stakeholder Communication Plan",
          category: "governance",
          outcome: "success",
          notes: "Approved with minor adjustments to customer messaging",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
        {
          id: "d14",
          title: "Engagement of External Cybersecurity Firm",
          category: "operational",
          outcome: "success",
          notes: "Approved engagement of CyberDefend Inc. for forensic investigation and remediation support",
          voting: {
            status: "closed",
            inFavor: 5,
            against: 0,
            abstain: 0,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "in-favor" },
              { memberId: "bm5", vote: "in-favor" },
            ],
          },
        },
        {
          id: "d15",
          title: "Third-Party Risk Management Review",
          category: "strategic",
          outcome: "needs-review",
          notes: "Proposal to conduct comprehensive review of all third-party vendors and security protocols",
          voting: {
            status: "open",
            inFavor: 3,
            against: 0,
            abstain: 1,
            votes: [
              { memberId: "bm1", vote: "in-favor" },
              { memberId: "bm2", vote: "in-favor" },
              { memberId: "bm3", vote: "in-favor" },
              { memberId: "bm4", vote: "abstain" },
              { memberId: "bm5", vote: null },
            ],
          },
        },
      ],
    },
  ]

  export const prayerTimes = {
    Fajr: "04:38",
    Dhuhr: "12:15",
    Asr: "15:42",
    Maghrib: "18:21",
    Isha: "19:51",
  }

  // Update the documents array to include meetingId
  export const documents = [
    {
      id: 101,
      title: "Q1 Financial Report",
      type: "PDF",
      date: "2025-03-15",
      sensitive: true,
      watermarked: true,
      meetingId: 1, // Associated with Q1 Strategic Review
    },
    {
      id: 102,
      title: "Strategic Plan 2025-2030",
      type: "PPTX",
      date: "2025-02-28",
      sensitive: true,
      watermarked: true,
      meetingId: 1, // Associated with Q1 Strategic Review
    },
    {
      id: 103,
      title: "Board Meeting Minutes - February",
      type: "PDF",
      date: "2025-02-25",
      sensitive: false,
      watermarked: false,
      meetingId: null, // Not associated with any specific meeting
    },
    {
      id: 104,
      title: "Crisis Management Protocol",
      type: "PDF",
      date: "2025-04-01",
      sensitive: true,
      watermarked: true,
      meetingId: 2, // Associated with Emergency Board Meeting
    },
    {
      id: 105,
      title: "Market Analysis Report",
      type: "PPTX",
      date: "2025-04-03",
      sensitive: false,
      watermarked: false,
      meetingId: 2, // Associated with Emergency Board Meeting
    },
    {
      id: 106,
      title: "Shareholder Communication Draft",
      type: "DOCX",
      date: "2025-04-04",
      sensitive: true,
      watermarked: true,
      meetingId: 2, // Associated with Emergency Board Meeting
    },
    {
      id: 107,
      title: "Digital Transformation Budget Proposal",
      type: "PDF",
      date: "2025-03-20",
      sensitive: true,
      watermarked: true,
      meetingId: 1, // Associated with Q1 Strategic Review and Digital Transformation decision
    },
    {
      id: 108,
      title: "Asian Markets Expansion Analysis",
      type: "PPTX",
      date: "2025-03-22",
      sensitive: true,
      watermarked: true,
      meetingId: 1, // Associated with Q1 Strategic Review and Asian Markets decision
    },
    {
      id: 109,
      title: "HR Policy Update Draft",
      type: "DOCX",
      date: "2025-03-18",
      sensitive: false,
      watermarked: false,
      meetingId: 1, // Associated with Q1 Strategic Review and HR Policy decision
    },
    {
      id: 110,
      title: "Risk Management Framework Document",
      type: "PDF",
      date: "2025-03-25",
      sensitive: true,
      watermarked: true,
      meetingId: 1, // Associated with Q1 Strategic Review and Risk Management decision
    },
    {
      id: 111,
      title: "Cybersecurity Incident Initial Assessment",
      type: "PDF",
      date: "2025-03-12",
      sensitive: true,
      watermarked: true,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 112,
      title: "Forensic Analysis Preliminary Report",
      type: "PDF",
      date: "2025-03-13",
      sensitive: true,
      watermarked: true,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 113,
      title: "Business Impact Assessment",
      type: "PPTX",
      date: "2025-03-13",
      sensitive: true,
      watermarked: true,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 114,
      title: "Cybersecurity Incident Response Plan",
      type: "PDF",
      date: "2025-01-15",
      sensitive: true,
      watermarked: true,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 115,
      title: "Regulatory Notification Template",
      type: "DOCX",
      date: "2025-03-13",
      sensitive: true,
      watermarked: true,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 116,
      title: "Stakeholder Communication Strategy",
      type: "PPTX",
      date: "2025-03-13",
      sensitive: true,
      watermarked: true,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 117,
      title: "CyberDefend Inc. Service Proposal",
      type: "PDF",
      date: "2025-03-12",
      sensitive: false,
      watermarked: false,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
    {
      id: 118,
      title: "Third-Party Vendor Security Assessment Framework",
      type: "PDF",
      date: "2025-03-13",
      sensitive: false,
      watermarked: false,
      meetingId: 3, // Associated with Cybersecurity Incident Response meeting
    },
  ]

  export type ComplianceStatus = "completed" | "pending" | "overdue";

  interface ComplianceItem {
    id: string;
    portalName: string;
    impact: string;
    requiredForPublic: boolean;
    requiredForPrivate: boolean;
    purpose: string;
    link: string;
    status: ComplianceStatus; // Use the defined type
    lastSubmission: string | null;
    nextDue: string;
    template: string;
    receipt: string | null;
  }

  export const complianceItems: ComplianceItem[] = [
    {
      id: "comp1",
      portalName: "Aamaly",
      impact: "Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Online platform for company registration, document submission, and accessing public company information",
      link: "https://aamaly.sa",
      status: "completed", // Now TS knows this must be 'completed', 'pending', or 'overdue'
      lastSubmission: "2025-02-15",
      nextDue: "2025-05-15",
      template: "aamaly-template.pdf",
      receipt: "aamaly-confirmation-2025-02.pdf",
    },
    {
      id: "comp2",
      portalName: "Ministry of Commerce (MoC) Portal",
      impact: "Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Name reservation, Articles of Association attestation, and other business setup services",
      link: "https://moc.gov.sa",
      status: "pending", // TS checks this against ComplianceStatus
      lastSubmission: "2024-12-10",
      nextDue: "2025-03-10",
      template: "moc-template.pdf",
      receipt: null,
    },
    {
      id: "comp3",
      portalName: "MISA Portal",
      impact: "Maybe Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Apply for investment licenses, amend licenses, issue GM Visa, and receive advisory services",
      link: "https://misa.gov.sa",
      status: "overdue", // TS checks this against ComplianceStatus
      lastSubmission: "2024-11-05",
      nextDue: "2025-02-05",
      template: "misa-template.pdf",
      receipt: null,
    },
    {
      id: "comp4",
      portalName: "GAZT",
      impact: "Maybe Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Tax management and compliance",
      link: "https://gazt.gov.sa",
      status: "completed",
      lastSubmission: "2025-01-20",
      nextDue: "2025-04-20",
      template: "gazt-template.pdf",
      receipt: "gazt-confirmation-2025-01.pdf",
    },
    {
      id: "comp5",
      portalName: "Chamber of Commerce (CoC)",
      impact: "Maybe Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Activate business accounts, manage business information, receive e-document certification",
      link: "https://saudichambres.org.sa",
      status: "pending",
      lastSubmission: "2024-12-15",
      nextDue: "2025-03-15",
      template: "coc-template.pdf",
      receipt: null,
    },
    {
      id: "comp6",
      portalName: "Absher",
      impact: "Maybe Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Employee and company management, authorization services",
      link: "https://absher.sa",
      status: "completed",
      lastSubmission: "2025-02-01",
      nextDue: "2025-05-01",
      template: "absher-template.pdf",
      receipt: "absher-confirmation-2025-02.pdf",
    },
    {
      id: "comp7",
      portalName: "Qiwa",
      impact: "Maybe Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Workforce management and labor compliance",
      link: "https://qiwa.sa",
      status: "pending",
      lastSubmission: "2025-01-10",
      nextDue: "2025-04-10",
      template: "qiwa-template.pdf",
      receipt: null,
    },
    {
      id: "comp8",
      portalName: "GOSI",
      impact: "Maybe Required",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Social insurance management",
      link: "https://gosi.gov.sa",
      status: "overdue",
      lastSubmission: "2024-10-25",
      nextDue: "2025-01-25",
      template: "gosi-template.pdf",
      receipt: null,
    },
    {
      id: "comp9",
      portalName: "Tadawul",
      impact: "No",
      requiredForPublic: true,
      requiredForPrivate: false,
      purpose: "Saudi Stock Exchange for trading stocks and securities",
      link: "https://tadawul.com.sa",
      status: "completed",
      lastSubmission: "2025-02-10",
      nextDue: "2025-05-10",
      template: "tadawul-template.pdf",
      receipt: "tadawul-confirmation-2025-02.pdf",
    },
    {
      id: "comp10",
      portalName: "Tadawulaty",
      impact: "No",
      requiredForPublic: true,
      requiredForPrivate: false,
      purpose: "Suite of services for investors, including voting rights, dividend inquiries, and notifications",
      link: "https://tadawulaty.com.sa",
      status: "pending",
      lastSubmission: "2024-12-20",
      nextDue: "2025-03-20",
      template: "tadawulaty-template.pdf",
      receipt: null,
    },
    {
      id: "comp11",
      portalName: "Mudad",
      impact: "No",
      requiredForPublic: true,
      requiredForPrivate: true,
      purpose: "Payment system for government services",
      link: "https://mudad.com.sa",
      status: "completed",
      lastSubmission: "2025-01-15",
      nextDue: "2025-04-15",
      template: "mudad-template.pdf",
      receipt: "mudad-confirmation-2025-01.pdf",
    },
  ]

  // Add these upcoming meetings to the existing meetings array in data.ts
  export const upcomingMeetings = [
    {
      id: 101,
      title: "Annual General Meeting",
      date: "2025-04-15",
      time: "09:00 - 12:00",
      location: "Main Boardroom",
      status: "confirmed",
      attendees: [
        { id: "bm1", confirmed: true },
        { id: "bm2", confirmed: true },
        { id: "bm3", confirmed: true },
        { id: "bm4", confirmed: false },
        { id: "bm5", confirmed: true },
      ],
      agenda: {
        strategic: [],
        operational: [],
        governance: [],
      },
      decisions: [],
    },
    {
      id: 102,
      title: "Q2 Budget Planning",
      date: "2025-04-22",
      time: "14:00 - 16:00",
      location: "Virtual (Zoom)",
      status: "confirmed",
      attendees: [
        { id: "bm1", confirmed: true },
        { id: "bm2", confirmed: true },
        { id: "bm3", confirmed: true },
        { id: "bm4", confirmed: true },
        { id: "bm5", confirmed: true },
      ],
      agenda: {
        strategic: [],
        operational: [],
        governance: [],
      },
      decisions: [],
    },
    {
      id: 103,
      title: "Strategic Partnership Review",
      date: "2025-05-03",
      time: "10:30 - 12:30",
      location: "Conference Room B",
      status: "tentative",
      attendees: [
        { id: "bm1", confirmed: false },
        { id: "bm2", confirmed: true },
        { id: "bm3", confirmed: false },
        { id: "bm4", confirmed: false },
        { id: "bm5", confirmed: true },
      ],
      agenda: {
        strategic: [],
        operational: [],
        governance: [],
      },
      decisions: [],
    },
    {
      id: 104,
      title: "HR Committee Meeting",
      date: "2025-04-28",
      time: "13:00 - 14:30",
      location: "Executive Suite",
      status: "canceled",
      attendees: [
        { id: "bm1", confirmed: false },
        { id: "bm2", confirmed: false },
        { id: "bm3", confirmed: false },
        { id: "bm4", confirmed: false },
        { id: "bm5", confirmed: false },
      ],
      agenda: {
        strategic: [],
        operational: [],
        governance: [],
      },
      decisions: [],
    },
    {
      id: 105,
      title: "Technology Innovation Workshop",
      date: "2025-05-10",
      time: "09:00 - 17:00",
      location: "Innovation Center",
      status: "confirmed",
      attendees: [
        { id: "bm1", confirmed: true },
        { id: "bm2", confirmed: false },
        { id: "bm3", confirmed: true },
        { id: "bm4", confirmed: true },
        { id: "bm5", confirmed: true },
      ],
      agenda: {
        strategic: [],
        operational: [],
        governance: [],
      },
      decisions: [],
    },
  ]
