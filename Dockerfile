FROM node:24-alpine3.21 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variáveis de build
ARG VITE_API_URL
ARG VITE_ON_DEVELOPMENT

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ON_DEVELOPMENT=$VITE_ON_DEVELOPMENT

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
