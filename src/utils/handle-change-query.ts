import type { SetURLSearchParams } from "react-router";

export const updateQuery = ({
  key,
  value,
  searchParams,
  setSearchParams,
}: {
  key: string;
  value: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(key, value);
  setSearchParams(newParams);
};
