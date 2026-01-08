// app/api/pastes/route.js
// this is used for post request
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getNow } from "@/lib/time";

export async function POST(request) {
  const { content, ttl_seconds, max_views } = await request.json();

  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const now = getNow(request);

  const paste = {
    id,
    content,
    createdAt: now,
    expiresAt: typeof ttl_seconds === "number" && Number.isFinite(ttl_seconds) && ttl_seconds > 0 ? now + ttl_seconds * 1000 : null,
    maxViews: typeof max_views === "number" && Number.isFinite(max_views) && max_views > 0 ? max_views : null,
    viewsUsed: 0,
  };

  await redis.set(`paste:${id}`, JSON.stringify(paste));

  return NextResponse.json({
    id
  });
}



