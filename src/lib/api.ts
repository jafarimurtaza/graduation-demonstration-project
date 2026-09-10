export type Graduate = {
  name: string;
  slug: string;
};

type GraduateApiResponse = {
  data: Graduate[];
};

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

export type PostGraduatesPayload = {
  message: string;
  sender_name: string;
  is_anonymous: boolean;
  graduate: string;
};

export async function postGraduates({
  payload,
}: {
  payload: PostGraduatesPayload;
}) {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to post graduate message: ${response.status}`);
  }

  return response.json();
}
