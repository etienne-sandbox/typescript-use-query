import { useState, useEffect } from "react";

export function useQuery<Result>(url: string): Result | null {
  const [data, setData] = useState<Result | null>(null);

  useEffect(() => {
    let canceled = false;
    fetch(url).then(async (response) => {
      const data = await response.json();
      if (canceled) {
        return;
      }
      setData(data);
    });
    return () => {
      canceled = true;
    };
  }, []);

  return data;
}
