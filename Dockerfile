FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline 2>/dev/null || npm install
COPY . .
RUN npm run build || true
RUN test -f /app/dist/index.html

FROM nginx:1.27-alpine
RUN mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp /tmp/nginx/fastcgi_temp /tmp/nginx/uwsgi_temp /tmp/nginx/scgi_temp && \
    chown -R nginx:nginx /tmp/nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx-main.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
USER nginx
CMD ["nginx", "-g", "daemon off;"]
