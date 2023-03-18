FROM node:16

WORKDIR /usr/src/app/backend

COPY package*.json ./

run npm install --force

CMD node index.js