FROM node:18

WORKDIR /app

COPY ["package.json", "polybase_worker.mjs"] ./
RUN yarn install

CMD node polybase_worker.mjs
