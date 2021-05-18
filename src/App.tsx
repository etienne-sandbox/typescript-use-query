import React, { useEffect, useState } from "react";

interface Workout {
  id: string;
  date: string;
  place: string;
  distance: number;
  duration: number;
  user: string;
  placeName: string;
  speed: number;
  userName: string;
}

interface WorkoutsResult {
  results: Array<Workout>;
  total: number;
}

function App(): JSX.Element {
  const [workouts, setWorkouts] = useState<WorkoutsResult | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      });
  }, []);

  return (
    <div className="App">
      {workouts === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {workouts.results.map((workout) => (
            <li key={workout.id}>
              {workout.userName} - {workout.duration}min
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
