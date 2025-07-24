import { cache } from "react";

type URL = string;

export default async function getData<T = unknown>(url: URL): Promise<T> {
  const res: Response = await fetch(url);

  if (!res.ok) {
    if (res.status === 403 && res.statusText.toLowerCase().includes("quota")) {
      throw new Error(
        "We've reached the API's usage limit. Live stats will be back soon—please try again later.",
      );
    }

    throw new Error(`${res.status}, ${res.statusText}`);
  }

  return res.json();
}

export const getCachedData = cache(async function getCachedData<T = unknown>(
  url: URL,
): Promise<T> {
  const res: Response = await fetch(url);

  if (!res.ok) {
    if (res.status === 403 && res.statusText.toLowerCase().includes("quota")) {
      throw new Error(
        "We've reached the API's usage limit. Live stats will be back soon—please try again later.",
      );
    }

    throw new Error(`${res.status}, ${res.statusText}`);
  }

  return res.json();
});
