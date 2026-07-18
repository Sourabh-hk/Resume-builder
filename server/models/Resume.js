const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'My Resume' },
  templateId: { type: String, default: 'Professional' },
  versionLabel: { type: String, default: 'Original' },
  baseResumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  roleMode: { type: String },
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,
    website: String,
    headline: String
  },
  summary: String,
  skills: {
    technical: [String],
    tools: [String],
    soft: [String]
  },
  education: [{
    id: String,
    institution: String,
    degree: String,
    year: String,
    grade: String,
    location: String
  }],
  experience: [{
    id: String,
    company: String,
    title: String,
    location: String,
    startDate: String,
    endDate: String,
    bullets: [String]
  }],
  projects: [{
    id: String,
    name: String,
    tech: [String],
    bullets: [String],
    live: String,
    github: String
  }],
  certifications: [{
    id: String,
    name: String,
    issuer: String,
    date: String,
    url: String
  }],
  settings: {
    font: { type: String, default: 'Inter' }
  },
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription' },
  jobDescriptionText: String,
  parsedText: String,
  aiSuggestions: Object,
  recruiterReview: Object,
  atsAnalysis: {
    overallScore: Number,
    keywordMatchScore: Number,
    skillsMatchScore: Number,
    projectRelevanceScore: Number,
    experienceRelevanceScore: Number,
    formattingScore: Number,
    summaryScore: Number,
    sectionCompletenessScore: Number,
    matchedKeywords: [String],
    missingKeywords: [String],
    strengths: [String],
    weaknesses: [String],
    suggestions: [String]
  },
  healthReport: Object,
  sectionScores: Object,
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
