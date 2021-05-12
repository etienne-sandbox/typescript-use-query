import { useState, useEffect } from "react";
import Ky from "ky";
import * as z from "zod";

export type Resource<ResourceData> =
  | { status: "void" }
  | { status: "pending" }
  | { status: "resolved"; data: ResourceData }
  | { status: "rejected"; error: unknown };

export function useQuery<Data>(
  url: string,
  schema: z.Schema<Data>
): Resource<Data> {
  const [resource, setResource] = useState<Resource<Data>>({ status: "void" });

  useEffect(() => {
    let cancelled = false;
    setResource({ status: "pending" });
    Ky.get(url)
      .json()
      .then((data) => {
        if (cancelled) {
          return;
        }
        const result = schema.parse(data);
        setResource({ status: "resolved", data: result });
      })
      .catch((err) => {
        setResource({ status: "rejected", error: err });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return resource;
}
