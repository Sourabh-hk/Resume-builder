const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  companyName: { type: String },
  role: { type: String },
  jobDescriptionText: { type: String, required: true },
  analysis: {
    jobTitle: String,
    seniority: String,
    requiredSkills: [String],
    preferredSkills: [String],
    responsibilities: [String],
    keywords: [String],
    tools: [String],
    softSkills: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('JobDescription', jobDescriptionSchema);
