FROM node:22.21.0-alpine
WORKDIR /backend
COPY yarn.lock package.json ./
RUN npm i -g --silent --ignore-scripts prisma ts-node-dev
RUN yarn --ignore-scripts --silent --emoji
COPY . .
EXPOSE 5000
CMD ["yarn", "dev"]
