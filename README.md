# Nexa Ghana Marketplace — Prototype v1

A mobile-first, custom-coded frontend prototype for a Ghana marketplace combining products, jobs and services.

## Run locally

1. Download and unzip the project.
2. Open `index.html` in a modern browser.
3. For installable PWA testing and best results, serve the folder from a local static web server (for example VS Code Live Server or `python -m http.server 8000`) and open the local address on your phone or computer.

No build step or paid service is required for this static prototype.

## What works

- Responsive layout for desktop and mobile.
- Browse sample product, job and service listings.
- Search listings by keyword.
- Filter by listing type and location.
- Open a create-listing form and add a demo listing to the current page.
- Basic installable web-app manifest and icon.

## Important prototype limits

- Sample listings are fictional demonstration content.
- New listings exist only in browser memory and disappear when the page reloads.
- No real registration, login, backend, database, image upload, messaging, payments, moderation dashboard, or secure CV storage is connected.
- Do not use this version to collect real user information or publish real job listings.

## Suggested next development steps

1. Create a Git repository and deploy the static prototype to a preview URL.
2. Create a Supabase project and add schema + row-level security for profiles, products, jobs, services, applications, saved items and reports.
3. Add authentication and persistent listings.
4. Add listing image storage and admin moderation/reporting.
5. Add privacy policy, terms, abuse reporting and account deletion.
6. Test with a small invited group in Ghana.
7. Only then assess a native wrapper or Flutter app and store submission requirements.

## Proposed stack

- Frontend: semantic HTML, CSS, JavaScript for this first prototype.
- Future shared mobile app: React Native with Expo, or a carefully planned PWA-to-mobile path.
- Backend: Supabase (Postgres, Auth, Storage) after security rules are configured.
- Hosting: any static host with HTTPS for this prototype.

This project is a frontend starter, not a production marketplace.
