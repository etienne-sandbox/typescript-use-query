import React from "react";
import { useResource } from "./useResource";
import * as z from "zod";
import { ResourceHandler } from "./ResourceHandler";

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

const WorkoutSchema = z.object({
  id: z.string(),
  place: z.string(),
  distance: z.number(),
  duration: z.number(),
  speed: z.number(),
  userName: z.string(),
  date: z.string(),
  user: z.string(),
  placeName: z.string(),
});

const WorkoutsResultSchema = z.object({
  results: z.array(WorkoutSchema),
  total: z.number().min(0),
});

function App() {
  const workouts = useResource(
    "http://localhost:3001/workouts",
    WorkoutsResultSchema
  );

  const places = useResource(
    "http://localhost:3001/places",
    PlacesResultSchema
  );

  return (
    <div className="App">
      <div>
        <h2>Workouts</h2>
        <ResourceHandler
          resource={workouts}
          renderResolved={(workouts) => {
            return workouts.results.map((workout) => (
              <p key={workout.id}>
                {workout.userName.toUpperCase()} - {workout.distance}m -{" "}
                {workout.duration} min
              </p>
            ));
          }}
        />
      </div>
      <div>
        <h2>Places</h2>
        <ResourceHandler
          resource={places}
          renderResolved={(places) => {
            return places.results.map((place) => (
              <div key={place.slug}>
                <h3>{place.name}</h3>
                <img
                  src={`http://localhost:3001/public${place.image}`}
                  style={{ height: 100 }}
                />
              </div>
            ));
          }}
        />
      </div>
    </div>
  );
}

export default App;
