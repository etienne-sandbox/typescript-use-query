import React, { useEffect, useState } from "react";
import Ky from "ky";
import * as z from "zod";
import { useQuery } from "./useQuery";

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

const WorkoutsResultsSchema = z.object({
  total: z.number(),
  results: z.array(WorkoutSchema),
});

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutCount: z.number(),
});

const PlacesResultsSchema = z.object({
  total: z.number(),
  results: z.array(PlaceSchema),
});

export function App() {
  const workouts = useQuery(
    "http://localhost:3001/workouts",
    WorkoutsResultsSchema
  );
  const places = useQuery("http://localhost:3001/places", PlacesResultsSchema);

  return (
    <div className="App">
      <div>
        {workouts === null ? (
          <p>Loading...</p>
        ) : (
          workouts.results.map((workout) => {
            return (
              <div key={workout.id}>
                {workout.userName} - {workout.distance}m - {workout.duration}min
              </div>
            );
          })
        )}
      </div>
      <div>
        {places === null ? (
          <p>Loading...</p>
        ) : (
          places.results.map((place) => {
            return <div key={place.slug}>{place.name}</div>;
          })
        )}
      </div>
    </div>
  );
}
