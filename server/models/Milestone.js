import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  notes: String,
}, { timestamps: true });

export default mongoose.model('Milestone', milestoneSchema);
