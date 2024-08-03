import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Navbar } from '@/components/navbar';

export default function Workouts() {
    const { data: session } = useSession();
    const [workoutRoutines, setWorkoutRoutines] = useState([]);
    const [exercises, setExercises] = useState({});

    useEffect(() => {
        if (session) {
            fetchExerciseData();
            fetchSavedWorkouts();
        }
    }, [session]);

    const fetchExerciseData = async () => {
        try {
            const response = await axios.get("/api/gym_data_fetch");
            console.log('Fetched exercise data:', response.data);
            const exerciseData = response.data.reduce((acc, exercise) => {
                acc[exercise._id] = exercise.Ejercicio;
                return acc;
            }, {});
            setExercises(exerciseData);
        } catch (error) {
            console.error('Error fetching exercise data:', error);
        }
    };

    const fetchSavedWorkouts = async () => {
        try {
            const response = await axios.get('/api/save_workout');
            console.log('Fetched saved workouts:', response.data.data);
            setWorkoutRoutines(response.data.data);
        } catch (error) {
            console.error('Error fetching saved workouts:', error);
        }
    };

    const handleCopyWorkout = async (routine) => {
        if (!session || !session.user) {
            console.error("User is not logged in.");
            return;
        }

        const newRoutine = {
            ...routine,
            userId: session.user.id,
            userName: session.user.name,
            workout: {
                ...routine.workout,
                name: `${routine.workout.name} (Copy)`
            }
        };

        try {
            const response = await axios.post('/api/save_workout', newRoutine);
            console.log('Workout copied successfully:', response.data);
            fetchSavedWorkouts();
        } catch (error) {
            console.error('Error copying workout:', error);
        }
    };

    const WorkoutRoutine = ({ routine, exercises, onCopyWorkout }) => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{routine.workout.name}</h2>
                <p className="text-gray-600 mb-4">Posted by: {routine.userName}</p>
                <ul>
                    {Array.isArray(routine.workout.exercises) && routine.workout.exercises.map((exercise, idx) => (
                        <li key={idx} className="mb-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                    Exercise: {exercises[exercise.id] || 'Loading...'}
                                </span>
                                <span className="text-gray-500">
                                    {exercise.sets} sets x {exercise.reps} reps
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => onCopyWorkout(routine)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Copy Workout
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-50">
            <div className="container mx-auto p-4 flex-grow">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">FEED</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workoutRoutines.length > 0 ? (
                        workoutRoutines.map((routine, index) => (
                            <WorkoutRoutine
                                key={index}
                                routine={routine}
                                exercises={exercises}
                                onCopyWorkout={handleCopyWorkout}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No workout routines found.</p>
                    )}
                </div>
            </div>
            <Navbar />
        </div>
    );
}


