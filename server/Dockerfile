FROM node:20.16.0-alpine3.20
WORKDIR /backend
COPY yarn.lock package.json ./
RUN npm i -g --silent --ignore-scripts prisma ts-node-dev
RUN yarn --silent
COPY . .
EXPOSE 5000
CMD ["yarn", "dev"]
