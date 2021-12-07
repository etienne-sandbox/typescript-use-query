import React, { useEffect, useState } from "react";
import * as zod from "zod";

const WorkoutSchema = zod.object({
  id: zod.string(),
  date: zod.string(),
  place: zod.string(),
  distance: zod.number(),
  duration: zod.number(),
  user: zod.string(),
  placeName: zod.string(),
  speed: zod.number(),
  userName: zod.string(),
});

const WorkoutsResultSchema = zod.object({
  total: zod.number(),
  results: zod.array(WorkoutSchema),
});

const PlaceSchema = zod.object({
  image: zod.string(),
  name: zod.string(),
  slug: zod.string(),
  workoutCount: zod.number(),
});

const PlacesResultSchema = zod.object({
  total: zod.number(),
  results: zod.array(PlaceSchema),
});

type ApiResult<Item> = {
  total: number;
  results: Array<Item>;
};

function useData<Item>(
  path: string,
  schema: zod.Schema<ApiResult<Item>>
): null | ApiResult<Item> {
  const [data, setData] = useState<null | ApiResult<Item>>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/${path}`)
      .then((res) => res.json())
      .then((data) => {
        const validatedData = schema.parse(data);
        setData(validatedData);
      });
  }, []);

  return data;
}

function App() {
  const workouts = useData("workouts", WorkoutsResultSchema);
  const places = useData("places", PlacesResultSchema);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: "50%" }}>
        <h2>Workouts</h2>
        <div>
          {workouts === null ? (
            <p>Loading...</p>
          ) : (
            workouts.results.map((workout) => {
              return (
                <p key={workout.id}>
                  {workout.userName.toUpperCase()} -{" "}
                  {(workout.distance / 1000).toFixed(2)}km - {workout.duration}
                  min
                </p>
              );
            })
          )}
        </div>
      </div>

      <div style={{ width: "40%" }}>
        <h2>Places</h2>
        <div>
          {places === null ? (
            <p>Loading...</p>
          ) : (
            places.results.map((place) => {
              return (
                <div
                  key={place.slug}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`http://localhost:3001/public${place.image}`}
                    style={{ maxHeight: 50 }}
                  />
                  <p>{place.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
