import mongoose from 'mongoose';

const countdownSettingsSchema = new mongoose.Schema({
  countdownEndDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CountdownSettings = mongoose.model('CountdownSettings', countdownSettingsSchema);

export default CountdownSettings;
