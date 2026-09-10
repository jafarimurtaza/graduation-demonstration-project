import { NextResponse } from "next/server";

type MessageBody = {
    message: string;
    sender_name: string;
    is_anonymous: boolean;
    graduate: string;
};

export async function POST(request: Request) {
    const upstreamUrl = process.env.START_URL || process.env.NEXT_PUBLIC_START_URL;
    if (!upstreamUrl) {
        return NextResponse.json({ error: "Server misconfigured: START_URL is not set" }, { status: 500 });
    }

    let body: MessageBody;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const trimmedMessage = body?.message?.trim();
    const senderName = typeof body?.sender_name === "string" ? body.sender_name.trim() : "";
    const isAnonymous = Boolean(body?.is_anonymous);

    if (!trimmedMessage || !body?.graduate || (!isAnonymous && !senderName)) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedBody = {
        ...body,
        message: trimmedMessage,
        sender_name: isAnonymous ? "Anonymous" : senderName,
    };

    try {
        const res = await fetch(upstreamUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(normalizedBody),
            signal: AbortSignal.timeout(10_000),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            return NextResponse.json({ error: data ?? "Upstream error" }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Upstream request failed" }, { status: 502 });
    }
}