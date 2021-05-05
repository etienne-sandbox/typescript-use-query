import { useEffect, useState } from "react";
import Ky from "ky";
import * as z from "zod";

export function useQuery<Data>(
  url: string,
  dataSchema: z.Schema<Data>
): Data | null {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const getData = async () => {
      const json = await Ky.get(url).json();
      const data = dataSchema.parse(json);
      setData(data);
    };
    getData();
  }, []);

  return data;
}
