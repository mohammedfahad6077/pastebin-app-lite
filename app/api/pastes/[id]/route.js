import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getNow } from "@/lib/time"

export async function GET(request, { params }) {
  const { id } = await params;

  const paste= await redis.get(`paste:${id}`);

  


  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  
  paste.expiresAt = paste.expiresAt !== null ? Number(paste.expiresAt) : null;
  paste.maxViews = paste.maxViews !== null ? Number(paste.maxViews) : null;
  paste.viewsUsed = Number(paste.viewsUsed ?? 0)
  
  const now = getNow(request);

  /*
  console.log({
  now,
  expiresAt: paste.expiresAt,
  maxViews: paste.maxViews,
  types: {
    now: typeof now,
    expiresAt: typeof paste.expiresAt,
    maxViews: typeof paste.maxViews,
    viewsUsed: typeof paste.viewsUsed,
  },
  });
  */

  // TTL check
  // changed now
  if (paste.expiresAt !== null && now >= paste.expiresAt) {
    await redis.del(`paste:${id}`);
    return NextResponse.json({ error: "Expired" }, { status: 404 });
  }

  
  
  // we have to increment the count first the check for validity
  if (paste.maxViews !== null && paste.viewsUsed >= paste.maxViews) {
    await redis.del(`paste:${id}`);
    return NextResponse.json({ error: "View limit exceeded" }, { status: 404 });
  }
  // View limit check
  paste.viewsUsed += 1;

  
  await redis.set(`paste:${id}`, JSON.stringify(paste));

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.viewsUsed,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
}
