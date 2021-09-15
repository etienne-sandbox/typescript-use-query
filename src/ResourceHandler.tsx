import React, { Fragment } from "react";
import { Resource } from "./useResource";

type Props<Data> = {
  resource: Resource<Data>;
  renderResolved: (data: Data) => React.ReactNode | null;
};

export function ResourceHandler<Data>({
  resource,
  renderResolved,
}: Props<Data>): JSX.Element | null {
  if (resource.status === "rejected") {
    return <p>oops error</p>;
  }
  if (resource.status === "parsing-error") {
    return <p>Invalid API response</p>;
  }
  if (resource.status === "resolved") {
    return <Fragment>{renderResolved(resource.data)}</Fragment>;
  }
  return <p>Loading...</p>;
}
