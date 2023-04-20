FROM node:18.16.0-alpine
WORKDIR /app
COPY ./ .
RUN npm i -g pnpm serve
RUN pnpm i
RUN pnpm build
EXPOSE 4200
CMD pnpm serve dist/client -l 4200
