# Pastebin App Lite

## 📄 Project Description

Pastebin App Lite is a lightweight web application built with Next.js that allows users to create and share text snippets (pastes) via a unique URL.
Each paste can optionally have a time-to-live (TTL) and/or a maximum view limit, after which the paste becomes unavailable.

## 🚀 Run the Project Locally
1. Clone the repository

```bash
git clone <repository-url>
cd pastebin-app-lite
```
2. Install dependencies

```bash
npm install
```
3. Create environment variables

Create a file named .env.local in the project root and add:
```bash
UPSTASH_REDIS_REST_URL=<your_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_rest_token>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
TEST_MODE=0
```
4. Start the development server
```bash
npm run dev
```
Open the app in your browser at:
http://localhost:3000

# 🗄️ Persistence Layer

This project uses Upstash Redis as the persistence layer.

Paste data is stored as JSON objects in Redis

Each paste is keyed using a unique identifier

Redis enables fast reads/writes and supports TTL-based expiry

View limits and expiration logic are enforced at request time

# 📁 Repository Contents

This repository contains:

Next.js application source code

API routes for paste creation and retrieval

UI pages for creating and viewing pastes

No build artifacts are committed.




Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
