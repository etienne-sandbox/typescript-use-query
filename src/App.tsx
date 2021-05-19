import React from "react";
import { useQuery } from "./useQuery";
import * as z from "zod";
import { ResourceHandler } from "./ResourceHandler";

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

const WorkoutsResultSchema = z.object({
  results: z.array(WorkoutSchema),
  total: z.number(),
});

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutcount: z.number(),
});

const PlacesResultSchema = z.object({
  results: z.array(PlaceSchema),
  total: z.number(),
});

function App(): JSX.Element {
  const workoutsRes = useQuery(
    "http://localhost:3001/workouts",
    WorkoutsResultSchema
  );
  const placesRes = useQuery(
    "http://localhost:3001/places",
    PlacesResultSchema
  );

  return (
    <div className="App">
      <ResourceHandler
        resource={workoutsRes}
        handleResolved={(workouts) => {
          return (
            <ul>
              {workouts.results.map((workout) => (
                <li key={workout.id}>
                  {workout.userName} - {workout.duration}min
                </li>
              ))}
            </ul>
          );
        }}
        handleRejected={() => {
          return <p>Cannot fetch workouts !</p>;
        }}
      />
      <ResourceHandler
        resource={placesRes}
        handleResolved={(places) => {
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

export default App;
