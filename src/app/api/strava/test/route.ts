import { NextResponse } from "next/server";
import { fetchStravaAthlete } from "@/lib/strava";
import { config } from "@/lib/config";

export async function GET() {
  try {
    if (!config.strava.accessToken) {
      return NextResponse.json(
        { error: "Access token do Strava não configurado" },
        { status: 400 }
      );
    }

    const athlete = await fetchStravaAthlete(config.strava.accessToken);
    return NextResponse.json(athlete);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro inesperado" },
      { status: 500 }
    );
  }
}
