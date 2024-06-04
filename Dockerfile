FROM node:20-bullseye-slim as base

ENV NODE_ENV production

FROM base as deps

WORKDIR /remixapp

ADD package.json package-lock.json ./
RUN npm install --include=dev

FROM base as production-deps

WORKDIR /remixapp

COPY --from=deps /remixapp/node_modules /remixapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev

FROM base as build

WORKDIR /remixapp

COPY --from=deps /remixapp/node_modules /remixapp/node_modules
ADD package.json package-lock.json postcss.config.js tailwind.config.cjs tsconfig.json vite.config.ts ./
ADD app/ app/
ADD public/ public/
ADD migrations/ migrations/

RUN npm run build

FROM base

WORKDIR /remixapp

COPY --from=production-deps /remixapp/node_modules /remixapp/node_modules
COPY --from=build /remixapp/build /remixapp/build
COPY --from=build /remixapp/package.json /remixapp/package.json
COPY --from=build /remixapp/migrations /remixapp/migrations

ADD server.js ./

CMD ["npm", "start"]