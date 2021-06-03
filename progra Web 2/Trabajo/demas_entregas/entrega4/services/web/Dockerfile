FROM node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG k_SERVER_URL
ENV k_SERVER_URL $k_SERVER_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html