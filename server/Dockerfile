FROM node:20.15.1-alpine3.20
WORKDIR /backend
COPY yarn.lock package.json ./
RUN npm i -g --silent prisma ts-node-dev
RUN yarn --silent
COPY . .
EXPOSE 5000
CMD yarn dev
