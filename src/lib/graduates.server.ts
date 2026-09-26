import "server-only";

import type { Graduate } from "./api";

type GraduateApiResponse = {
  data: Graduate[];
};

// Runs only on the server so API_URL never reaches the browser bundle.
export async function getGraduates(): Promise<Graduate[]> {
  const response = await fetch(
    `${process.env.API_URL}/api/graduate-profiles/public?page=1&pageSize=30`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch graduates: ${response.status}`);
  }

  const result: GraduateApiResponse = await response.json();

  return result.data.map((graduate) => ({
    name: graduate.name,
    slug: graduate.slug,
  }));
}
