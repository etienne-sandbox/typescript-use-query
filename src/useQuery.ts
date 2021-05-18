import { useEffect, useState } from "react";
import * as z from "zod";

type Resource<T> =
  | { status: "void" }
  | { status: "pending" }
  | { status: "resolved"; data: T }
  | { status: "rejected"; error: unknown };

export function useQuery<T>(url: string, schema: z.Schema<T>): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: unknown) => {
        const result = schema.parse(data);
        setData(result);
      });
  }, []);

  return data;
}
