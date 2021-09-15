import { useEffect, useState } from "react";

type Workout = {
  id: string;
  date: string;
  place: string;
  distance: number;
  duration: number;
  user: string;
  placeName: string;
  speed: number;
  userName: string;
};

type WorkoutsResult = {
  results: Array<Workout>;
  total: number;
};

export function useWorkouts(): WorkoutsResult | null {
  const [workouts, setWorkouts] = useState<WorkoutsResult | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data: WorkoutsResult) => {
        setWorkouts(data);
      });
  }, []);

  return workouts;
}
