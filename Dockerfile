FROM node:10.4-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci && node_modules/.bin/ng build --prod

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/todos/ .
