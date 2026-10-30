# TOLI Traditional Website

Independent project extracted from the approved TOLI codebase. No sibling project is required.

## Local use

Run `npm ci`, then `npm run dev`.
Open http://127.0.0.1:8190/Toli-2/

Run `npm run build` for `dist/`, then `npm run preview` at http://127.0.0.1:8200/Toli-2/.
Run `npm run typecheck`, `npm test`, and `npm run lint`.

The default Vite base is `/Toli-2/` and routing uses HashRouter. Each project owns its own configuration. For a different hosting subdirectory, change `base` in this project's vite.config.ts and validate asset links. Ordinary builds also accept `npm run build -- --base /your-path/`. The inherited retained-release tooling in the 3D project deliberately validates its default `/Toli-2/` contract; do not change that base for retained packages without migrating and testing the release format.

No `.env`, credentials, node_modules, caches, Git history or deployment workflow was copied. Dependencies are installed independently from this project's lockfile. Optional environment names are listed in `.env.example`; do not put private service keys in Vite variables. The currently approved enquiry flow prepares a WhatsApp draft; it does not need Supabase to run.

## Runtime scope

The root `#/` is the approved traditional website. Experimental showroom routes and controllers are removed. Existing 3D Hero/component/Inside TOLI dependencies are retained because they belong to the traditional site. The official artwork and layout are unchanged; no poster redesign was implemented.

The static project has no showroom release-packaging command. Deployable output is `dist/`; deployment was not performed.
