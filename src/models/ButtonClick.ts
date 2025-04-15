import mongoose from 'mongoose';

const buttonClickSchema = new mongoose.Schema({
  buttonId: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  lastClickedAt: {
    type: Date,
    default: Date.now,
  },
});

const ButtonClick = mongoose.models.ButtonClick || mongoose.model('ButtonClick', buttonClickSchema);

export default ButtonClick;