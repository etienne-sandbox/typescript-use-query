import { useEffect, useState } from "react";
import * as z from "zod";

export function useResource<Data>(
  url: string,
  schema: z.Schema<Data>
): Data | null {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const parsed = schema.parse(data);
        setData(parsed);
      });
  }, []);

  return data;
}
