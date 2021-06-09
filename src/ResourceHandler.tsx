import { Resource } from "./useQuery";
import React from "react";

type Props<Data> = {
  resource: Resource<Data>;
  renderResolved: (data: Data) => JSX.Element | null;
  renderPending?: () => JSX.Element | null;
  renderRejected?: (error: unknown) => JSX.Element | null;
};

export function ResourceHandler<Data>({
  resource,
  renderResolved,
  renderPending,
  renderRejected,
}: Props<Data>): JSX.Element | null {
  if (resource.status === "void") {
    return null;
  }
  if (resource.status === "rejected") {
    if (renderRejected) {
      return renderRejected(resource.error);
    }
    return <p>Error</p>;
  }
  if (resource.status === "pending") {
    if (renderPending) {
      return renderPending();
    }
    return <p>Loading...</p>;
  }
  if (resource.status === "resolved") {
    return renderResolved(resource.data);
  }
  return null;
}
