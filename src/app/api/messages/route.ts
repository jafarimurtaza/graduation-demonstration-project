import { NextResponse } from "next/server";

type MessageBody = {
  message: string;
  sender_name: string;
  is_anonymous: boolean;
  graduate: string;
};

export async function POST(request: Request) {
  const endpoint = process.env.API_URL;

  if (!endpoint) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  let body: MessageBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.message || !body.sender_name || !body.graduate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${endpoint}/api/graduation-messages/public`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: data ?? "Upstream error" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 502 },
    );
  }
}