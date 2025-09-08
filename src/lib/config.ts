/**
 * Centraliza todas as variáveis de ambiente do projeto.
 * Assim, evita repetição de process.env espalhado pelo código.
 */

function getEnvVar(key: string, required = true): string {
    const value = process.env[key];
    if (!value && required) {
      throw new Error(`Variável de ambiente obrigatória não encontrada: ${key}`);
    }
    return value || "";
  }
  
  export const config = {
    // Strava
    strava: {
      baseUrl: process.env.STRAVA_BASE_URL || "https://www.strava.com/api/v3",
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      redirectUri: process.env.STRAVA_REDIRECT_URI,
      accessToken: process.env.STRAVA_ACCESS_TOKEN,
      refreshToken: process.env.STRAVA_REFRESH_TOKEN,
    },
  
    // Garmin (placeholder)
    garmin: {
      apiKey: process.env.GARMIN_API_KEY || "",
    },
  
    // Coros (placeholder)
    coros: {
      apiKey: process.env.COROS_API_KEY || "",
    },
  };
  