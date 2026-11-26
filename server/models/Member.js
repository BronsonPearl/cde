import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 40 },   // "First Last"
  cls:       { type: String, required: true, trim: true },
  role:      { type: String, enum: ['Tank', 'Healer', 'DPS'], default: 'DPS' },
  guildRank: { type: String, trim: true, default: 'Member' },
  pvpRank:   { type: Number, min: 0, max: 14, default: 0 },
  title:     { type: String, trim: true, default: '' },
  focus:     { type: String, trim: true, default: '' },
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
