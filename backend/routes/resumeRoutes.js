import express from 'express';
import {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  togglePublic,
  getPublicResume
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route for shared resumes (No auth middleware)
router.get('/public/:id', getPublicResume);

// Protected routes (JWT middleware)
router.get('/', protect, getResumes);
router.post('/', protect, createResume);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);
router.patch('/:id/public', protect, togglePublic);

export default router;
