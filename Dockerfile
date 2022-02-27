FROM node:16.13-alpine3.15 as STAGE_BUILD

ADD package*.json /tmp/

# ADD package.json /tmp/
# ADD package-lock.json /tmp/

RUN cd /tmp/ && npm install

# RUN cd /tmp
# RUN npm install

WORKDIR /tmp

ADD . .

RUN npm run build

# CMD ["npm", "run", "dev"]

FROM node:16.13-alpine3.15

WORKDIR /app

COPY --from=STAGE_BUILD /tmp/node_modules ./node_modules
COPY --from=STAGE_BUILD /tmp/dist ./dist
COPY package.json .
COPY env.yaml .

CMD ["npm", "run", "server"]