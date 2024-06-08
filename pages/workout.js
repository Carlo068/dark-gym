import { getWorkouts} from './api/workouts';

async function fetchWorkouts() {
  const { workouts } = await getWorkouts();
  if (!workouts) throw new Error('Failed to fetch workouts');

  return workouts;
}
export default async function Home() {
  const workouts = await fetchWorkouts()

  return (
    <div>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.ejercicio}
          </li>
        ))}
      </ul>
    </div>
  );
}