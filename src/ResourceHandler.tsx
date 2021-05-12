import React from "react";
import { Resource } from "./useQuery";
import * as z from "zod";
import { HTTPError } from "ky";

type Props<Data> = {
  resource: Resource<Data>;
  handleResolved?: (data: Data) => React.ReactElement | null;
  handleRejected?: (error: unknown) => React.ReactElement | null;
};

export function ResourceHandler<Data>({
  resource,
  handleResolved,
  handleRejected,
}: Props<Data>) {
  switch (resource.status) {
    case "pending": {
      return <p>Loading...</p>;
    }
    case "resolved": {
      if (handleResolved) {
        return handleResolved(resource.data);
      }
      return <p>TODO</p>;
    }
    case "rejected": {
      if (handleRejected) {
        return handleRejected(resource.error);
      }
      if (resource.error instanceof z.ZodError) {
        return <p>Validation Error {resource.error.message}</p>;
      }
      if (resource.error instanceof HTTPError) {
        return (
          <p>
            Http Error: {resource.error.response.status} -{" "}
            {resource.error.message}
          </p>
        );
      }
      return <p>Error</p>;
    }
    default: {
      return null;
    }
  }
}
