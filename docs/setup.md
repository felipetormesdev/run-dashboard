# 🛠️ Setup do Projeto Run Dashboard

Este guia descreve como configurar o ambiente local e integrar com a API do Strava.

---

## 📦 Pré-requisitos

- [Node.js 20+](https://nodejs.org/) (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- [Docker](https://www.docker.com/) (para rodar Postgres local) **ou** conta no [Supabase](https://supabase.com/)
- Conta de desenvolvedor no [Strava Developers](https://developers.strava.com/)

---

## 🔧 Instalação

Clone o repositório e entre na pasta:

```bash
git clone git@github.com:SEUUSER/run-dashboard.git
cd run-dashboard
```

Instale dependências:

```bash
npm install
```
## ⚙️ Variáveis de ambiente
Copie o arquivo de exemplo e configure:

```bash
cp .env.local.example .env.local
```
Exemplo (.env.local)
```bash
# ===================================
# Strava API
# ===================================
STRAVA_BASE_URL=https://www.strava.com/api/v3
STRAVA_CLIENT_ID=SEU_CLIENT_ID
STRAVA_CLIENT_SECRET=SEU_CLIENT_SECRET
STRAVA_REDIRECT_URI=http://localhost:3000/api/auth/strava/callback
STRAVA_AUTH_CODE=coloque_o_code_aqui (temporário, só para gerar token)

# ===================================
# Garmin API (placeholder)
# ===================================
GARMIN_API_KEY=seu_api_key_garmin

# ===================================
# Coros API (placeholder)
# ===================================
COROS_API_KEY=seu_api_key_coros
```

## 🏃 Configuração da API do Strava

1. Acesse [Strava Developers - My API Application](https://www.strava.com/settings/api).

2. Crie um novo app e configure os campos:

   - **Application Name**: `Run Dashboard`  
   - **Category**: `Other`  
   - **Authorization Callback Domain**: `localhost`  
   - **Website**: `http://localhost:3000`

3. Copie as credenciais geradas para o `.env.local`:

   ```bash
   STRAVA_CLIENT_ID=SEU_CLIENT_ID
   STRAVA_CLIENT_SECRET=SEU_CLIENT_SECRET
   STRAVA_REDIRECT_URI=http://localhost:3000/api/auth/strava/callback
   ```

## 🔑 Gerando o Auth Code do Strava

1. Monte a seguinte URL substituindo `SEU_CLIENT_ID` e `SEU_REDIRECT_URI`:

```bash
https://www.strava.com/oauth/authorize?client_id=SEU_CLIENT_ID&response_type=code&redirect_uri=SEU_REDIRECT_URI&scope=activity:read_all
```

Exemplo usando os valores do `.env.local`:

```bash
https://www.strava.com/oauth/authorize?client_id=176131&response_type=code&redirect_uri=http://localhost:3000/api/auth/strava/callback&scope=activity:read_all
```

2. Acesse a URL no navegador e autorize o app no Strava.

3. Após o redirecionamento, copie o valor do parâmetro `code` da URL.  
Esse será o seu **Auth Code**.

Exemplo de URL retornada:

```bash
http://localhost:3000/api/auth/strava/callback?state=&code=1234567890abcdef&scope=read,activity:read_all
```
Nesse caso: `STRAVA_AUTH_CODE=1234567890abcdef` adicione no seu `.env.local`.

## 🔐 Gerando o Token de Acesso

Com o **Auth Code** em mãos, você pode rodar o script para gerar o token de acesso:

```bash
npx tsx scripts/get-strava-token.ts
```
Se as variáveis de ambiente estiverem corretas (`STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REDIRECT_URI`, `STRAVA_AUTH_CODE`), o script irá:

1. Enviar a requisição para o Strava.

2. Retornar no terminal algo como:

```bash
✅ Token de acesso obtido com sucesso:
access_token: xxx
refresh_token: yyy
expires_at: zzz
```
3. Copie o access_token retornado e salve no seu .env.local:

```bash
STRAVA_ACCESS_TOKEN=xxx
STRAVA_REFRESH_TOKEN=yyy
STRAVA_EXPIRES_AT=zzz
```

## 🏃 Rodando o Projeto
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O projeto ficará disponível em:

👉 http://localhost:3000

## 🧪 Testando a Integração com Strava

Antes de prosseguir com integrações mais complexas, você pode verificar se a rota da API está funcionando corretamente.

1. Inicie o servidor local:
```bash
npm run dev
```
2. Acesse a rota de health check no navegador ou via curl:
```bash
http://localhost:3000/api/strava/health
```
3. Você deve receber uma resposta como esta:
```bash
{
  "status": "ok",
  "message": "Strava API route is up 🚀",
  "timestamp": "2025-09-08T18:45:00.123Z"
}
```
Se essa resposta aparecer, significa que a rota da API está ativa e o projeto está pronto para continuar o desenvolvimento.