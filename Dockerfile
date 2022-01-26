FROM node:14-alpine

RUN apk --no-cache add curl

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN NODE_ENV=development npm install

# Build app
COPY . /usr/src/app/

ARG NEXT_PUBLIC_SHOW_CONTROL_PANEL=1

ENV NEXT_TELEMETRY_DISABLED="1"
ENV TZ="Europe/Amsterdam"
ENV NODE_ENV production
ENV NEXT_PUBLIC_SHOW_CONTROL_PANEL=$NEXT_PUBLIC_SHOW_CONTROL_PANEL

RUN npm run lint && npm run test
RUN npm run build && npm prune --production

HEALTHCHECK --timeout=1s --start-period=5s \
  CMD curl -f http://localhost:3000 || exit 1

EXPOSE 3000

CMD npm run start
