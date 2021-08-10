import React from "react";
import { Resource } from "./useQuery";

type Props<T> = {
  resource: Resource<T>;
  renderResolved: (data: T) => JSX.Element | null;
  renderRejected?: (error: unknown) => JSX.Element | null;
  renderPending?: () => JSX.Element | null;
};

export function ResourceHandler<T>({
  resource,
  renderRejected,
  renderPending,
  renderResolved,
}: Props<T>): JSX.Element | null {
  if (resource.status === "rejected") {
    if (renderRejected) {
      return renderRejected(resource.error);
    }
    return <p>Error: {String(resource.error)}</p>;
  }
  if (resource.status === "void") {
    return null;
  }
  if (resource.status === "pending") {
    if (renderPending) {
      return renderPending();
    }
    return <p>Loading...</p>;
  }
  if (resource.status == "resolved") {
    return renderResolved(resource.data);
  }
  return expectNever(resource);
}

function expectNever(_val: never): never {
  throw new Error("Unexpected not never");
}
