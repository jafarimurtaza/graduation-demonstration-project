import { NextResponse } from "next/server";

type MessageBody = {
    message: string;
    sender_name: string;
    is_anonymous: boolean;
    graduate: string;
};

export async function POST(request: Request) {
    const upstreamUrl = process.env.START_URL;
    if (!upstreamUrl) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    let body: MessageBody;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body?.message || !body?.sender_name || !body?.graduate) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const res = await fetch(upstreamUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
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