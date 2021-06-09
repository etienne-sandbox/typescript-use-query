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

function App() {
  const [workouts, setWorkouts] = useState<WorkoutsResult | null>(null);

  useEffect(() => {
    let canceled = false;
    fetch("http://localhost:3001/workouts").then(async (response) => {
      const data = await response.json();
      if (canceled) {
        return;
      }
      setWorkouts(data);
    });
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="App">
      {workouts === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          {workouts.results.map((workout) => (
            <p key={workout.id}>
              {workout.userName} - {workout.distance}m
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
