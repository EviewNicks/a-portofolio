The Netlify deploy errored, with the following guidance provided:

- Relevant log lines
  - Next.js started prerendering and then failed: [line 65](#L65) and [line 69](#L69).
  - Prisma raised a known request error during the page build: [line 70](#L70) and [line 71](#L71).
  - The concrete error: "Can't reach database server at base" is shown in [line 72](#L72).
  - Build exits because export/prerender of "/" failed: [line 96](#L96) and the build command failed: [lines 99-107](#L99-L107).

Diagnosis
- Error type: Prisma Client runtime error (PrismaClientKnownRequestError P1001 / DatabaseNotReachable) occurring during Next.js prerender/build.
- Cause: During static prerendering of "/", your code calls Prisma (prisma.project.findMany()) at build time but the build environment cannot connect to the database. The message "Can't reach database server at base" implies the connection string is missing, invalid, or points to an unreachable host (possibly the value "base" or a local DB that Netlify cannot access).

Solution — choose one of these depending on your intent

Option A — If you intend to query a real DB during the build (SSG)
1. Verify your database connection string is present and correct:
   - Confirm you committed no secret values to the repo and that the real connection string is set in Netlify site environment variables (Site settings → Build & deploy → Environment → Environment variables).
   - Ensure the env var name your code uses (commonly DATABASE_URL) matches exactly.
   - If you accidentally set DATABASE_URL to the literal string "base" or a dev/local value, replace it with the real production connection string.
2. Make sure your DB provider accepts connections from Netlify (or use a managed provider like PlanetScale/Supabase that supports remote/ephemeral connections).
3. Re-run the build. The Prisma call at build time will succeed if Netlify can reach the DB.

Option B — If you do NOT want the build to require a DB connection (recommended for many Netlify deployments)
A. For pages using the app router (app/page.tsx):
- Make the page render at runtime (disable static prerendering) so the DB query runs on each request rather than during the build. Add at the top of app/page.tsx:
```ts
export const dynamic = 'force-dynamic';
```
This prevents Next from prerendering the page at build time (so no DB call occurs during build).

B. For pages using getStaticProps (pages router):
- Convert getStaticProps to getServerSideProps so the DB call happens on request-time:
```js
export async function getServerSideProps() {
  // server-side at request time, not at build
  const projects = await prisma.project.findMany();
  return { props: { projects } };
}
```
-or- guard the build by returning fallback data if DATABASE_URL is missing:
```js
export async function getStaticProps() {
  if (!process.env.DATABASE_URL) {
    return { props: { projects: [] } }; // fallback for build
  }
  const projects = await prisma.project.findMany();
  return { props: { projects }, revalidate: 60 };
}
```

Option C — Defensive code (applies to both routers)
- Surround Prisma calls with try/catch and return sensible fallbacks so a missing/unreachable DB doesn't break the build:
```ts
try {
  const projects = await prisma.project.findMany();
  return { props: { projects } };
} catch (err) {
  console.error('DB error during build:', err);
  return { props: { projects: [] } };
}
```

Extra checks
- If you choose Option A (connect at build), ensure the environment variable name in Netlify matches what your code reads (e.g., DATABASE_URL). If you need to change Node versions for any reason, see Netlify docs for changing Node versions: https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript

Summary
- The build fails because a Prisma query runs during Next.js prerender and cannot reach the database ([lines 69–72](#L69-L72)). Either provide a reachable DATABASE_URL in Netlify build environment or change the page to avoid build-time DB access (use runtime rendering / dynamic export / server-side props or add fallback/try-catch around the DB call).

The relevant error logs are:

Line 0: build-image version: a0bc76c99cbadd99a168cf193f4d4df9fa7ee94a (noble-new-builds)
Line 1: buildbot version: dfcdb146c5cc0789499b31e62a97f76c0fc65ede
Line 2: Fetching cached dependencies
Line 3: Failed to fetch cache, continuing with build
Line 4: Starting to prepare the repo for build
Line 5: No cached dependencies found. Cloning fresh repo
Line 6: git clone --filter=blob:none https://github.com/EviewNicks/a-portofolio
Line 7: Preparing Git Reference pull/4/head
Line 8: Installing dependencies
Line 9: mise [36m~/.config/mise/config.toml[0m tools: [34mpython[0m@3.14.3
Line 10: mise [36m~/.config/mise/config.toml[0m tools: [34mruby[0m@3.4.8
Line 11: mise [36m~/.config/mise/config.toml[0m tools: [34mgo[0m@1.26.1
Line 12: v22.22.1 is already installed.
Line 13: Now using node v22.22.1 (npm v10.9.4)
Line 59: [33m[1m⚠[22m[39m No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/doc
Line 60: [1m[38;2;173;127;168m▲ Next.js 16.2.0[39m[22m (Turbopack)
Line 61: [37m[1m [22m[39m Creating an optimized production build ...
Line 62: [32m[1m✓[22m[39m Compiled successfully in 7.9s
Line 63: [37m[1m [22m[39m Running TypeScript ...
Line 64: [37m[1m [22m[39m Finished TypeScript in 7.4s ...
Line 65: [37m[1m [22m[39m Collecting page data using 2 workers ...
Line 66: [37m[1m [22m[39m Generating static pages using 2 workers (0/16) ...
Line 67: [37m[1m [22m[39m Generating static pages using 2 workers (4/16)
Line 68: [37m[1m [22m[39m Generating static pages using 2 workers (8/16)
Line 69: Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
Line 70: Error [PrismaClientKnownRequestError]:
Line 71: Invalid `prisma.project.findMany()` invocation:
Line 72: Can't reach database server at base
    at fk.handleRequestError (.next/server/chunks/ssr/_0lq2q3n._.js:62:7990)
Line 73:     at fk.handleAndLogRequestError (.next/server/chunks/ssr/_0lq2q3n._.js:62:7002)
Line 74:     at fk.request (.next/server/chunks/ssr/_0lq2q3n._.js:62:6709)
Line 75:     at async e (.next/server/chunks/ssr/_0lq2q3n._.js:72:7253)
Line 76:     at async k (.next/server/chunks/ssr/_0xm8dv0._.js:1:17102) {
Line 77:   code: [32m'P1001'[39m,
Line 78:   meta: {
Line 79:     modelName: [32m'Project'[39m,
Line 80:     driverAdapterError: Error [DriverAdapterError]: DatabaseNotReachable
Line 81:         at F.onError (.next/server/chunks/ssr/_0lq2q3n._.js:1:19793)
Line 82:         at F.performIO (.next/server/chunks/ssr/_0lq2q3n._.js:1:19734)
Line 83:         at async F.queryRaw (.next/server/chunks/ssr/_0lq2q3n._.js:1:16369)
Line 84:         at async a.interpretNode (.next/server/chunks/ssr/_0lq2q3n._.js:7:35102)
Line 85:         at async a.interpretNode (.next/server/chunks/ssr/_0lq2q3n._.js:7:37645)
Line 86:         at async a.run (.next/server/chunks/ssr/_0lq2q3n._.js:7:33820)
Line 87:         at async a.execute (.next/server/chunks/ssr/_0lq2q3n._.js:7:54647)
Line 88:         at async eQ.request (.next/server/chunks/ssr/_0lq2q3n._.js:8:2500)
Line 89:         at async Object.singleLoader (.next/server/chunks/ssr/_0lq2q3n._.js:62:5996) {
Line 90:       [cause]: [36m[Object][39m
Line 91:     }
Line 92:   },
Line 93:   clientVersion: [32m'7.5.0'[39m,
Line 94:   digest: [32m'2428348836'[39m
Line 95: }
Line 96: Export encountered an error on /page: /, exiting the build.
Line 97: [31m[1m⨯[22m[39m Next.js build worker exited with code: 1 and signal: null
Line 98: [91m[1m​[22m[39m
Line 99: [91m[1m"build.command" failed                                        [22m[39m
Line 100: [91m[1m────────────────────────────────────────────────────────────────[22m[39m
Line 101: ​
Line 102:   [31m[1mError message[22m[39m
Line 103:   Command failed with exit code 1: npm run build
Line 104: ​
Line 105:   [31m[1mError location[22m[39m
Line 106:   In Build command from Netlify app:
Line 107:   npm run build
Line 108: ​
Line 109:   [31m[1mResolved config[22m[39m
Line 110:   build:
Line 111:     command: npm run build
Line 112:     commandOrigin: ui
Line 113:     environment:
Line 114:       - REVIEW_ID
Line 115:     publish: /opt/build/repo/.next
Line 116:     publishOrigin: ui
Line 117:   plugins:
Line 118:     - inputs: {}
Line 119:       origin: ui
Line 120:       package: "@netlify/plugin-nextjs"
Line 121: Build failed due to a user error: Build script returned non-zero exit code: 2
Line 122: Failing build: Failed to build site
Line 123: Failed during stage 'building site': Build script returned non-zero exit code: 2
Line 124: Finished processing build request in 42.455s