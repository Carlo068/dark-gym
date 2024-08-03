import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Workouts() {
    const { data: session } = useSession();
    const [workoutRoutines, setWorkoutRoutines] = useState([]);
    const [workoutName, setWorkoutName] = useState('');

    useEffect(() => {
        if (session) {
            fetchSavedWorkouts();
        }
    }, [session]);

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
                        <WorkoutRoutine key={index} workout={routine.workout} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No workout routines found.</p>
                )}
            </div>
        </div>
    );
}

const WorkoutRoutine = ({ workout }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {Object.keys(workout).map((day, index) => (
                <div key={index}>
                    <h2 className="text-xl font-semibold mb-2">{day}</h2>
                    <ul>
                        {Array.isArray(workout[day]) && workout[day].map((exercise, idx) => (
                            <li key={idx} className="mb-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Exercise ID: {exercise.id}</span>
                                    <span className="text-gray-500">{exercise.sets} sets x {exercise.reps} reps</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
