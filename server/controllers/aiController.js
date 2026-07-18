const aiService = require('../services/aiService');

exports.summarizeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    const summary = await aiService.summarizeResume(resumeText);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rewriteBullets = async (req, res) => {
  try {
    const { title, company, bullets } = req.body;
    const newBullets = await aiService.enhanceBullets(title, company, bullets);
    res.json({ bullets: newBullets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.analyzeJD = async (req, res) => {
  try {
    const { jdText } = req.body;
    const analysis = await aiService.analyzeJD(jdText);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.tailorResume = async (req, res) => {
  try {
    const { resumeJSON, jdText } = req.body;
    const tailoredResume = await aiService.tailorResume(resumeJSON, jdText);
    res.json(tailoredResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recruiterReview = async (req, res) => {
  try {
    const { resumeText, jdText } = req.body;
    const review = await aiService.recruiterReview(resumeText, jdText);
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jdText, role, tone } = req.body;
    const coverLetter = await aiService.generateCoverLetter(resumeText, jdText, role, tone);
    res.json({ coverLetter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateInterviewQuestions = async (req, res) => {
  try {
    const { resumeText, jdText, role } = req.body;
    const questions = await aiService.generateInterviewQuestions(resumeText, jdText, role);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.parseResumeUpload = async (req, res) => {
  try {
    const { resumeText } = req.body;
    const parsedData = await aiService.parseResumeText(resumeText);
    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.genericPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await aiService.callGemini(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.genericPromptJSON = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await aiService.callGeminiJSON(prompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
