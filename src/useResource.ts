import { useEffect, useState } from "react";
import * as z from "zod";

export type Resource<Data> =
  | { status: "void" }
  | { status: "pending" }
  | { status: "resolved"; data: Data }
  | { status: "rejected"; error: any }
  | { status: "parsing-error"; zodError: z.ZodError };

export function useResource<Data>(
  url: string,
  schema: z.Schema<Data>
): Resource<Data> {
  const [resource, setResource] = useState<Resource<Data>>({ status: "void" });

  useEffect(() => {
    setResource({ status: "pending" });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const parsed = schema.parse(data);
        setResource({ status: "resolved", data: parsed });
      })
      .catch((error) => {
        if (error instanceof z.ZodError) {
          setResource({ status: "parsing-error", zodError: error });
          return;
        }
        setResource({ status: "rejected", error });
      });
  }, []);

  return resource;
}
