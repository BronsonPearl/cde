import mongoose from 'mongoose';

const s = (max) => ({ type: String, trim: true, maxlength: max, default: '' });

const applicationSchema = new mongoose.Schema({
  name:         { ...s(40), required: true },
  level:        s(3),
  cls:          { ...s(30), required: true },
  spec:         s(40),
  role:         { type: String, enum: ['Tank', 'Healer', 'DPS'], default: 'DPS' },
  focus:        s(40),
  currentRank:  s(40),
  highestRank:  s(80),
  discord:      { ...s(40), required: true },
  voice:        s(40),
  availability: s(120),
  experience:   s(1500),
  goals:        s(1500),
  status:       { type: String, enum: ['new', 'accepted', 'declined'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
