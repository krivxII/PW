FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

ENV PORT=3002

ARG G_SERVER_URL
ENV G_SERVER_URL $G_SERVER_URL
ARG E_SERVER_URL
ENV E_SERVER_URL $E_SERVER_URL

CMD [ "npm", "start" ]