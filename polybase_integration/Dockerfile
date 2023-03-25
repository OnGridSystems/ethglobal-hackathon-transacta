FROM node:18
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY polybase_worker.mjs /app

CMD ["node", "polybase_worker.mjs"]