import express from 'express';
import {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
} from '../controllers/milestoneController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all milestone routes
router.use(protect);

// Routes for creating and fetching milestones
router.route('/')
  .get(getMilestones)   // GET /api/milestones — fetch user's milestones
  .post(createMilestone); // POST /api/milestones — create new milestone

// Routes for updating and deleting specific milestone by ID
router.route('/:id')
  .put(updateMilestone)   // PUT /api/milestones/:id — update milestone
  .delete(deleteMilestone); // DELETE /api/milestones/:id — delete milestone

export default router;
