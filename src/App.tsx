import React from "react";
import { useQuery } from "./useQuery";
import { ResourceHandler } from "./ResourceHandler";

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
  const workoutsRes = useQuery<WorkoutsResult>(
    "http://localhost:3001/workouts"
  );
  const placesRes = useQuery<PlacesResult>("http://localhost:3001/places");

  return (
    <div className="App">
      <div>
        <h2>Workouts</h2>
        <ResourceHandler
          resource={workoutsRes}
          renderPending={() => <p>Loading Workouts !</p>}
          renderResolved={(workouts) => {
            return (
              <div>
                {workouts.results.map((workout) => (
                  <p key={workout.id}>
                    {workout.userName} - {workout.distance}m
                  </p>
                ))}
              </div>
            );
          }}
        />
      </div>
      <div>
        <h2>Places</h2>
        <ResourceHandler
          resource={placesRes}
          renderResolved={(places) => {
            return (
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
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
