import React, { useEffect, useState } from "react";
import Ky from "ky";
import * as z from "zod";

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

type Workout = z.infer<typeof WorkoutSchema>;

const DataSchema = z.object({
  results: z.array(WorkoutSchema),
  total: z.number(),
});
type Data = z.infer<typeof DataSchema>;

export function App() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const getData = async () => {
      const json = await Ky.get("http://localhost:3001/workouts").json();
      const data = DataSchema.parse(json);
      setData(data);
    };
    getData();
  }, []);

  return (
    <div className="App">
      {data === null ? (
        <p>No data</p>
      ) : (
        data.results.map((workout) => {
          return <div key={workout.id}>{workout.speed.toFixed(2)} km/h</div>;
        })
      )}
    </div>
  );
}
