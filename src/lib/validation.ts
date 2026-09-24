import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const resumeUpdateSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(150).optional(),
  templateId: z.enum(['modern', 'minimal', 'creative', 'student']).optional(),
  isPublic: z.boolean().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').min(3).max(60).optional().nullable(),
  targetRole: z.string().max(100).optional().nullable(),
  resumeData: z.any().optional(),
});

export const jobMatchSchema = z.object({
  jobDescription: z.string().min(20, 'Job description must be at least 20 characters long'),
  resumeId: z.string().optional(),
  resumeData: z.any().optional(),
});

export const careerGapSchema = z.object({
  targetRole: z.string().min(2, 'Target role is required'),
  resumeId: z.string().optional(),
  resumeData: z.any().optional(),
});
