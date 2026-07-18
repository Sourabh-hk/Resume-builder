const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription' },
  companyName: { type: String },
  role: { type: String },
  tone: { type: String },
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CoverLetter', coverLetterSchema);
