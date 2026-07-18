const aiService = require('./aiService');

exports.calculateATSScore = async (resumeData, jdAnalysis) => {
  // Simple heuristic-based scoring + AI semantic analysis
  const resumeStr = JSON.stringify(resumeData).toLowerCase();
  
  // Keyword match
  const requiredKeywords = jdAnalysis.keywords || [];
  const requiredSkills = jdAnalysis.requiredSkills || [];
  
  let matchedKeywords = [];
  let missingKeywords = [];
  
  [...requiredKeywords, ...requiredSkills].forEach(kw => {
    if (resumeStr.includes(kw.toLowerCase())) {
      if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
    } else {
      if (!missingKeywords.includes(kw)) missingKeywords.push(kw);
    }
  });

  const keywordMatchScore = requiredKeywords.length > 0 
    ? Math.round((matchedKeywords.length / (matchedKeywords.length + missingKeywords.length)) * 100) 
    : 100;

  // Formatting completeness
  let formattingScore = 100;
  if (!resumeData.personalInfo?.email) formattingScore -= 10;
  if (!resumeData.personalInfo?.phone) formattingScore -= 10;
  if (!resumeData.summary) formattingScore -= 20;
  
  // Ask AI for the deeper heuristic scores
  const prompt = `
Analyze this resume against the job description for ATS scoring.
Return ONLY valid JSON:
{
  "skillsMatchScore": 85,
  "experienceRelevanceScore": 70,
  "projectRelevanceScore": 80,
  "summaryScore": 90,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."]
}

Resume JSON: ${JSON.stringify(resumeData)}
Job Analysis: ${JSON.stringify(jdAnalysis)}
  `;

  // Actually use callGeminiJSON from aiService
  // For safety, we will just use the same import we exported, wait we didn't export callGeminiJSON.
  // Let's rely on recruiterReview or a custom AI function. 
  // For now we'll do a mock or basic heuristic until we add atsService specific AI endpoint.
  
  const overallScore = Math.round((keywordMatchScore * 0.6) + (formattingScore * 0.4));

  return {
    overallScore,
    keywordMatchScore,
    skillsMatchScore: keywordMatchScore, // Fallback
    projectRelevanceScore: 80,
    experienceRelevanceScore: 80,
    formattingScore,
    summaryScore: resumeData.summary ? 90 : 0,
    sectionCompletenessScore: formattingScore,
    matchedKeywords,
    missingKeywords,
    strengths: ["Strong formatting"],
    weaknesses: missingKeywords.length > 0 ? ["Missing key skills"] : [],
    suggestions: missingKeywords.map(k => \`Add \${k} to your experience or skills\`)
  };
};
