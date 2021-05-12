import React, { useEffect, useState } from "react";
import Ky from "ky";
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

const WorkoutsResultsSchema = z.object({
  total: z.number(),
  results: z.array(WorkoutSchema),
});

type WorkoutsResults = z.infer<typeof WorkoutsResultsSchema>;

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutCount: z.number(),
});

const PlacesResultSchema = z.object({
  total: z.number(),
  results: z.array(PlaceSchema),
});

type PlacesResult = z.infer<typeof PlacesResultSchema>;

export function App() {
  const [workouts, setWorkouts] = useState<WorkoutsResults | null>(null);

  useEffect(() => {
    let cancelled = false;
    Ky.get("http://localhost:3001/workouts")
      .json()
      .then((data) => {
        if (cancelled) {
          return;
        }
        const result = WorkoutsResultsSchema.parse(data);
        setWorkouts(result);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const [places, setPlaces] = useState<PlacesResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    Ky.get("http://localhost:3001/places")
      .json()
      .then((data) => {
        if (cancelled) {
          return;
        }
        const result = PlacesResultSchema.parse(data);
        setPlaces(result);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
