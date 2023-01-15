import mongoose from 'mongoose';

const wineGlassSchema = new mongoose.Schema({
  series: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  grapes: {
    type: [String],
    required: false,
  },
  image: {
    type: String,
  },
});

export default mongoose.model('WineGlass', wineGlassSchema);
