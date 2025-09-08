// src/app/api/strava/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Strava API route is up 🚀",
    timestamp: new Date().toISOString(),
  });
}
