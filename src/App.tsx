import React, { useEffect, useState } from "react";
import Ky from "ky";

interface Workout {
  date: string;
  distance: number;
  duration: number;
  id: string;
  place: string;
  placeName: string;
  speed: number;
  user: string;
  username: string;
}

interface Data {
  results: Array<Workout>;
  total: number;
}

export function App() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const getData = async () => {
      const json = await Ky.get("http://localhost:3001/workouts").json<Data>();
      console.log(json);
      setData(json);
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
