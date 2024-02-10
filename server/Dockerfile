FROM node:20-alpine
WORKDIR /node
COPY ./ .
RUN npm i -g prisma ts-node-dev
RUN yarn
EXPOSE 5000
CMD yarn dev
