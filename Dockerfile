# Etapa 1: Construa o aplicativo Angular
FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --prod

# Etapa 2: Execute o aplicativo Angular em um servidor Nginx
FROM nginx:1.21.1-alpine
COPY --from=build /app/dist/ColabManagerWeb /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
