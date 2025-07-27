FROM node:lts-alpine AS frontend-builder

WORKDIR /app

COPY frontend .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:lts-alpine AS backend-builder

WORKDIR /app

COPY backend .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:lts-alpine

COPY --from=frontend-builder /app/build /usr/share/nginx/html
COPY --from=backend-builder /app /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache tini nginx

EXPOSE 80

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
