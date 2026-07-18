const JobDescription = require('../models/JobDescription');
const aiService = require('../services/aiService');

exports.getJDs = async (req, res) => {
  try {
    const jds = await JobDescription.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJDById = async (req, res) => {
  try {
    const jd = await JobDescription.findById(req.params.id);
    if (!jd) return res.status(404).json({ message: 'JD not found' });
    if (jd.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    res.json(jd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJD = async (req, res) => {
  try {
    const { title, companyName, role, jobDescriptionText } = req.body;
    
    // Auto-analyze with AI
    const analysis = await aiService.analyzeJD(jobDescriptionText);
    
    const jd = await JobDescription.create({
      userId: req.user.id,
      title: title || analysis.jobTitle || 'New JD',
      companyName,
      role: role || analysis.jobTitle,
      jobDescriptionText,
      analysis
    });
    res.status(201).json(jd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJD = async (req, res) => {
  try {
    const jd = await JobDescription.findById(req.params.id);
    if (!jd) return res.status(404).json({ message: 'JD not found' });
    if (jd.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await jd.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
