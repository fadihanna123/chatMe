FROM node:20.14.0-alpine3.20
WORKDIR /backend
COPY package.json .
RUN npm i -g prisma ts-node-dev
RUN yarn
COPY . .
EXPOSE 5000
CMD yarn dev
