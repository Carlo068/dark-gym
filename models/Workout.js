import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    exercises: [
        {
            id: String,
            sets: Number,
            reps: Number,
        },
    ],
});

export default mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
