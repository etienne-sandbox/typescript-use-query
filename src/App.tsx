import React from "react";
import { useQuery } from "./useQuery";
import * as z from "zod";

const WorkoutSchema = z.object({
  id: z.string(),
  date: z.string(),
  place: z.string(),
  distance: z.number(),
  duration: z.number(),
  user: z.string(),
  placeName: z.string(),
  speed: z.number(),
  username: z.string(),
});

const WorkoutsResultSchema = z.object({
  results: z.array(WorkoutSchema),
  total: z.number(),
});

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutCount: z.number(),
});

const PlacesResultSchema = z.object({
  results: z.array(PlaceSchema),
  total: z.number(),
});

function App(): JSX.Element {
  const workouts = useQuery(
    "http://localhost:3001/workouts",
    WorkoutsResultSchema
  );
  const places = useQuery("http://localhost:3001/places", PlacesResultSchema);

  return (
    <div className="App">
      <div>
        {workouts === null ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {workouts.results.map((workout) => (
              <li key={workout.id}>
                {workout.username} - {workout.duration}min
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
