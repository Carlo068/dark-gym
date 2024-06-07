import axios from "axios";
import { useEffect, useState } from "react";

export default function GymData() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        axios.get("/api/workouts").then((response) => setWorkouts(response.data));
        }, []);
    
    return (
        <div>
            <h1>Workouts</h1>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>
                        <h2>{workout.Ejercicio}</h2>
                        <p></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}