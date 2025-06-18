import { cache } from "react";

export default async function getData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
}

export const getCachedData = cache(async function getCachedData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
});
