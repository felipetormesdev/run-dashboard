# 🏃 Run Dashboard

Um dashboard interativo para analisar treinos de corrida sincronizados com Strava (MVP).

## 🚀 Tecnologias
- [Next.js](https://nextjs.org/) (TypeScript)
- [TailwindCSS](https://tailwindcss.com/) para estilos
- [Supabase](https://supabase.com/) ou Postgres local para banco
- [direnv](https://direnv.net/) + [nvm](https://github.com/nvm-sh/nvm) para isolamento do ambiente

## 📦 Setup do Ambiente

### Pré-requisitos
- Node.js 20 (via `nvm`)
- Docker (para Postgres local) ou conta no Supabase
- Conta no [Strava Developers](https://developers.strava.com/)

### Instalação
```bash
git clone git@github.com:SEUUSER/run-dashboard.git
cd run-dashboard

# Carregar env automaticamente
cp .env.local.example .env.local
direnv allow

# Inicializar projeto (se ainda não feito)
npx create-next-app@latest . --typescript
