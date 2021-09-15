import React, { useEffect, useState } from "react";

type Workout = {
  id: string;
  date: string;
  place: string;
  distance: number;
  duration: number;
  user: string;
  placeName: string;
  speed: number;
  userName: string;
};

type WorkoutsResult = {
  results: Array<Workout>;
  total: number;
};

function App() {
  const [workouts, setWorkouts] = useState<WorkoutsResult | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data: WorkoutsResult) => {
        setWorkouts(data);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Workouts</h2>
        {workouts === null ? (
          <p>Loading...</p>
        ) : (
          workouts.results.map((workout) => (
            <p key={workout.id}>
              {workout.userName.toUpperCase()} - {workout.distance}m -{" "}
              {workout.duration} min
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
