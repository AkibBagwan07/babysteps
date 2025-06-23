import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', required: true },
  content: { type: String, required: true },
  createdBy: { type: String, default: 'Anonymous' },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Tip', tipSchema);
