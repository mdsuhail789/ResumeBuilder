import Resume from '../models/Resume.js';

// @desc    Get all user resumes
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching resumes' });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if resume belongs to authenticated user
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this resume' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching resume' });
  }
};

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
  try {
    const initialData = req.body || {};
    
    const newResume = new Resume({
      userId: req.user._id,
      title: initialData.title || 'My Resume',
      personalInfo: initialData.personalInfo || {
        name: req.user.name || '',
        email: req.user.email || ''
      },
      summary: initialData.summary || '',
      education: initialData.education || [],
      skills: initialData.skills || [],
      experience: initialData.experience || [],
      projects: initialData.projects || [],
      achievements: initialData.achievements || [],
      certifications: initialData.certifications || [],
      template: initialData.template || 'modern',
      accentColor: initialData.accentColor || '#2563EB',
      isPublic: initialData.isPublic || false
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    console.error('Create Resume Error:', error);
    res.status(500).json({ message: error.message || 'Error creating resume' });
  }
};

// @desc    Update an existing resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Ensure ownership
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this resume' });
    }

    // Update fields
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedResume);
  } catch (error) {
    console.error('Update Resume Error:', error);
    res.status(500).json({ message: error.message || 'Error updating resume' });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Ensure ownership
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this resume' });
    }

    await resume.deleteOne();
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting resume' });
  }
};

// @desc    Toggle public state
// @route   PATCH /api/resumes/:id/public
// @access  Private
export const togglePublic = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    resume.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : !resume.isPublic;
    await resume.save();

    res.json({ _id: resume._id, isPublic: resume.isPublic });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error toggling public state' });
  }
};

// @desc    Get public resume by ID (No auth required)
// @route   GET /api/resumes/public/:id
// @access  Public
export const getPublicResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!resume.isPublic) {
      return res.status(403).json({ message: 'This resume is private' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching public resume' });
  }
};
