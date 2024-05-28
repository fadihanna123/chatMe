FROM node:lts
WORKDIR /backend
COPY package.json .
RUN yarn
COPY . .
RUN npm i -g prisma ts-node-dev
EXPOSE 5000
CMD yarn dev
