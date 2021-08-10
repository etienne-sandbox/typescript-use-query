import React, { useEffect, useState } from "react";

type Place = {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
};

type PlacesResponse = {
  results: Array<Place>;
  total: number;
};

async function fetchPlaces(): Promise<PlacesResponse> {
  const response = await fetch("http://localhost:3001/places");
  const data = await response.json();
  return data;
}

function App() {
  const [places, setPlaces] = useState<PlacesResponse | null>(null);

  useEffect(() => {
    fetchPlaces().then((places) => {
      setPlaces(places);
    });
  }, []);

  return (
    <div className="App">
      Hello React
      {places === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {places.results.map((place) => (
            <li key={place.slug}>{place.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
