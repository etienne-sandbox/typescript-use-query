import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useQuery } from "./useQuery";
import { ResourceHandler } from "./ResourceHandler";

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutCount: z.number(),
});

const PlacesResponseSchema = responseSchema(PlaceSchema);

const WorkoutSchema = z.object({
  id: z.string(),
  date: z.string(),
  place: z.string(),
  distance: z.number(),
  duration: z.number(),
  user: z.string(),
  placeName: z.string(),
  speed: z.number(),
  userName: z.string(),
});

function responseSchema<T>(schema: z.Schema<T>) {
  return z.object({
    results: z.array(schema),
    total: z.number(),
  });
}

const WorkoutResponseSchema = responseSchema(WorkoutSchema);

async function fetchPlaces() {
  const response = await fetch("http://localhost:3001/places");
  if (!response.ok) {
    throw new Error("Invalid API response");
  }
  const data = await response.json();
  return data;
}

async function fetchWorkouts() {
  const response = await fetch("http://localhost:3001/workouts");
  const data = await response.json();
  return data;
}

function Places() {
  const placesRes = useQuery(fetchPlaces, PlacesResponseSchema);

  return (
    <div className="App">
      Hello React
      <ResourceHandler
        resource={placesRes}
        renderResolved={(places) => {
          return (
            <ul>
              {places.results.map((place) => (
                <li key={place.slug}>{place.name}</li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
}

function Workouts() {
  const workoutsRes = useQuery(fetchWorkouts, WorkoutResponseSchema);

  return (
    <div className="App">
      Hello React
      <ResourceHandler
        resource={workoutsRes}
        renderResolved={(workouts) => {
          return (
            <ul>
              {workouts.results.map((workout) => (
                <li key={workout.id}>
                  {workout.userName} - {workout.distance / 1000}km
                </li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
}

function App() {
  const [page, setPage] = useState<"places" | "workouts">("places");

  return (
    <div>
      <button onClick={() => setPage("places")}>Places</button>
      <button onClick={() => setPage("workouts")}>Workouts</button>
      {page === "places" && <Places />}
      {page === "workouts" && <Workouts />}
    </div>
  );
}

export default App;
