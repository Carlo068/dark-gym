import axios from "axios";
import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/login_button";

import 'tailwindcss/tailwind.css';

export default function GymData() {
    const [workouts, setWorkouts] = useState(null);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [savedWorkouts, setSavedWorkouts] = useState(null);
    const [dayWorkouts, setDayWorkouts] = useState({

        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });
    const [workoutDetails, setWorkoutDetails] = useState({});
    const { data: session } = useSession();

    useEffect(() => {
        axios.get("/api/gym_data_fetch").then((response) => setWorkouts(response.data));
    }, []);

    const handleCheckboxChange = (workoutId) => {
        if (selectedWorkouts.includes(workoutId)) {
            setSelectedWorkouts(selectedWorkouts.filter((id) => id !== workoutId));
            const updatedDetails = { ...workoutDetails };
            delete updatedDetails[workoutId];
            setWorkoutDetails(updatedDetails);
        } else {
            setSelectedWorkouts([...selectedWorkouts, workoutId]);
        }
    };

    const handleDayRadiobuttonChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleInputChange = (workoutId, field, value) => {
        setWorkoutDetails((prevDetails) => ({
            ...prevDetails,
            [workoutId]: {
                ...prevDetails[workoutId],
                [field]: value
            }
        }));
    };

    const saveDayWorkout = () => {
        const updatedDayWorkouts = { ...dayWorkouts };
        const workoutsToSave = selectedWorkouts.map((workoutId) => ({
            id: workoutId,
            ...workoutDetails[workoutId]
        }));
        updatedDayWorkouts[selectedDay] = workoutsToSave;
        setDayWorkouts(updatedDayWorkouts);

        axios.post("/api/save_workout", {
            user: session.user.id,
            workout: { [selectedDay]: workoutsToSave }
        }).then(response => {
            console.log("Workout saved successfully:", response.data);
        }).catch(error => {
            console.error("Error saving workout:", error);
        });

        console.log(`Workouts saved for ${selectedDay}:`, updatedDayWorkouts[selectedDay]);
    };

    const getSelectedWorkoutInputs = () => {
        return selectedWorkouts.map((workoutId) => {
            const workout = workouts.find((w) => w._id === workoutId);

            if (workout) {
                return (
                    <div key={workoutId} className="flex items-center justify-between bg-white p-4 rounded shadow mb-2 text-black">
                        <span className="flex-1">{workout.Ejercicio}</span>
                        <input
                            type="number"
                            placeholder="Sets"
                            className="border rounded p-2 mx-2"
                            value={workoutDetails[workoutId]?.sets || ''}
                            onChange={(e) => handleInputChange(workoutId, 'sets', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Reps"
                            className="border rounded p-2 mx-2"
                            value={workoutDetails[workoutId]?.reps || ''}
                            onChange={(e) => handleInputChange(workoutId, 'reps', e.target.value)}
                        />
                    </div>
                );
            }
            return null;
        });
    };

    const getDayWorkoutsTableBody = () => {
        const maxExercises = Math.max(...Object.values(dayWorkouts).map(day => day.length));

        const tableBody = [];

        for (let i = 0; i < maxExercises; i++) {
            tableBody.push(
                <tr key={i} className="bg-white even:bg-gray-100">
                    {Object.keys(dayWorkouts).map(day => {
                        const workout = dayWorkouts[day][i];
                        if (!workout) return <td key={day} className="border px-4 py-2"></td>;
                        const workoutData = workouts ? workouts.find(w => w._id === workout.id) : null;
                        return (
                            <td key={day} className="border px-4 py-2">
                                {workoutData ? `${workoutData.Ejercicio} - ${workout.sets} Sets, ${workout.reps} Reps` : ''}
                            </td>
                        );
                    })}
                </tr>
            );
        }

        return tableBody;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Workouts</h1>
                <button 
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Home
                </button>
            </div>

            {/* Contenido Principal */}
            <main className="flex flex-col flex-grow items-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["Chest", "Back", "Triceps", "Biceps", "Legs"].map((category, index) => (
                        <Disclosure key={category}>
                        {({ open }) => (
                            <>
                            <DisclosureButton className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>{category}</span>
                                {open ? (
                                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                ) : (
                                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                )}
                            </DisclosureButton>
                            <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                                <ul className="space-y-2">
                                {workouts &&
                                    workouts.slice(index * 17, (index + 1) * 17).map((workout) => (
                                    <li key={workout._id} className="flex items-center">
                                        <input
                                        type="checkbox"
                                        id={workout._id}
                                        className="mr-2"
                                        onChange={() => handleCheckboxChange(workout._id)}
                                        />
                                        <label htmlFor={workout._id} className="flex-1">{workout.Ejercicio}</label>
                                    </li>
                                    ))}
                                </ul>
                            </DisclosurePanel>
                            </>
                        )}
                        </Disclosure>
                    ))}
                </div>

                <div className="mt-8 w-full max-w-2xl">
                    <h3 className="text-2xl font-semibold mb-4 text-black text-center">Selected Exercises for {selectedDay}:</h3>
                    {getSelectedWorkoutInputs()}
                </div>

                <div className="mt-8 w-full max-w-2xl text-center">
                    <button 
                        onClick={saveDayWorkout} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Workout Plan for {selectedDay}
                    </button>
                </div>

                <div className="mt-8 w-full max-w-2xl text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-black">Select Day of the Week:</h3>
                    <div className="flex justify-center space-x-4 text-black">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                            <label key={day} className="flex items-center">
                                <input 
                                    type="radio" 
                                    id={day} 
                                    name="dayOfWeek" 
                                    value={day} 
                                    className="mr-2" 
                                    onChange={handleDayRadiobuttonChange} 
                                    checked={selectedDay === day} 
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-200 text-black">
                                {Object.keys(dayWorkouts).map(day => (
                                    <th key={day} className="border px-4 py-2">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-black">{getDayWorkoutsTableBody()}</tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

