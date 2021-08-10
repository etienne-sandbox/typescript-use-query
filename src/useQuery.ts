import { useEffect, useState } from "react";
import * as z from "zod";

export type Resource<T> =
  | { status: "void" }
  | { status: "pending" }
  | { status: "resolved"; data: T }
  | { status: "rejected"; error: unknown };

export function useQuery<T>(
  fetchData: () => Promise<any>,
  schema: z.Schema<T>
): Resource<T> {
  const [resource, setResource] = useState<Resource<T>>({ status: "void" });

  useEffect(() => {
    let canceled = false;
    setResource({ status: "pending" });
    fetchData()
      .then((data) => {
        if (canceled) {
          return;
        }
        const parsed = schema.parse(data);
        setResource({ status: "resolved", data: parsed });
      })
      .catch((error) => {
        if (canceled) {
          return;
        }
        setResource({ status: "rejected", error });
      });
    return () => {
      canceled = true;
    };
  }, []);

  return resource;
}
