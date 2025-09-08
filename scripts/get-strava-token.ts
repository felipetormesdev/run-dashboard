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
  redirectUri: env.STRAVA_REDIRECT_URI,
  authCode: env.STRAVA_AUTH_CODE,
})

async function getStravaToken() {
  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, STRAVA_AUTH_CODE } = env

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REDIRECT_URI || !STRAVA_AUTH_CODE) {
    throw new Error("❌ Variáveis obrigatórias ausentes no .env.local")
  }

  const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code: STRAVA_AUTH_CODE,
      grant_type: "authorization_code",
      redirect_uri: STRAVA_REDIRECT_URI,
    }),
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Erro ao buscar token: ${tokenResponse.status} ${tokenResponse.statusText} - ${errorText}`)
  }

  const tokenData = await tokenResponse.json()
  console.log("✅ Token recebido com sucesso:")
  console.log(tokenData)
}

getStravaToken().catch((err) => {
  console.error("❌ Erro:", err)
  process.exit(1)
})
