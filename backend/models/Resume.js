import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      default: 'My Resume',
      trim: true
    },
    personalInfo: {
      name: { type: String, default: '' },
      title: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      photo: { type: String, default: '' }
    },
    summary: { type: String, default: '' },
    education: [
      {
        degree: { type: String, default: '' },
        institution: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        description: { type: String, default: '' }
      }
    ],
    skills: [{ type: String }],
    experience: [
      {
        company: { type: String, default: '' },
        role: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        currentlyWorking: { type: Boolean, default: false },
        description: { type: String, default: '' }
      }
    ],
    projects: [
      {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: [{ type: String }],
        url: { type: String, default: '' },
        github: { type: String, default: '' }
      }
    ],
    achievements: [{ type: String }],
    certifications: [
      {
        name: { type: String, default: '' },
        organization: { type: String, default: '' },
        date: { type: String, default: '' },
        url: { type: String, default: '' }
      }
    ],
    template: {
      type: String,
      default: 'modern'
    },
    accentColor: {
      type: String,
      default: '#2563EB'
    },
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
