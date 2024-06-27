FROM node:20.14.0-alpine3.20
WORKDIR /frontend
RUN npm i -g --silent @angular/cli
COPY yarn.lock package.json .
RUN yarn --silent
COPY . .
EXPOSE 4200
CMD yarn dev
