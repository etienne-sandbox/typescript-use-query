import React, { useEffect, useState } from "react";
import * as z from "zod";

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutCount: z.number(),
});

const PlacesResponseSchema = responseSchema(PlaceSchema);

type PlacesResponse = z.infer<typeof PlacesResponseSchema>;

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

type WorkoutResponse = z.infer<typeof WorkoutResponseSchema>;

async function fetchPlaces() {
  const response = await fetch("http://localhost:3001/places");
  const data = await response.json();
  return PlacesResponseSchema.parse(data);
}

async function fetchWorkouts() {
  const response = await fetch("http://localhost:3001/workouts");
  const data = await response.json();
  return WorkoutResponseSchema.parse(data);
}

function Places() {
  const [places, setPlaces] = useState<PlacesResponse | null>(null);

  useEffect(() => {
    let canceled = false;
    fetchPlaces().then((places) => {
      if (canceled) {
        return;
      }
      setPlaces(places);
    });
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="App">
      Hello React
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
  );
}

function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutResponse | null>(null);

  useEffect(() => {
    let canceled = false;
    fetchWorkouts().then((workouts) => {
      if (canceled) {
        return;
      }
      setWorkouts(workouts);
    });
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="App">
      Hello React
      {workouts === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {workouts.results.map((workout) => (
            <li key={workout.id}>
              {workout.userName} - {workout.distance / 1000}km
            </li>
          ))}
        </ul>
      )}
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
