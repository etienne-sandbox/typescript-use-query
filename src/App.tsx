import React, { useEffect, useState } from "react";
import { useWorkouts } from "./useWorkouts";

type Place = {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
};

type PlacesResult = {
  results: Array<Place>;
  total: number;
};

function App() {
  const workouts = useWorkouts();

  const [places, setPlaces] = useState<PlacesResult | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/places")
      .then((res) => res.json())
      .then((data: PlacesResult) => {
        setPlaces(data);
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
      <div>
        <h2>Places</h2>
        {places === null ? (
          <p>Loading...</p>
        ) : (
          places.results.map((place) => (
            <div key={place.slug}>
              <h3>{place.name}</h3>
              <img
                src={`http://localhost:3001/public${place.image}`}
                style={{ height: 100 }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
