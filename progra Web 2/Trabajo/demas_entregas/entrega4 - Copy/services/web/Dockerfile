FROM node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG K_SERVER_URL
ENV K_SERVER_URL $K_SERVER_URL
ARG E_SERVER_URL
ENV E_SERVER_URL $E_SERVER_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html