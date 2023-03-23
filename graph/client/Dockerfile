FROM node:lts
WORKDIR /app
COPY ./ongrid ./
COPY ./package.example.json ./

CMD yarn global add @graphprotocol/graph-cli && \
    yarn && yarn codegen && yarn build  && \
    yarn remove-local && yarn create-local && yarn deploy-local