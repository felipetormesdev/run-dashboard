import { NextResponse } from "next/server";
import { config } from "@/lib/config";

async function fetchActivities(token: string) {
  const res = await fetch(`${config.strava.baseUrl}/athlete/activities?per_page=10`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw new Error("Token expirado");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ao buscar atividades: ${res.status} - ${text}`);
  }

  return res.json();
}

export async function GET() {
  try {
    let token = config.strava.accessToken;
    if (!token) {
      return NextResponse.json({ error: "STRAVA_ACCESS_TOKEN não configurado" }, { status: 500 });
    }

    try {
      const activities = await fetchActivities(token);
      return NextResponse.json({ activities });
    } catch (err: any) {
      if (err.message === "Token expirado") {
        const refreshRes = await fetch("http://localhost:3000/api/strava/refresh");
        const refreshData = await refreshRes.json();

        if (!refreshRes.ok) throw new Error(`Erro ao renovar token: ${JSON.stringify(refreshData)}`);

        token = refreshData.access_token as string;
        const activities = await fetchActivities(token);

        return NextResponse.json({ message: "Token renovado automaticamente", activities });
      }
      throw err;
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro desconhecido" }, { status: 500 });
  }
}
