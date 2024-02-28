import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";
// const fetcher = (URL) => fetch(URL).then((res) => res.json());

const fetcher = async (url) => {
  const res = await fetch(URL);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ISSTracker() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    URL,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  if (error) return <h1>Loading failed...</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />

      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onRefresh={() => mutate()}
      />

      <p>Loading: {isValidating ? "true" : "false"}</p>

      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </main>
  );
}
