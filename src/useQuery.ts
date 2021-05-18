import { useEffect, useState } from "react";

export function useQuery<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return data;
}
