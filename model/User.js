import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  statistics: {
    lookups: {
      type: Number,
      default: 0,
    },
  },
  settings: {
    wineGlasses: {
      type: [String],
      required: false,
    },
    language: {
      type: String,
      required: true,
      default: 'en',
    },
  },
  uuid: {
    type: String,
    required: true,
    default: () => randomUUID(),
  },
});

export default mongoose.model('User', userSchema);
