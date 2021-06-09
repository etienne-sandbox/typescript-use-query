import React, { useEffect, useState } from "react";
import { useQuery } from "./useQuery";

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
        {(() => {
          if (workoutsRes.status === "void") {
            return null;
          }
          if (workoutsRes.status === "rejected") {
            return <p>Error</p>;
          }
          if (workoutsRes.status === "pending") {
            return <p>Loading...</p>;
          }
          if (workoutsRes.status === "resolved") {
            return (
              <div>
                {workoutsRes.data.results.map((workout) => (
                  <p key={workout.id}>
                    {workout.userName} - {workout.distance}m
                  </p>
                ))}
              </div>
            );
          }
          return null;
        })()}
      </div>
      <div>
        <h2>Places</h2>
        {placesRes.status !== "resolved" ? (
          <p>Loading...</p>
        ) : (
          <div>
            {placesRes.data.results.map((place) => (
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
