# VALORANT Player Tracker

A responsive VALORANT-inspired player dashboard built with Next.js. This first release is a demo-mode frontend with sample profiles, competitive summary cards, match history, agent performance, and map statistics.

## Current scope

- Search field for Riot ID-style player names
- Demo player profile and competitive rank presentation
- Win rate, K/D, headshot rate, and ACS summary cards
- Recent match list with victory/defeat filters
- Agent and map performance views
- Responsive layout for desktop and mobile

## Data status

The included statistics are illustrative sample data. This repository does not currently authenticate Riot accounts or connect to Riot/Tencent private APIs. Live player lookup requires a supported, authorized data source and should not be represented as real match records until integrated.

## Run locally

Requirements: Node.js 20.9 or newer.

    npm install
    npm run dev

Open http://localhost:3000.

## Deploy on Railway

1. Create a Railway project.
2. Add a service from this GitHub repository, using the main branch.
3. Railway should detect Next.js automatically with Railpack.
4. Generate a public domain for the service.

Build command: npm run build  
Start command: npm start

No database or secrets are required for the demo release.
