import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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
            console.log('Fetched exercise data:', response.data); // Debugging statement
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
            console.log('Fetched saved workouts:', response.data.data); // Debugging statement
            setWorkoutRoutines(response.data.data);
        } catch (error) {
            console.error('Error fetching saved workouts:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Workout Routines</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workoutRoutines.length > 0 ? (
                    workoutRoutines.map((routine, index) => (
                        <WorkoutRoutine key={index} routine={routine} exercises={exercises} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No workout routines found.</p>
                )}
            </div>
        </div>
    );
}

const WorkoutRoutine = ({ routine, exercises }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-black">{routine.workout.name}</h2>
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
        </div>
    );
};

