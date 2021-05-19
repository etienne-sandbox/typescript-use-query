import React from "react";
import * as z from "zod";
import { Resource } from "./useQuery";

type Props<T> = {
  resource: Resource<T>;
  handleResolved: (data: T) => JSX.Element | null;
  handlePending?: () => JSX.Element | null;
  handleRejected?: (error: unknown) => JSX.Element | null;
};

export function ResourceHandler<T>({
  resource,
  handleResolved,
  handlePending,
  handleRejected,
}: Props<T>): JSX.Element | null {
  if (resource.status === "resolved") {
    return handleResolved(resource.data);
  }
  if (resource.status === "pending") {
    if (handlePending) {
      return handlePending();
    }
    return <p>Loading...</p>;
  }
  if (resource.status === "rejected") {
    if (handleRejected) {
      return handleRejected(resource.error);
    }
    if (resource.error instanceof z.ZodError) {
      return <p>Validation Error: {resource.error.message}</p>;
    }
    return <p>Oops !</p>;
  }
  return null;
}
