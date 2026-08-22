import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { seedDatabase } from './config/seed.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();

// Connect to MongoDB & Seed Demo Data
connectDB().then(() => {
  seedDatabase();
});

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev/testing
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ResumeCraft Backend API operational', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
