import axios from "axios";
import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/navbar";

export default function GymData() {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDetails, setWorkoutDetails] = useState({});
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            axios.get("/api/gym_data_fetch").then((response) => setWorkouts(response.data));
            fetchSavedWorkouts();
        }
    }, [session]);

    const fetchSavedWorkouts = async () => {
        try {
            const response = await axios.get('/api/save_workout');
            console.log('Fetched saved workouts:', response.data.data); // Debugging statement
            setSavedWorkouts(response.data.data);
        } catch (error) {
            console.error('Error fetching saved workouts:', error);
        }
    };

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

    const handleInputChange = (workoutId, field, value) => {
        setWorkoutDetails((prevDetails) => ({
            ...prevDetails,
            [workoutId]: {
                ...prevDetails[workoutId],
                [field]: value
            }
        }));
    };

    const saveWorkout = () => {
        if (!session || !session.user) {
            console.error("User is not logged in.");
            return;
        }

        const workoutsToSave = selectedWorkouts.map((workoutId) => ({
            id: workoutId,
            ...workoutDetails[workoutId]
        }));

        axios.post("/api/save_workout", {
            userName: session.user.name,
            userId: session.user.id,
            workout: { name: workoutName, exercises: workoutsToSave }
        }).then(response => {
            console.log("Workout saved successfully:", response.data);
            fetchSavedWorkouts();
            alert("Workout saved successfully!"); // Add this line
        }).catch(error => {
            console.error("Error saving workout:", error);
        });

        console.log(`Workouts saved as ${workoutName}:`, workoutsToSave);
    };

    const getSelectedWorkoutInputs = () => {
        return selectedWorkouts.map((workoutId) => {
            const workout = workouts.find((w) => w._id === workoutId);

            if (workout) {
                return (
                    <div key={workoutId} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow mb-2 text-black">
                        <span className="flex-1 mb-2 md:mb-0">{workout.Ejercicio}</span>
                        <input
                            type="number"
                            placeholder="Sets"
                            className="border rounded p-2 w-full md:w-auto mb-2 md:mb-0 md:mx-2"
                            value={workoutDetails[workoutId]?.sets || ''}
                            onChange={(e) => handleInputChange(workoutId, 'sets', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Reps"
                            className="border rounded p-2 w-full md:w-auto mb-2 md:mb-0 md:mx-2"
                            value={workoutDetails[workoutId]?.reps || ''}
                            onChange={(e) => handleInputChange(workoutId, 'reps', e.target.value)}
                        />
                    </div>
                );
            }
            return null;
        });
    };

    const categorizeWorkouts = (category) => {
        switch (category) {
            case 'Chest':
                return workouts.slice(0, 17);
            case 'Back':
                return workouts.slice(17, 30);
            case 'Triceps':
                return workouts.slice(30, 41);
            case 'Biceps':
                return workouts.slice(41, 57);
            case 'Legs':
                return workouts.slice(57, 77);
            default:
                return [];
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-8">
                <h1 className="text-xl md:text-3xl font-bold text-black">Create your workout</h1>
            </div>
            <main className="flex flex-col flex-grow items-center">
                <div className="w-full grid grid-cols-1 gap-4">
                    {["Chest", "Back", "Triceps", "Biceps", "Legs"].map((category) => (
                        <Disclosure key={category}>
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="flex justify-between w-full px-3 md:px-4 py-2 text-sm md:text-base font-medium text-left text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>{category}</span>
                                        {open ? (
                                            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                        )}
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-3 md:px-4 pt-4 pb-2 text-sm md:text-base text-gray-700">
                                        <ul className="space-y-2">
                                            {workouts &&
                                                categorizeWorkouts(category).map((workout) => (
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
                    <label className="block text-lg font-bold text-gray-700 mb-2 text-left">
                        Workout Name
                    </label>
                    <input 
                        type="text" 
                        name="WorkoutName" 
                        className="mt-1 block h-12 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                        placeholder="Enter workout name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                    {getSelectedWorkoutInputs()}
                </div>

                <div className="mt-8 w-full max-w-2xl text-center">
                    <button 
                        onClick={saveWorkout} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Workout
                    </button>
                </div>
            </main>
            <Navbar />
        </div>
    );
}


