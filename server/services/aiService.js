const { GoogleGenerativeAI } = require('@google/generative-ai');

const initAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ GEMINI_API_KEY is not defined. AI endpoints will fail.');
  }
  return new GoogleGenerativeAI(apiKey || 'dummy_key');
};

const getModel = () => {
  const genAI = initAI();
  return genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
};

const callGemini = async (prompt) => {
  const model = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const callGeminiJSON = async (prompt) => {
  const raw = await callGemini(prompt);
  const clean = raw.replace(/```json\n?|```\n?/g, '').trim();
  return JSON.parse(clean);
};

exports.callGemini = callGemini;
exports.callGeminiJSON = callGeminiJSON;

// ==========================================
// User Request Prompts (Phase 1 & 2)
// ==========================================

exports.summarizeResume = async (resumeText) => {
  return callGemini(`
Summarize this resume in 4–5 clear, professional sentences.
Highlight: strongest skills, most impactful projects, educational background, career trajectory.
Write in third person. Suitable for recruiter overview. No filler phrases.
Resume: """${resumeText}"""`);
};

exports.enhanceBullets = async (title, company, bullets) => {
  return callGeminiJSON(`
Rewrite these resume bullet points for a ${title} role at ${company}.
Use strong action verbs, be specific, add impact where inferable.
Return ONLY a JSON array of strings (same count): ["bullet1", "bullet2"]
Input bullets: ${JSON.stringify(bullets)}`);
};

exports.analyzeJD = async (jdText) => {
  return callGeminiJSON(`
Analyze the following job description.
Return ONLY valid JSON:
{
  "jobTitle": "",
  "seniority": "",
  "requiredSkills": [],
  "preferredSkills": [],
  "responsibilities": [],
  "keywords": [],
  "tools": [],
  "softSkills": []
}
Job Description: """${jdText}"""`);
};

exports.tailorResume = async (resumeJSON, jdText) => {
  return callGeminiJSON(`
You are a professional resume optimizer.
Tailor this resume to the job description below.
Return ONLY the updated resume JSON matching the EXACT same structure.
1. Rewrite summary with JD keywords
2. AGGRESSIVELY EXTRACT all required and preferred skills from the Job Description. If they are missing from the resume, YOU MUST ADD THEM into the "skills" object (in "technical", "tools", or "soft" arrays). Do not leave out any critical skills from the JD.
3. Weave these newly added skills and keywords naturally into the experience bullets so it looks authentic.
CRITICAL: Return ONLY valid, perfectly formatted JSON.

Resume JSON: ${JSON.stringify(resumeJSON)}
Job Description: """${jdText}"""`);
};

exports.recruiterReview = async (resumeText, jdText = '') => {
  return callGeminiJSON(`
You are a senior recruiter reviewing this resume${jdText ? ' for the provided Job Description' : ''}.
Return ONLY valid JSON:
{
  "strengths": ["...", "...", "..."],
  "concerns": ["...", "...", "..."],
  "recruiterImpression": "...",
  "shortlistChance": "Low|Medium|High",
  "suggestedImprovements": ["...", "...", "..."]
}
Resume: """${resumeText}"""
${jdText ? `Job Description: """${jdText}"""` : ''}`);
};

exports.generateCoverLetter = async (resumeText, jdText, role, tone) => {
  return callGemini(`
Write a professional cover letter for the role of "${role}" based on the resume and job description.
Tone: ${tone}
Format: Standard cover letter format. No markdown blocks.

Resume: """${resumeText}"""
Job Description: """${jdText}"""`);
};

exports.generateInterviewQuestions = async (resumeText, jdText, role) => {
  return callGeminiJSON(`
Generate likely interview questions based on the resume and job description for a "${role}" role.
Return ONLY valid JSON:
{
  "resumeBased": [
    { "question": "...", "talkingPoints": "..." }
  ],
  "jdBased": [
    { "question": "...", "talkingPoints": "..." }
  ],
  "hrBased": [
    { "question": "...", "talkingPoints": "..." }
  ]
}
Resume: """${resumeText}"""
Job Description: """${jdText}"""`);
};

exports.parseResumeText = async (resumeText) => {
  return callGeminiJSON(`
Parse this resume text into structured JSON. Return ONLY valid JSON:
{
  "personal": { "name":"","title":"","email":"","phone":"","linkedin":"","github":"","portfolio":"","location":"" },
  "summary": "",
  "experience": [{ "id":1,"title":"","company":"","location":"","startDate":"","endDate":"","bullets":[] }],
  "education": [{ "id":1,"degree":"","institution":"","year":"","grade":"" }],
  "skills": { "technical":[], "tools":[], "soft":[] },
  "projects": [{ "id":1,"name":"","tech":[],"bullets":[],"live":"","github":"" }],
  "certifications": [{ "id":1,"name":"","issuer":"","date":"","url":"" }]
}
Resume text: """${resumeText}"""`);
};
