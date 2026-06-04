
FROM node:20-alpine

WORKDIR /app

# Copier le code
COPY . .

RUN mkdir -p /usr/src
COPY ./entrypoint.sh /usr/src/entrypoint.sh
RUN chmod +x /usr/src/entrypoint.sh