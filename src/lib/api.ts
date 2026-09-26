// Client-safe API helpers. Requests go through the Next.js proxy route
// (/api/messages) so the upstream API URL is never exposed to the browser.

export type Graduate = {
  name: string;
  slug: string;
};

type PostGraduatesPayload = {
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
    const data = await response.json().catch(() => null);
    throw new Error(
      typeof data?.error === "string"
        ? data.error
        : "Failed to send message. Please try again.",
    );
  }

  return response.json();
}
