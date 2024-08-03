const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutScheduleSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workout: {
      Monday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
      Tuesday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
      Wednesday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
      Thursday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
      Friday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
      Saturday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
      Sunday: [{ id: { type: Schema.Types.ObjectId, ref: 'Workout' } }],
    }
  });

const WorkoutSchedule = mongoose.model('WorkoutSchedule', workoutScheduleSchema);
module.exports = { WorkoutSchedule };