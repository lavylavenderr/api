FROM node:22-alpine
WORKDIR /usr/app/prod

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile
COPY . .

RUN pnpm run start
ENV NODE_ENV=production
