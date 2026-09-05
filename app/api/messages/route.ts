import { NextResponse } from "next/server";

type MessageRequest = {
	message?: unknown;
	sender_name?: unknown;
	senderName?: unknown;
	is_anonymous?: unknown;
	isAnonymous?: unknown;
	graduate?: unknown;
	graduateDocumentId?: unknown;
};
//checking for bad requests
function badRequest(error: string) {
	return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(request: Request) {
	let body: MessageRequest;
	try {
		body = (await request.json()) as MessageRequest;
	} catch {
		return badRequest("Invalid JSON payload");
	}

	const message = typeof body.message === "string" ? body.message.trim() : "";
	const senderName =
		typeof body.sender_name === "string"
			? body.sender_name.trim()
			: typeof body.senderName === "string"
				? body.senderName.trim()
				: "";
	const isAnonymousValue = body.is_anonymous ?? body.isAnonymous;
	const graduate =
		typeof body.graduate === "string"
			? body.graduate.trim()
			: typeof body.graduateDocumentId === "string"
				? body.graduateDocumentId.trim()
				: "";

	if (!message) {
		return badRequest("Missing or invalid 'message'");
	}

	if (!graduate) {
		return badRequest("Missing or invalid 'graduate'");
	}

	if (typeof isAnonymousValue !== "boolean") {
		return badRequest("Missing or invalid 'is_anonymous' flag (must be boolean)");
	}

	if (!isAnonymousValue && !senderName) {
		return badRequest("Missing or invalid 'sender_name' when 'is_anonymous' is false");
	}

	const baseUrl = (
		process.env.BASE_URL || process.env.STRAPI_URL || "https://admin.afghangeeksedu.org"
	).replace(/\/$/, "");
	const upstreamBaseUrl = baseUrl.replace(/\/api(?:\/messages)?$/, "");
	const strapiToken = process.env.STRAPI_TOKEN || process.env.STRAPI_API_TOKEN;

	if (!strapiToken) {
		return NextResponse.json(
			{
				ok: false,
				error:
					"Server not configured. Add STRAPI_TOKEN or STRAPI_API_TOKEN to the server environment.",
			},
			{ status: 500 }
		);
	}

	const payload = {
		message,
		sender_name: isAnonymousValue ? "" : senderName,
		is_anonymous: isAnonymousValue,
		graduate,
	} as const;

	const url = `${upstreamBaseUrl}/api/graduation-messages/public`;

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${strapiToken}`,
			},
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			return NextResponse.json(
				{ ok: false, error: "Failed to create message upstream" },
				{ status: 502 }
			);
		}

		return NextResponse.json({ ok: true }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ ok: false, error: "Network error while contacting Strapi" },
			{ status: 502 }
		);
	}
}

