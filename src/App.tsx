import React, { useEffect, useState } from "react";
import Ky from "ky";
import * as z from "zod";
import { useQuery } from "./useQuery";

const WorkoutSchema = z.object({
  date: z.string(),
  distance: z.number(),
  duration: z.number(),
  id: z.string(),
  place: z.string(),
  placeName: z.string(),
  speed: z.number(),
  user: z.string(),
  userName: z.string(),
});

const GetWorkoutsSchema = z.object({
  results: z.array(WorkoutSchema),
  total: z.number(),
});
type GetWorkouts = z.infer<typeof GetWorkoutsSchema>;

const PlaceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  workoutCount: z.number(),
});

const GetPlacesSchema = z.object({
  results: z.array(PlaceSchema),
  total: z.number(),
});

export function App() {
  const workouts = useQuery(
    "http://localhost:3001/workouts",
    GetWorkoutsSchema
  );
  const places = useQuery("http://localhost:3001/places", GetPlacesSchema);

  return (
    <div className="App">
      <div>
        {workouts === null ? (
          <p>No data</p>
        ) : (
          workouts.results.map((workout) => {
            return <div key={workout.id}>{workout.speed.toFixed(2)} km/h</div>;
          })
        )}
      </div>
      <div>
        {places === null ? (
          <p>No data</p>
        ) : (
          places.results.map((place) => {
            return <div key={place.slug}>{place.name}</div>;
          })
        )}
      </div>
    </div>
  );
}
