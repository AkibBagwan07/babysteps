import Milestone from '../models/Milestone.js';

// @desc    Create a new milestone for the logged-in user
// @route   POST /api/milestones
export const createMilestone = async (req, res) => {
  const { title, date, notes } = req.body;

  try {
    const milestone = await Milestone.create({
      user: req.user._id,
      title,
      date,
      notes,
    });

    res.status(201).json(milestone);
  } catch (err) {
    console.error('Error creating milestone:', err.message);
    res.status(500).json({ msg: 'Unable to create milestone. Please try again.' });
  }
};

// @desc    Get all milestones for the logged-in user
// @route   GET /api/milestones
export const getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ user: req.user._id }).sort({ date: 1 });
    res.json(milestones);
  } catch (err) {
    console.error('Error fetching milestones:', err.message);
    res.status(500).json({ msg: 'Failed to retrieve milestones.' });
  }
};

// @desc    Update a specific milestone
// @route   PUT /api/milestones/:id
export const updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!milestone) {
      return res.status(404).json({ msg: 'Milestone not found or unauthorized.' });
    }

    res.json(milestone);
  } catch (err) {
    console.error('Error updating milestone:', err.message);
    res.status(500).json({ msg: 'Failed to update milestone.' });
  }
};

// @desc    Delete a specific milestone
// @route   DELETE /api/milestones/:id
export const deleteMilestone = async (req, res) => {
  try {
    const deleted = await Milestone.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: 'Milestone not found or unauthorized.' });
    }

    res.json({ msg: 'Milestone deleted successfully.' });
  } catch (err) {
    console.error('Error deleting milestone:', err.message);
    res.status(500).json({ msg: 'Unable to delete milestone. Please try again.' });
  }
};
