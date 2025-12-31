import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    // Simple Redis ping (lightweight)
    await redis.ping();

    return NextResponse.json(
      { ok: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}
