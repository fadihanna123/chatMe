FROM node:20-alpine
WORKDIR /node
COPY ./ .
RUN npm i -g pnpm prisma ts-node-dev
RUN pnpm i
EXPOSE 5000
CMD pnpm dev
