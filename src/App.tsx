import React, { useEffect, useState } from "react";

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
  total: number;
  results: Workout[];
};

type Place = {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
};

type PlacesResult = {
  total: number;
  results: Place[];
};

function App() {
  const [workouts, setWorkouts] = useState<null | WorkoutsResult>(null);
  const [places, setPlaces] = useState<null | PlacesResult>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);

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
                  {workout.date} - {workout.distance}m - {workout.duration}min
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
