import express from 'express';
import {
  getTips,
  addTip,
  likeTip,
} from '../controllers/tipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all tip-related routes (must be logged in)
router.use(protect);

// Routes for fetching and creating tips under a specific milestone
router.route('/:milestoneId')
  .get(getTips)     // GET /api/tips/:milestoneId — fetch all tips for a milestone
  .post(addTip);    // POST /api/tips/:milestoneId — add a new tip

// Route for liking a specific tip
router.put('/:tipId/like', likeTip); // PUT /api/tips/:tipId/like — like a tip

export default router;
