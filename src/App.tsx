import React from "react";
import { useResource } from "./useResource";
import * as z from "zod";

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
  user__: z.string(),
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
        {(() => {
          if (workouts.status === "rejected") {
            return <p>oops error</p>;
          }
          if (workouts.status === "parsing-error") {
            return <p>Invalid API response</p>;
          }
          if (workouts.status === "resolved") {
            return workouts.data.results.map((workout) => (
              <p key={workout.id}>
                {workout.userName.toUpperCase()} - {workout.distance}m -{" "}
                {workout.duration} min
              </p>
            ));
          }
          return <p>Loading...</p>;
        })()}
      </div>
      <div>
        <h2>Places</h2>
        {places.status !== "resolved" ? (
          <p>Loading...</p>
        ) : (
          places.data.results.map((place) => (
            <div key={place.slug}>
              <h3>{place.name}</h3>
              <img
                src={`http://localhost:3001/public${place.image}`}
                style={{ height: 100 }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
