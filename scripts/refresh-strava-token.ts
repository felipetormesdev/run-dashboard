import fs from "fs"
import path from "path"
import fetch from "node-fetch"

// 🚀 Carregando o .env.local manualmente
const envPath = path.resolve(process.cwd(), ".env.local")
const rawEnv = fs.readFileSync(envPath, "utf-8")

const env: Record<string, string> = {}
for (const line of rawEnv.split("\n")) {
  if (line.trim() && !line.startsWith("#")) {
    const [key, ...value] = line.split("=")
    env[key.trim()] = value.join("=").trim()
  }
}

// Debug para confirmar valores
console.log("Debug ENV (raw read):", {
  clientId: env.STRAVA_CLIENT_ID,
  clientSecret: env.STRAVA_CLIENT_SECRET,
  refreshToken: env.STRAVA_REFRESH_TOKEN,
})

async function refreshStravaToken() {
    const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, STRAVA_REFRESH_TOKEN } = env

    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REDIRECT_URI || !STRAVA_REFRESH_TOKEN) {
      throw new Error("❌ Variáveis obrigatórias ausentes no .env.local")
    }

  try {
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: STRAVA_REFRESH_TOKEN,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro ao atualizar token: ${response.status} ${response.statusText} - ${JSON.stringify(data)}`);
    }

    // Type guard to ensure 'data' is an object with expected properties
    if (
      typeof data === "object" &&
      data !== null &&
      "access_token" in data &&
      "refresh_token" in data &&
      "expires_at" in data &&
      typeof (data as any).access_token === "string" &&
      typeof (data as any).refresh_token === "string" &&
      typeof (data as any).expires_at === "number"
    ) {
      console.log("✅ Novo token de acesso gerado com sucesso:");
      console.log("access_token:", (data as any).access_token);
      console.log("refresh_token:", (data as any).refresh_token);
      console.log("expires_at:", new Date((data as any).expires_at * 1000).toISOString());
    } else {
      throw new Error("Resposta inesperada da API do Strava: " + JSON.stringify(data));
    }

  } catch (error) {
    console.error("❌ Erro ao atualizar token:", error);
  }
}

refreshStravaToken();
