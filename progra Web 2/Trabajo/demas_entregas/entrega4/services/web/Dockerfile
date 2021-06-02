FROM node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG CONTROLLER_SERVER_URL
ENV CONTROLLER_SERVER_URL $CONTROLLER_SERVER_URL
RUN npm run build

 FROM nginx:alpine
 COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html