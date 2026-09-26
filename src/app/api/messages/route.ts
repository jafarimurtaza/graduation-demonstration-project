import {
  isValidSlug,
  MAX_MESSAGE_LENGTH,
  sanitizeMessage,
  sanitizeName,
} from "@/lib/sanitize";
import { NextResponse } from "next/server";

type MessageBody = {
  message: string;
  sender_name: string;
  is_anonymous: boolean;
  graduate: string;
};

// Proxies messages to the upstream API so its URL stays server-side.
// Upstream error details are logged here and never forwarded to the browser.
export async function POST(request: Request) {
  const endpoint = process.env.API_URL;

  if (!endpoint) {
    console.error("API_URL is not configured");
    return NextResponse.json(
      { error: "Service unavailable. Please try again later." },
      { status: 500 },
    );
  }

  let body: Partial<MessageBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    typeof body.message === "string" &&
    body.message.length > MAX_MESSAGE_LENGTH * 2
  ) {
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 400 },
    );
  }

  const isAnonymous = body.is_anonymous === true;
  const message = sanitizeMessage(body.message);
  const senderName = isAnonymous ? "Anonymous" : sanitizeName(body.sender_name);

  if (!message || !senderName) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidSlug(body.graduate)) {
    return NextResponse.json({ error: "Unknown graduate." }, { status: 400 });
  }
  const graduate = body.graduate;

  try {
    const response = await fetch(`${endpoint}/api/graduation-messages/public`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sender_name: senderName,
        is_anonymous: isAnonymous,
        graduate,
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error(
        `Upstream message POST failed: ${response.status}`,
        details,
      );
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Upstream message POST request failed:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 502 },
    );
  }
}
