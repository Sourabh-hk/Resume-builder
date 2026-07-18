import axios from 'axios';

async function callGemini(prompt) {
  const res = await axios.post('/api/ai/prompt', { prompt });
  return res.data.result;
}

async function callGeminiJSON(prompt) {
  const res = await axios.post('/api/ai/prompt-json', { prompt });
  return res.data;
}

export async function atsScore(resumeText, jd) {
  return callGeminiJSON(`
Analyze this resume against the job description.
Return ONLY valid JSON, no markdown:
{
  "ats_score": 78,
  "grade": "B+",
  "overall_summary": "A brief 2-3 sentence analysis of how well this candidate fits the role and their strongest selling point.",
  "matched_keywords": ["React", "Node.js"],
  "missing_keywords": ["Docker", "AWS"],
  "improvements": [
    { "section": "Summary", "suggestion": "Rewrite to include X" },
    { "section": "Experience", "suggestion": "Quantify Y with numbers" }
  ],
  "recommendations": ["Add Docker", "Highlight leadership"]
}
Resume: """${resumeText}"""
Job Description: """${jd}"""`);
}

export async function tailorResume(resumeJSON, jd) {
  return callGeminiJSON(`
You are a professional resume optimizer.
Tailor this resume to the job description below.
Return ONLY the updated resume JSON matching the EXACT same structure.
1. Rewrite summary with JD keywords
2. AGGRESSIVELY ADD any missing required skills from the Job Description directly into the "skills" arrays (technical, tools, or soft) so the ATS score increases.
3. Weave these newly added skills and keywords naturally into the experience bullets.
4. Ensure the resulting resume would score a 95+ ATS match for this Job Description.

CRITICAL: Return ONLY valid, perfectly formatted JSON. Do not forget any commas between properties (e.g. between "summary" and "experience").

Resume JSON: ${JSON.stringify(resumeJSON)}
Job Description: """${jd}"""`);
}

export async function getImprovements(resumeText, jd) {
  return callGeminiJSON(`
You are a senior career coach. Return ONLY valid JSON:
{
  "overall_feedback": "...",
  "strengths": ["...", "...", "..."],
  "improvements": [
    { "section": "Summary", "issue": "...", "suggestion": "..." },
    { "section": "Skills",  "issue": "...", "suggestion": "..." }
  ],
  "missing_elements": ["Quantified achievements", "Cloud skills"],
  "action_items": ["Add Docker", "Rewrite summary with leadership keywords"]
}
Resume: """${resumeText}"""
JD: """${jd}"""`);
}

export async function summarizeResume(resumeText) {
  return callGemini(`
Summarize this resume in 4–5 clear, professional sentences.
Highlight: strongest skills, most impactful projects, educational background, career trajectory.
Write in third person. Suitable for recruiter overview. No filler phrases.
Resume: """${resumeText}"""`);
}

export async function generateSummary(name, title, skills, companies) {
  return callGemini(`
Write a 3-sentence professional summary for a resume.
Name: ${name}
Role: ${title}
Skills: ${skills.join(', ')}
Companies/experience: ${companies.join(', ')}
Requirements: ATS-friendly, starts with strong adjective, ends with value proposition, 50–70 words max.`);
}

export async function fixGrammar(text) {
  return callGemini(`
You are an expert copywriter. Fix any spelling or grammar mistakes in the following text and elevate the professional tone slightly.
Do NOT completely rewrite it or change the core meaning. Just polish it.
Return ONLY the corrected text, with no markdown formatting.
Text to fix: """${text}"""`);
}

export async function fixGrammarBullets(bullets) {
  return callGeminiJSON(`
You are an expert copywriter. Fix any spelling or grammar mistakes in the following resume bullet points.
Do NOT completely rewrite them or change their meaning. Just correct typos and polish the grammar.
Return ONLY a JSON array of strings (same count as input): ["bullet1", "bullet2"]
Input bullets: ${JSON.stringify(bullets)}`);
}

export async function enhanceBullets(title, company, bullets) {
  return callGeminiJSON(`
Rewrite these resume bullet points for a ${title} role at ${company}.
Use strong action verbs, be specific, add impact where inferable.
Return ONLY a JSON array of strings (same count): ["bullet1", "bullet2"]
Input bullets: ${JSON.stringify(bullets)}`);
}

export async function extractSkills(experienceText, projectsText) {
  return callGeminiJSON(`
Read the provided work experience and projects.
Extract a comprehensive list of all technical skills, programming languages, tools, frameworks, and notable soft skills mentioned or implied.
Return ONLY valid JSON matching this structure:
{
  "technical": ["React", "Node.js", "Python"],
  "tools": ["Git", "Docker", "Figma"],
  "soft": ["Leadership", "Agile", "Communication"]
}
Experience: """${experienceText}"""
Projects: """${projectsText}"""`);
}

export async function parseResume(resumeText) {
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
}

export async function parseResumeFromImage(base64Image) {
  const prompt = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Parse this resume image into structured JSON. Return ONLY valid JSON:
{
  "personal": { "name":"","title":"","email":"","phone":"","linkedin":"","github":"","portfolio":"","location":"" },
  "summary": "",
  "experience": [{ "id":1,"title":"","company":"","location":"","startDate":"","endDate":"","bullets":[] }],
  "education": [{ "id":1,"degree":"","institution":"","year":"","grade":"" }],
  "skills": { "technical":[], "tools":[], "soft":[] },
  "projects": [{ "id":1,"name":"","tech":[],"bullets":[],"live":"","github":"" }],
  "certifications": [{ "id":1,"name":"","issuer":"","date":"","url":"" }]
}`
        },
        {
          type: "image_url",
          image_url: {
            url: base64Image
          }
        }
      ]
    }
  ];
  return callGeminiJSON(prompt);
}
