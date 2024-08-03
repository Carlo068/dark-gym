import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Workouts() {
    const { data: session } = useSession();
    const [workoutRoutines, setWorkoutRoutines] = useState([]);
    const [exercises, setExercises] = useState({});
    const [weeklySchedule, setWeeklySchedule] = useState({
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: null,
        Sunday: null
    });

    useEffect(() => {
        if (session) {
            fetchExerciseData();
            fetchSavedWorkouts();
            fetchWeeklySchedule();
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
            const userWorkouts = response.data.data.filter(routine => routine.userId === session.user.id);
            setWorkoutRoutines(userWorkouts);
        } catch (error) {
            console.error('Error fetching saved workouts:', error);
        }
    };

    const fetchWeeklySchedule = async () => {
        try {
            const response = await axios.get('/api/schedule', {
                params: { userId: session.user.id }
            });
            console.log('Fetched weekly schedule:', response.data);
            setWeeklySchedule(response.data);
        } catch (error) {
            console.error('Error fetching weekly schedule:', error);
        }
    };

    const handleAssignWorkout = (day, workoutId) => {
        setWeeklySchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: { workoutId }
        }));
    };

    const handleSaveSchedule = async () => {
        try {
            const response = await axios.put('/api/schedule', {
                userId: session.user.id,
                schedule: weeklySchedule
            });
            console.log('Schedule saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving schedule:', error);
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
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Assign Workouts to Days</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Day</th>
                            <th className="border border-gray-300 px-4 py-2">Workout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <tr key={day}>
                                <td className="border border-gray-300 px-4 py-2">{day}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">
                                    <select
                                        className="border p-2 rounded w-full"
                                        value={weeklySchedule[day]?.workoutId || ''}
                                        onChange={(e) => handleAssignWorkout(day, e.target.value)}
                                    >
                                        <option value="">Select Workout</option>
                                        {workoutRoutines.map((routine) => (
                                            <option key={routine._id} value={routine._id}>{routine.workout.name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4">
                    <button
                        onClick={handleSaveSchedule}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Schedule
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Weekly Schedule</h2>
                {Object.keys(weeklySchedule).map((day) => (
                    <div key={day} className="mb-4">
                        <h3 className="text-lg font-medium">{day}</h3>
                        <ul>
                            {weeklySchedule[day] && (
                                <li className="ml-4">{workoutRoutines.find(w => w._id === weeklySchedule[day].workoutId)?.workout.name}</li>
                            )}
                        </ul>
                    </div>
                ))}
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
}






