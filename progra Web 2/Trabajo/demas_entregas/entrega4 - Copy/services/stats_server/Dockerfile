FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

ENV PORT=4004

CMD [ "npm", "start" ]