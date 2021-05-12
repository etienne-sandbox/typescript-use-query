import { useState, useEffect } from "react";
import Ky from "ky";
import * as z from "zod";

export function useQuery<Data>(
  url: string,
  schema: z.Schema<Data>
): Data | null {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    let cancelled = false;
    Ky.get(url)
      .json()
      .then((data) => {
        if (cancelled) {
          return;
        }
        const result = schema.parse(data);
        setData(result);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
