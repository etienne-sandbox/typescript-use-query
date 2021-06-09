import { useState, useEffect } from "react";

type Resource<Data> =
  | { status: "void" }
  | { status: "pending" }
  | { status: "resolved"; data: Data }
  | { status: "rejected"; error: unknown };

export function useQuery<Result>(url: string): Resource<Result> {
  const [resource, setResource] = useState<Resource<Result>>({
    status: "void",
  });

  useEffect(() => {
    setResource({ status: "pending" });
    let canceled = false;
    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Invalid response");
        }
        const data = await response.json();
        if (canceled) {
          return;
        }
        setResource({ status: "resolved", data });
      })
      .catch((err) => {
        setResource({ status: "rejected", error: err });
      });
    return () => {
      canceled = true;
    };
  }, []);

  return resource;
}
