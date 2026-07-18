const express = require('express');
const router = express.Router();
const {
  summarizeResume,
  rewriteBullets,
  analyzeJD,
  tailorResume,
  recruiterReview,
  generateCoverLetter,
  generateInterviewQuestions,
  parseResumeUpload,
  genericPrompt,
  genericPromptJSON
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/summarize-resume', protect, summarizeResume);
router.post('/rewrite-bullets', protect, rewriteBullets);
router.post('/analyze-jd', protect, analyzeJD);
router.post('/tailor-resume', protect, tailorResume);
router.post('/recruiter-review', protect, recruiterReview);
router.post('/generate-cover-letter', protect, generateCoverLetter);
router.post('/generate-interview-questions', protect, generateInterviewQuestions);
router.post('/parse-upload', protect, parseResumeUpload);

// Generic prompt endpoints for frontend proxy
router.post('/prompt', protect, genericPrompt);
router.post('/prompt-json', protect, genericPromptJSON);

module.exports = router;
