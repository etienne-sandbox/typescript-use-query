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
  workoutCount: z.number(),
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
      <div>
        {(() => {
          if (workoutsRes.status === "pending") {
            return <p>Loading...</p>;
          }
          if (workoutsRes.status === "resolved") {
            return (
              <ul>
                {workoutsRes.data.results.map((workout) => (
                  <li key={workout.id}>
                    {workout.userName} - {workout.duration}min
                  </li>
                ))}
              </ul>
            );
          }
          if (workoutsRes.status === "rejected") {
            return <p>Error: {String(workoutsRes.error)}</p>;
          }
          return null;
        })()}
      </div>
      <div>
        {placesRes.status !== "resolved" ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {placesRes.data.results.map((place) => (
              <li key={place.slug}>{place.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
