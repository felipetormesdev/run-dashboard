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
      baseUrl: getEnvVar("STRAVA_BASE_URL"),
      clientId: getEnvVar("STRAVA_CLIENT_ID"),
      clientSecret: getEnvVar("STRAVA_CLIENT_SECRET"),
      redirectUri: getEnvVar("STRAVA_REDIRECT_URI"),
      accessToken: process.env.STRAVA_ACCESS_TOKEN || "", // opcional
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
  