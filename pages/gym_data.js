import axios from "axios";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

import 'tailwindcss/tailwind.css'; // Make sure you have Tailwind CSS configured in your project

export default function GymData() {
    const [workouts, setWorkouts] = useState(null);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [selectedDay, setSelectedDay] = useState("Monday");
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
            // Remove the workout details when deselected
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
            ...workoutDetails[workoutId] // Include sets and reps
        }));
        updatedDayWorkouts[selectedDay] = workoutsToSave;
        setDayWorkouts(updatedDayWorkouts);

         // Send the workout data along with user data to the backend
         axios.post("/api/save_workout", {
            user: session.user._id,
            workout: { [selectedDay]: workoutsToSave }
        }).then(response => {
            console.log("Workout saved successfully:", response.data);
            // You can handle success here, such as showing a success message to the user
        }).catch(error => {
            console.error("Error saving workout:", error);
            // You can handle errors here, such as showing an error message to the user
        });

        console.log(`Workouts saved for ${selectedDay}:`, updatedDayWorkouts[selectedDay]);
    };

    const getSelectedWorkoutInputs = () => {
        return selectedWorkouts.map((workoutId) => {
            const workout = workouts.find((w) => w._id === workoutId);

            if (workout) {
                return (
                    <div key={workoutId} className="flex items-center justify-between bg-white p-4 rounded shadow mb-2 text-black"> {/* Updated text color */}
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
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-black">Workouts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Chest", "Back", "Triceps", "Biceps", "Legs"].map((category, index) => (
                    <Disclosure key={category}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"> {/* Updated text color */}
                                    <span>{category}</span>
                                    {open ? (
                                        <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
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
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-black">Selected Exercises for {selectedDay}:</h3>
                {getSelectedWorkoutInputs()}
            </div>
            <div className="mt-8">
                <button 
                    onClick={saveDayWorkout} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Save Workout Plan for {selectedDay}
                </button>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-black">Select Day of the Week:</h3>
                <div className="flex space-x-4 text-black">
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
            <table className="table-auto w-full mt-8">
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
    );
}
