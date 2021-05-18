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

function App(): JSX.Element {
  const [workouts, setWorkouts] = useState<WorkoutsResult | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      });
  }, []);

  const [places, setPlaces] = useState<PlacesResult | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);

  return (
    <div className="App">
      <div>
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
      <div>
        {places === null ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {places.results.map((place) => (
              <li key={place.slug}>{place.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
