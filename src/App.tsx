import React, { useEffect, useState } from "react";
import Ky from "ky";

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

type WorkoutsResults = {
  results: Array<Workout>;
  total: number;
};

export function App() {
  const [workouts, setWorkouts] = useState<WorkoutsResults | null>(null);

  useEffect(() => {
    let cancelled = false;
    Ky.get("http://localhost:3001/workouts")
      .json<WorkoutsResults>()
      .then((data) => {
        if (cancelled) {
          return;
        }
        setWorkouts(data);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="App">
      {workouts === null ? (
        <p>Loading...</p>
      ) : (
        workouts.results.map((workout) => {
          return (
            <div key={workout.id}>
              {workout.userName} - {workout.distance}m - {workout.duration}min
            </div>
          );
        })
      )}
    </div>
  );
}
