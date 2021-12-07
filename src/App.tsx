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
  total: number;
  results: Workout[];
};

function App() {
  const [data, setData] = useState<null | WorkoutsResult>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Workouts</h1>
      <div>
        {data === null ? (
          <p>Loading...</p>
        ) : (
          data.results.map((workout) => {
            return (
              <p key={workout.id}>
                {workout.date} - {workout.distance}m - {workout.duration}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
