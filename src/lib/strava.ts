import { config } from "./config";

export async function fetchStravaAthlete(accessToken: string) {
  const res = await fetch(`${config.strava.baseUrl}/athlete`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar dados do atleta no Strava");
  }

  return res.json();
}

export async function fetchStravaActivities(accessToken: string, perPage = 10) {
  const res = await fetch(
    `${config.strava.baseUrl}/athlete/activities?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar atividades no Strava");
  }

  return res.json();
}
