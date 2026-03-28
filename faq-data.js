// faq-data.js — NUST FAQ Knowledge Base
// Source: https://nust.edu.pk/faqs/
// Update this file with the latest FAQ content from the website.

const FAQ_DATA = [
  // ─── NET Exam ───────────────────────────────────────────
  {
    id: "net-1",
    topic: "net",
    question: "What is the NUST Entry Test (NET)?",
    answer: "NUST Entry Test (NET) is a standardized test conducted by NUST for admission to its undergraduate programs. It tests candidates in Mathematics, Physics, English, and Intelligence/Reasoning. NET is held multiple times a year at centers across Pakistan.",
    keywords: ["net", "entry test", "nust test", "admission test", "test"],
    confidence: 1.0
  },
  {
    id: "net-2",
    topic: "net",
    question: "How many times is NET conducted per year?",
    answer: "NET is conducted three times a year: NET-1 (around February–March), NET-2 (around May–June), and NET-3 (around July–August). The best score among all attempts is considered for merit.",
    keywords: ["net times", "how many net", "net schedule", "net dates", "when net"],
    confidence: 1.0
  },
  {
    id: "net-3",
    topic: "net",
    question: "What is the NET syllabus?",
    answer: "The NET syllabus includes:\n• Mathematics (Intermediate level)\n• Physics (Intermediate level)\n• English (Grammar, Comprehension, Vocabulary)\n• Intelligence & Analytical Reasoning\n\nFor Computer Science programs, Computer Science may replace Physics.",
    keywords: ["net syllabus", "net subjects", "net topics", "what to study", "net content"],
    confidence: 1.0
  },
  {
    id: "net-4",
    topic: "net",
    question: "What is the NET cutoff or minimum score?",
    answer: "There is no fixed minimum NET score. Admission is based on an aggregate merit formula combining NET score, Matric marks, FSc/A-Level marks, and sometimes additional factors. However, top programs like EE, CS, and ME at NUST H-12 typically require very high aggregates (often above 80%).",
    keywords: ["net cutoff", "net minimum", "net passing marks", "net aggregate", "merit"],
    confidence: 0.9
  },

  // ─── Admissions ─────────────────────────────────────────
  {
    id: "adm-1",
    topic: "admissions",
    question: "How do I apply to NUST?",
    answer: "To apply to NUST:\n1. Appear in the NUST Entry Test (NET)\n2. Register online at admission.nust.edu.pk during the open admission window\n3. Fill in the online application form and select your preferred programs\n4. Upload required documents (Matric, FSc certificates, CNIC, photographs)\n5. Pay the application fee\n6. Shortlisted candidates are called for final admission based on aggregate merit",
    keywords: ["how apply", "application process", "how to apply", "admission process", "apply nust"],
    confidence: 1.0
  },
  {
    id: "adm-2",
    topic: "admissions",
    question: "What are the admission requirements for NUST?",
    answer: "General requirements:\n• Pakistani citizen or overseas Pakistani\n• Minimum 60% marks in Matric/O-Levels\n• Minimum 60% marks in FSc Pre-Engineering / Pre-Medical or equivalent\n• Valid NUST Entry Test (NET) score\n• Age limit: Generally born after a specified date (check NUST prospectus)\n\nFor international students or A-Level candidates, equivalent conversion is applied.",
    keywords: ["requirements", "eligibility", "criteria", "qualification", "admission requirements", "who can apply"],
    confidence: 1.0
  },
  {
    id: "adm-3",
    topic: "admissions",
    question: "What is the aggregate formula for NUST admission?",
    answer: "The standard NUST aggregate formula is:\n• Matric: 10%\n• FSc / Intermediate: 15%\n• NET Score: 75%\n\nTotal = 100%\n\nNote: This formula may vary slightly for certain programs. Always confirm on the official NUST admissions portal.",
    keywords: ["aggregate", "merit formula", "calculation", "weightage", "marks calculation"],
    confidence: 1.0
  },
  {
    id: "adm-4",
    topic: "admissions",
    question: "When does NUST admission open?",
    answer: "NUST admissions typically open from June to August each year, aligned with the NET-3 results. Applications are usually accepted online after the final NET results. Exact dates are announced on the NUST official website and admission portal.",
    keywords: ["admission dates", "when admissions", "admission open", "admission schedule", "when to apply"],
    confidence: 0.9
  },
  {
    id: "adm-5",
    topic: "admissions",
    question: "Can I apply with A-Levels instead of FSc?",
    answer: "Yes, A-Level students can apply to NUST. A-Level grades are converted to equivalent percentage marks using IBCC equivalence certificates. You must have A-Levels in Mathematics and Physics (for engineering programs) or relevant subjects.",
    keywords: ["a levels", "a-levels", "o levels", "foreign qualification", "ibcc"],
    confidence: 1.0
  },

  // ─── Programs ────────────────────────────────────────────
  {
    id: "prog-1",
    topic: "programs",
    question: "What programs does NUST offer?",
    answer: "NUST offers a wide range of undergraduate programs including:\n\n🔧 Engineering: Electrical, Mechanical, Civil, Chemical, Computer, Aerospace, Industrial & Manufacturing, Mechatronics, Software, Geological\n\n💻 Computing: BS Computer Science, BS AI, BS Cybersecurity, BS Data Science\n\n🏗️ Architecture & Urban Planning\n\n🔬 Sciences: BS Physics, BS Chemistry, BS Mathematics, BS Biosciences\n\n💊 Medical: MBBS, BDS (at CMH affiliated colleges)\n\n📊 Business: BS Business Studies, BBA, BS Accounting & Finance\n\nPrograms are offered across multiple schools and colleges within the NUST network.",
    keywords: ["programs", "courses", "degrees", "what study", "departments", "faculties", "offered"],
    confidence: 1.0
  },
  {
    id: "prog-2",
    topic: "programs",
    question: "Which NUST school offers Computer Science?",
    answer: "Computer Science and related programs (CS, AI, Cybersecurity, Data Science, Software Engineering) are primarily offered at:\n• SEECS – School of Electrical Engineering and Computer Science (H-12 Campus, Islamabad)\n• MCS – Military College of Signals, Rawalpindi\n• SMME also offers some computing-related programs",
    keywords: ["cs", "computer science", "seecs", "software", "ai program", "where cs"],
    confidence: 1.0
  },
  {
    id: "prog-3",
    topic: "programs",
    question: "What is the duration of undergraduate programs at NUST?",
    answer: "Most undergraduate (BS/BE) programs at NUST are 4 years (8 semesters) in duration. MBBS is 5 years and BDS is 4 years. Architecture (B.Arch) is also 5 years.",
    keywords: ["duration", "how long", "years", "semesters", "program length"],
    confidence: 1.0
  },

  // ─── Fees ────────────────────────────────────────────────
  {
    id: "fee-1",
    topic: "fees",
    question: "What is the tuition fee at NUST?",
    answer: "NUST fees vary by program and school. Approximate annual tuition for self-finance students:\n• Engineering programs: PKR 200,000–350,000/year\n• CS/IT programs: PKR 200,000–300,000/year\n• Management programs: PKR 200,000–280,000/year\n\nNote: These are approximate figures and change annually. Hostels, lab fees, and other charges are additional. Always check the current fee structure on nust.edu.pk.",
    keywords: ["fee", "fees", "tuition", "cost", "how much", "money", "payment", "expensive"],
    confidence: 0.85
  },
  {
    id: "fee-2",
    topic: "fees",
    question: "Does NUST offer need-based financial assistance?",
    answer: "Yes, NUST offers need-based financial assistance through:\n• NUST Student Financial Aid program\n• Partial/full fee waivers for deserving students\n• HEC need-based scholarships\n• Students must apply separately and submit financial documents for assessment",
    keywords: ["financial aid", "financial assistance", "help fees", "poor students", "need based"],
    confidence: 1.0
  },

  // ─── Scholarships ─────────────────────────────────────────
  {
    id: "sch-1",
    topic: "scholarships",
    question: "What scholarships are available at NUST?",
    answer: "NUST offers several scholarship options:\n\n🏅 Merit Scholarships: For top-ranked students (1st, 2nd, 3rd position in aggregate)\n🤲 Need-based Aid: For financially deserving students\n🏆 HEC Scholarships: Government-funded scholarships through Higher Education Commission\n🌍 NUST International Scholarships: For international students\n👮 Armed Forces Quotas: Special seats and fee concessions for armed forces dependents\n🏢 Corporate Scholarships: From organizations like OGDCL, PPL, and others\n\nApplications open at the start of each academic year.",
    keywords: ["scholarship", "scholarships", "financial help", "free education", "grant", "stipend"],
    confidence: 1.0
  },
  {
    id: "sch-2",
    topic: "scholarships",
    question: "How do I apply for a NUST scholarship?",
    answer: "To apply for NUST scholarships:\n1. Secure admission first\n2. Visit the NUST Student Affairs Office or portal\n3. Fill the scholarship application form\n4. Attach required documents (income certificate, utility bills, family details)\n5. Submit before the deadline (announced each semester)\n\nFor HEC scholarships, apply through hec.gov.pk separately.",
    keywords: ["apply scholarship", "how scholarship", "scholarship process", "scholarship application"],
    confidence: 1.0
  },

  // ─── Campus Life ──────────────────────────────────────────
  {
    id: "cam-1",
    topic: "campus",
    question: "Where is NUST main campus located?",
    answer: "The main NUST campus (H-12) is located in Islamabad, Pakistan. It is a state-of-the-art campus with modern facilities. NUST also has sub-campuses and affiliated colleges in Rawalpindi, Karachi, and other cities.",
    keywords: ["location", "where nust", "campus location", "islamabad", "address", "h-12"],
    confidence: 1.0
  },
  {
    id: "cam-2",
    topic: "campus",
    question: "Does NUST provide hostel accommodation?",
    answer: "Yes, NUST provides hostel accommodation for both male and female students on campus. Hostels have rooms, common areas, cafeterias, and internet access. Hostel allocation is based on distance from home (preference to out-of-city students) and availability. Separate hostels exist for boys and girls.",
    keywords: ["hostel", "accommodation", "dorm", "residence", "stay", "living", "boarding"],
    confidence: 1.0
  },
  {
    id: "cam-3",
    topic: "campus",
    question: "What facilities are available at NUST?",
    answer: "NUST H-12 campus facilities include:\n• Central Library with digital resources\n• State-of-the-art laboratories\n• Sports complex (cricket, football, basketball, swimming)\n• Student Activity Center\n• Multiple cafeterias and food courts\n• Health Center / Medical facility\n• High-speed internet across campus\n• Innovation Center and startup incubator\n• Masjid on campus",
    keywords: ["facilities", "amenities", "sports", "library", "lab", "campus life", "activities"],
    confidence: 1.0
  },
  {
    id: "cam-4",
    topic: "campus",
    question: "What student societies and clubs are at NUST?",
    answer: "NUST has a vibrant student life with 50+ societies including:\n• Technical: Robotics Club, NUST Computing Society, IEEE Student Branch\n• Cultural: Music, Drama, Debating Society\n• Sports: Cricket, Football, Badminton teams\n• Social: Community service, Environment Club\n• Entrepreneurship: NUST E-Club, Entrepreneurship Society\n\nStudents are encouraged to join and lead societies.",
    keywords: ["clubs", "societies", "extracurricular", "activities", "events", "student life"],
    confidence: 1.0
  },

  // ─── General ─────────────────────────────────────────────
  {
    id: "gen-1",
    topic: "admissions",
    question: "Is NUST a public or private university?",
    answer: "NUST (National University of Sciences and Technology) is a public sector university in Pakistan. It is one of the top-ranked engineering and technology universities in the country and consistently ranks in QS World University Rankings.",
    keywords: ["public private", "government university", "type university", "about nust"],
    confidence: 1.0
  },
  {
    id: "gen-2",
    topic: "admissions",
    question: "What is NUST's ranking?",
    answer: "NUST consistently ranks among the top universities in Pakistan and Asia. As of recent rankings:\n• QS World University Rankings: 400s–500s globally\n• Ranked #1 in Pakistan in multiple subject areas\n• Listed in Times Higher Education (THE) rankings\n\nNUST is considered one of the most prestigious technical universities in Pakistan.",
    keywords: ["ranking", "rank", "world ranking", "qs ranking", "the ranking", "reputation"],
    confidence: 0.85
  },
  {
    id: "gen-3",
    topic: "admissions",
    question: "Does NUST offer postgraduate programs?",
    answer: "Yes, NUST offers MS, MPhil, MBA, and PhD programs across all its schools. Admission to postgraduate programs is through separate tests (GRE, GMAT, or NUST-specific tests) and academic qualifications. Some programs also offer Research Assistantships.",
    keywords: ["ms", "mphil", "phd", "postgraduate", "masters", "graduate", "research"],
    confidence: 1.0
  }
];

// Expose globally
window.FAQ_DATA = FAQ_DATA;
