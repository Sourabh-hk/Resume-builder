const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription' },
  coverLetterId: { type: mongoose.Schema.Types.ObjectId, ref: 'CoverLetter' },
  status: { 
    type: String, 
    enum: ['saved', 'applied', 'shortlisted', 'interviewing', 'rejected', 'offer'],
    default: 'saved'
  },
  appliedDate: { type: Date },
  interviewDate: { type: Date },
  followUpDate: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
