FROM node:lts-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY frontend .
RUN yarn build

FROM node:lts-alpine AS backend-builder

WORKDIR /app

COPY backend/package.json backend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY backend .
RUN yarn build

FROM node:lts-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN apk add --no-cache tini nginx

COPY --from=frontend-builder /app/build /usr/share/nginx/html
COPY --from=backend-builder /app /app

EXPOSE 80

CMD ["/entrypoint.sh"]
