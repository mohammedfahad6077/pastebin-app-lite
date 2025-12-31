import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getNow } from "@/lib/time"

export async function GET(request, { params }) {
  const { id } = await params;

  const paste = await redis.get(`paste:${id}`);

  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 
  const now = getNow(request);

  // TTL check
  if (paste.expiresAt && now > paste.expiresAt) {
    await redis.del(`paste:${id}`);
    return NextResponse.json({ error: "Expired" }, { status: 404 });
  }

  // View limit check
  paste.viewsUsed += 1;
  // we have to increment the count first the check for validity
  if (paste.maxViews !== null && paste.viewsUsed > paste.maxViews) {
    
    return NextResponse.json({ error: "View limit exceeded" }, { status: 404 });
  }

  
  await redis.set(`paste:${id}`, paste);

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.viewsUsed,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
}
