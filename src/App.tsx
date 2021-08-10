import React, { useEffect, useState } from "react";
import * as z from "zod";

const PlaceSchema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  workoutCount: z.number(),
});

const PlacesResponseSchema = z.object({
  results: z.array(PlaceSchema),
  total: z.number(),
});

type PlacesResponse = z.infer<typeof PlacesResponseSchema>;

async function fetchPlaces() {
  const response = await fetch("http://localhost:3001/places");
  const data = await response.json();
  return PlacesResponseSchema.parse(data);
}

function Places() {
  const [places, setPlaces] = useState<PlacesResponse | null>(null);

  useEffect(() => {
    let canceled = false;
    fetchPlaces().then((places) => {
      if (canceled) {
        return;
      }
      setPlaces(places);
    });
    return () => {
      canceled = true;
    };
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

function App() {
  const [showPlaces, setShowPlaces] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPlaces((p) => !p)}>Toggle</button>
      {showPlaces && <Places />}
    </div>
  );
}

export default App;
