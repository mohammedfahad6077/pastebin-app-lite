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
    expiresAt: ttl_seconds ? now + ttl_seconds * 1000 : null,
    maxViews: max_views ?? null,
    viewsUsed: 0,
  };

  await redis.set(`paste:${id}`, paste);

  return NextResponse.json({
    id,
    url: `http://localhost:3000/p/${id}`,
  });
}



