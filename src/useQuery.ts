import { useEffect, useState } from "react";
import * as z from "zod";

export type Resource<T> =
  | { status: "void" }
  | { status: "pending" }
  | { status: "resolved"; data: T }
  | { status: "rejected"; error: unknown };

export function useQuery<T>(url: string, schema: z.Schema<T>): Resource<T> {
  const [resource, setResource] = useState<Resource<T>>({ status: "void" });

  useEffect(() => {
    setResource({ status: "pending" });
    fetch(url)
      .then((res) => res.json())
      .then((data: unknown) => {
        const result = schema.parse(data);
        setResource({ status: "resolved", data: result });
      })
      .catch((err) => {
        setResource({ status: "rejected", error: err });
      });
  }, []);

  return resource;
}
