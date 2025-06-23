import Tip from '../models/Tip.js';

// @desc    Get all tips for a specific milestone
// @route   GET /api/tips/:milestoneId
// @access  Private
export const getTips = async (req, res) => {
  try {
    const tips = await Tip.find({ milestone: req.params.milestoneId }).sort({ createdAt: -1 });
    res.json(tips);
  } catch (err) {
    console.error('Error fetching tips:', err.message);
    res.status(500).json({ msg: 'Failed to load tips. Please try again later.' });
  }
};

// @desc    Add a new tip to a milestone
// @route   POST /api/tips/:milestoneId
// @access  Private
export const addTip = async (req, res) => {
  const { content, createdBy } = req.body;

  try {
    if (!content || !content.trim()) {
      return res.status(400).json({ msg: 'Tip content cannot be empty.' });
    }

    const tip = await Tip.create({
      milestone: req.params.milestoneId,
      content: content.trim(),
      createdBy: createdBy?.trim() || 'Anonymous',
    });

    res.status(201).json(tip);
  } catch (err) {
    console.error('Error adding tip:', err.message);
    res.status(500).json({ msg: 'Failed to add your tip. Please try again.' });
  }
};

// @desc    Like a specific tip
// @route   PUT /api/tips/:tipId/like
// @access  Private
export const likeTip = async (req, res) => {
  try {
    const tip = await Tip.findByIdAndUpdate(
      req.params.tipId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!tip) {
      return res.status(404).json({ msg: 'Tip not found or already deleted.' });
    }

    res.json(tip);
  } catch (err) {
    console.error('Error liking tip:', err.message);
    res.status(500).json({ msg: 'Could not like the tip. Please try again later.' });
  }
};
