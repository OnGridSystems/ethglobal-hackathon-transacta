FROM node:18

WORKDIR /app

COPY ["package.json", "polybase_worker.js"] ./
RUN yarn install

CMD node polybase_worker.js
