FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003
ENV PORT=3003

CMD [ "npm", "start" ]
