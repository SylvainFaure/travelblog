# Travelblog  

This project is in production: http://admin.cartedevoyages.com
Though it's already possible to ask permissions to enter in the admin èart as a `visitor`, the requests will not be accepted before few weeks.

This project is composed in:

- `admin` : a classical (minimal although) blog interface, with authentication and full of CRUD, written in Nuxt.
- `server` : a small server written in NodeJS / ExpressJS  

This project has a `public` part, a minimal frontend written in Gridsome. This public part has been moved to a separate repository and is accessible in production at https://www.cartedevoyages.com


# Development
## Admin interface
The Admin interface is in Nuxt v2 in SPA mode with Tailwind for the styling part.

To start the project, go on the `admin` folder and execute `yarn run dev`.
It will start the Nuxt project which calls directly the production API. 
Ideally there should be a rework of `server/app.js` to serve the Nuxt app AND the local API. This part needs a local SQL database and something to run it (wamp, lamp).

## Server
The server is written in ExpressJS.

To start the server locally, you need Wamp / Lamp installed on your machine and a local SQL database with a dump of actual data.
Then you just have to run `yarn run dev` on the root of the project and the API will respond at `http://localhost:3001/api/*`

In production the server also serve the Admin interface (this part is rotten locally).