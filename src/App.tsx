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

interface Place {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
}

interface PlacesResult {
  results: Array<Place>;
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

  const [places, setPlaces] = useState<PlacesResult | null>(null);

  useEffect(() => {
    let canceled = false;
    fetch("http://localhost:3001/places").then(async (response) => {
      const data = await response.json();
      if (canceled) {
        return;
      }
      setPlaces(data);
    });
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Workouts</h2>
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
      <div>
        <h2>Places</h2>
        {places === null ? (
          <p>Loading...</p>
        ) : (
          <div>
            {places.results.map((place) => (
              <div key={place.slug}>
                <p>{place.name}</p>
                <img
                  src={"http://localhost:3001/public" + place.image}
                  style={{ height: 100 }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
